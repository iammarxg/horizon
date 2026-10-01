// Shared, side-effect-free Google account parsing and reconciliation helpers.
// Loaded by both the new-tab page and the Google content script.
(function (root, factory) {
  const api = factory();
  root.HorizonAccountSync = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC04', '#00BCD4', '#9C27B0', '#FF5722'];
  const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function normalizeEmail(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }

  function isValidEmail(value) {
    return EMAIL_RE.test(value) && !value.endsWith('@google.com') && !value.endsWith('@example.com');
  }

  function deriveName(name, email) {
    if (typeof name === 'string' && name.trim() && !name.includes('@')) return name.trim();
    return email.split('@')[0].replace(/[._\-+]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function normalizeIndex(value) {
    return Number.isInteger(value) && value >= 0 ? value : null;
  }

  function normalizeRecord(account) {
    if (!account || typeof account !== 'object') return null;
    const email = normalizeEmail(account.email);
    if (!isValidEmail(email)) return null;
    const name = deriveName(account.name, email);
    const gmailIndex = normalizeIndex(account.gmailIndex);
    return {
      ...account,
      id: account.id || ('google_' + email.replace(/[^a-z0-9]/g, '_')),
      name,
      email,
      avatarUrl: typeof account.avatarUrl === 'string' ? account.avatarUrl : '',
      gmailIndex,
      color: account.color || COLORS[Math.max(0, gmailIndex || 0) % COLORS.length],
      initial: name.charAt(0).toUpperCase()
    };
  }

  // Validation and de-duplication only. It deliberately never sorts or invents indices.
  function sanitizeAccountList(accounts) {
    if (!Array.isArray(accounts)) return [];
    const candidates = [];
    const seen = new Set();
    for (const account of accounts) {
      const normalized = normalizeRecord(account);
      if (!normalized || seen.has(normalized.email)) continue;
      seen.add(normalized.email);
      candidates.push(normalized);
    }
    const allEmails = candidates.map(account => account.email);
    return candidates.filter(account => !allEmails.some(other =>
      other !== account.email && account.email.endsWith(other) && account.email.length > other.length
    ));
  }

  function isCanonicalList(accounts) {
    if (!Array.isArray(accounts)) return false;
    const clean = sanitizeAccountList(accounts);
    if (!clean.length || clean.length !== accounts.length) return false;
    const indices = clean.map(account => account.gmailIndex);
    return indices.every((index, position) => index === position);
  }

  function decodeBase64(value) {
    try {
      const normalized = String(value).replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      if (typeof atob === 'function') return atob(padded);
      if (typeof Buffer !== 'undefined') return Buffer.from(padded, 'base64').toString('binary');
    } catch (error) {}
    return '';
  }

  function readVarint(bytes, start) {
    let value = 0;
    let shift = 0;
    let position = start;
    while (position < bytes.length && shift <= 35) {
      const byte = bytes[position++];
      value += (byte & 0x7f) * Math.pow(2, shift);
      if (!(byte & 0x80)) return { value, position };
      shift += 7;
    }
    return { value: 0, position: bytes.length };
  }

  function skipField(bytes, position, wireType) {
    if (wireType === 0) return readVarint(bytes, position).position;
    if (wireType === 1) return Math.min(bytes.length, position + 8);
    if (wireType === 2) {
      const length = readVarint(bytes, position);
      return Math.min(bytes.length, length.position + length.value);
    }
    if (wireType === 5) return Math.min(bytes.length, position + 4);
    return bytes.length;
  }

  function readString(bytes, position) {
    const length = readVarint(bytes, position);
    const end = Math.min(bytes.length, length.position + length.value);
    try {
      const text = new TextDecoder('utf-8').decode(bytes.subarray(length.position, end));
      return { text, position: end };
    } catch (error) {
      return { text: '', position: end };
    }
  }

  function parseAccountMessage(bytes, start, end) {
    const account = { name: '', email: '', avatarUrl: '', valid: true, signedOut: false, verified: true };
    let position = start;
    while (position < end) {
      const key = readVarint(bytes, position);
      position = key.position;
      const field = Math.floor(key.value / 8);
      const wireType = key.value & 7;
      if (wireType === 0) {
        const value = readVarint(bytes, position);
        position = value.position;
        if (field === 9) account.valid = value.value !== 0;
        if (field === 14) account.signedOut = value.value !== 0;
        if (field === 15) account.verified = value.value !== 0;
      } else if (wireType === 2) {
        const length = readVarint(bytes, position);
        const valueStart = length.position;
        const valueEnd = Math.min(end, valueStart + length.value);
        if ([2, 3, 4, 10].includes(field)) {
          const value = readString(bytes, position);
          if (field === 2) account.name = value.text;
          if (field === 3) account.email = value.text;
          if (field === 4) account.avatarUrl = value.text;
          if (field === 10) account.gaiaId = value.text;
        }
        position = valueEnd;
      } else {
        position = skipField(bytes, position, wireType);
      }
    }
    return account;
  }

  function parseListAccountsProto(base64) {
    return parseListAccountsProtoResult(base64).accounts;
  }

  function parseListAccountsProtoResult(base64) {
    const binary = decodeBase64(typeof base64 === 'string' ? base64.trim() : '');
    if (!binary) return String(base64 || '').trim() === ''
      ? { valid: true, accounts: [], error: null }
      : { valid: false, accounts: [], error: 'empty-protobuf' };
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    const parsed = [];
    let accountMessages = 0;
    let recognizedMessages = 0;
    let position = 0;
    while (position < bytes.length) {
      const initialPosition = position;
      const key = readVarint(bytes, position);
      position = key.position;
      if (key.value === 0 || position <= initialPosition) {
        return { valid: false, accounts: [], error: 'malformed-protobuf' };
      }
      const field = Math.floor(key.value / 8);
      const wireType = key.value & 7;
      if (field === 1 && wireType === 2) {
        const length = readVarint(bytes, position);
        if (length.position <= position || length.position + length.value > bytes.length) {
          return { valid: false, accounts: [], error: 'malformed-protobuf' };
        }
        const end = Math.min(bytes.length, length.position + length.value);
        const account = parseAccountMessage(bytes, length.position, end);
        accountMessages++;
        const email = normalizeEmail(account.email);
        if (email && account.gaiaId) recognizedMessages++;
        if (email && account.gaiaId && account.valid && !account.signedOut) {
          parsed.push({
            name: account.name,
            email,
            avatarUrl: account.avatarUrl ? account.avatarUrl.replace(/=s\d+(-c)?$/, '=s128-c') : '',
            gaiaId: account.gaiaId || '',
            gmailIndex: parsed.length
          });
        }
        position = end;
      } else {
        const next = skipField(bytes, position, wireType);
        if (next <= position || next > bytes.length) {
          return { valid: false, accounts: [], error: 'malformed-protobuf' };
        }
        position = next;
      }
    }
    if (!accountMessages || recognizedMessages !== accountMessages) {
      return { valid: false, accounts: [], error: 'unexpected-protobuf-shape' };
    }
    return { valid: true, accounts: parsed, error: null };
  }

  function parseListAccountsJson(parsed) {
    const isWrapped = Array.isArray(parsed) && Array.isArray(parsed[1]);
    const list = isWrapped ? parsed[1] : null;
    if (!list) return null;
    if (list.length > 0 && !list.some(item => Array.isArray(item)
        && typeof item[3] === 'string'
        && typeof item[10] === 'string'
        && isValidEmail(normalizeEmail(item[3])))) return null;
    const accounts = [];
    list.forEach(item => {
      if (!Array.isArray(item)) return;
      // These positions mirror Chromium's JSON ListAccounts parser:
      // display_email=3, valid_session=9, obfuscated_id=10, signed_out=14.
      const email = normalizeEmail(item[3]);
      const valid = item[9] === undefined || (item[9] !== 0 && item[9] !== false);
      const signedOut = item[14] === 1 || item[14] === true;
      const verified = item[15] === undefined || item[15] !== 0;
      const gaiaId = typeof item[10] === 'string' ? item[10] : '';
      if (!email || !gaiaId || !valid || signedOut) return;
      const rawPhoto = typeof item[4] === 'string' && /^https?:\/\//i.test(item[4]) ? item[4] : '';
      accounts.push({
        name: typeof item[2] === 'string' ? item[2] : '',
        email,
        avatarUrl: rawPhoto.replace(/=s\d+(-c)?$/, '=s128-c'),
        gaiaId,
        gmailIndex: accounts.length
      });
    });
    return accounts;
  }

  function parseListAccountsResponseResult(text) {
    if (typeof text !== 'string') return { valid: false, accounts: [], error: 'not-text' };
    const clean = text.replace(/^\)\]\}'?\s*/, '').trim();
    if (!clean) return { valid: false, accounts: [], error: 'empty-response' };
    if (!clean.startsWith('[') && !clean.startsWith('{')) return parseListAccountsProtoResult(clean);
    try {
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed) && typeof parsed[1] === 'string') {
        if (parsed[1].trim() === '') return { valid: true, accounts: [], error: null };
        const binaryResult = parseListAccountsProtoResult(parsed[1]);
        if (binaryResult.valid) return binaryResult;
      }
      const jsonAccounts = parseListAccountsJson(parsed);
      if (jsonAccounts) return { valid: true, accounts: jsonAccounts, error: null };
      return { valid: false, accounts: [], error: 'unexpected-json-shape' };
    } catch (error) {
      return { valid: false, accounts: [], error: 'invalid-json' };
    }
  }

  function parseListAccountsResponse(text) {
    const result = parseListAccountsResponseResult(text);
    return result.valid ? result.accounts : [];
  }

  function mergeAuthoritativeAccounts(authoritative, current) {
    const canonical = sanitizeAccountList(authoritative).map((account, index) => ({
      ...account,
      gmailIndex: index
    }));
    const existingByEmail = new Map(sanitizeAccountList(current).map(account => [account.email, account]));
    const merged = canonical.map(account => {
      const existing = existingByEmail.get(account.email);
      return normalizeRecord({
        ...existing,
        ...account,
        id: existing?.id || account.id,
        avatarUrl: account.avatarUrl || existing?.avatarUrl || ''
      });
    });
    // Non-Google/manual records remain available across a Google refresh.
    for (const account of sanitizeAccountList(current)) {
      if (!String(account.id).startsWith('google_') && !merged.some(item => item.email === account.email)) {
        merged.push(account);
      }
    }
    return merged;
  }

  function observeMetadata(metadata, record) {
    const email = normalizeEmail(record?.email);
    if (!email || !isValidEmail(email)) return metadata && typeof metadata === 'object' ? metadata : {};
    return {
      ...(metadata && typeof metadata === 'object' ? metadata : {}),
      [email]: {
        email,
        name: record.name || '',
        avatarUrl: record.avatarUrl || '',
        observedAt: Date.now()
      }
    };
  }

  function mergeAccountMetadata(accounts, metadata) {
    const byEmail = metadata && typeof metadata === 'object' ? metadata : {};
    return sanitizeAccountList(accounts).map(account => {
      const item = byEmail[account.email];
      if (!item) return account;
      return normalizeRecord({
        ...account,
        name: item.name || account.name,
        avatarUrl: item.avatarUrl || account.avatarUrl
      });
    });
  }

  return {
    COLORS,
    normalizeEmail,
    normalizeRecord,
    sanitizeAccountList,
    isCanonicalList,
    parseListAccountsProto,
    parseListAccountsProtoResult,
    parseListAccountsResponse,
    parseListAccountsResponseResult,
    mergeAuthoritativeAccounts,
    observeMetadata,
    mergeAccountMetadata
  };
});
