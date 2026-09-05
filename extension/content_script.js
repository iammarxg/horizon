// ============================================================
//  Horizon: Modern New Tab — content_script.js
//  Syncs Google Accounts order, display names, and profile pictures
// ============================================================

(function() {
  function cleanName(raw) {
    if (!raw) return '';
    return raw.replace(/^(google\s*account|account|profile\s*photo|avatar|signed\s*in\s*as)\s*:\s*/i, '')
              .replace(/\s*\([^\)]*@.*?\)/g, '')
              .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
              .split(/[,|\-•\n]/)[0]
              .trim();
  }

  function sanitizeAccountList(list) {
    if (!Array.isArray(list)) return [];

    const valid = [];
    for (const acc of list) {
      if (!acc || !acc.email || typeof acc.email !== 'string') continue;
      const email = acc.email.toLowerCase().trim();
      if (!email.includes('@') || email.endsWith('@google.com') || email.endsWith('@example.com')) continue;
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) continue;

      const gIdx = (typeof acc.gmailIndex === 'number' && !isNaN(acc.gmailIndex)) ? acc.gmailIndex : 0;
      const name = (acc.name && typeof acc.name === 'string' && !acc.name.includes('@'))
        ? acc.name.trim()
        : email.split('@')[0].replace(/[._\-+]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

      valid.push({
        ...acc,
        id: acc.id || ('google_' + email.replace(/[^a-z0-9]/g, '_')),
        name,
        email,
        avatarUrl: acc.avatarUrl || '',
        gmailIndex: gIdx,
        color: acc.color || ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][gIdx % 7],
        initial: name.charAt(0).toUpperCase()
      });
    }

    // Sort by email length ascending so shorter canonical emails come first
    valid.sort((a, b) => a.email.length - b.email.length);

    const clean = [];
    const seenEmails = new Set();

    for (const acc of valid) {
      if (seenEmails.has(acc.email)) continue;

      // Drop concatenation duplicates (e.g. 'ammariammarxgames@gmail.com' ending with 'iammarxgames@gmail.com')
      const isConcatenatedPhantom = clean.some(accepted =>
        acc.email.endsWith(accepted.email) && acc.email !== accepted.email
      );
      if (isConcatenatedPhantom) continue;

      seenEmails.add(acc.email);
      clean.push(acc);
    }

    clean.sort((a, b) => (a.gmailIndex ?? 0) - (b.gmailIndex ?? 0));

    // Normalize indices if staggered
    if (clean.length > 0 && clean[0].gmailIndex !== 0) {
      clean.forEach((acc, idx) => {
        acc.gmailIndex = idx;
      });
    }

    return clean;
  }

  function scanAccounts() {
    try {
      const isSignOutPage = window.location.href.includes('SignOutOptions') || window.location.href.includes('AccountChooser');

      if (isSignOutPage) {
        const rawAccounts = [];
        const seen = new Set();

        // 1. Look for explicit email attributes first to avoid textContent concatenation
        let emailNodes = Array.from(document.querySelectorAll('[data-email], [data-identifier]'));

        // 2. If none, look strictly at leaf elements whose sole text is an email address
        if (emailNodes.length === 0) {
          emailNodes = Array.from(document.querySelectorAll('*')).filter(el =>
            el.children.length === 0 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(el.textContent.trim())
          );
        }

        emailNodes.forEach(node => {
          const rawAttr = node.getAttribute('data-email') || node.getAttribute('data-identifier');
          const emailVal = (rawAttr || (node.children.length === 0 ? node.textContent.trim() : '')).toLowerCase();
          const emailMatch = emailVal.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
          if (!emailMatch) return;

          const email = emailMatch[0].toLowerCase();
          if (seen.has(email) || email.endsWith('@google.com') || email.endsWith('@example.com')) return;
          seen.add(email);

          const container = node.closest('li, [role="listitem"], form, div') || node;

          // Session index detection from authuser or /u/
          const authUserStr = node.getAttribute('data-authuser')
            || container.getAttribute('data-authuser')
            || container.querySelector('a[href*="authuser="]')?.href?.match(/authuser=(\d+)/)?.[1]
            || container.querySelector('a[href*="/u/"]')?.href?.match(/\/u\/(\d+)/)?.[1]
            || node.closest('a[href*="authuser="]')?.href?.match(/authuser=(\d+)/)?.[1]
            || node.closest('a[href*="/u/"]')?.href?.match(/\/u\/(\d+)/)?.[1];
          const sessionIdx = authUserStr !== undefined && authUserStr !== null ? parseInt(authUserStr, 10) : rawAccounts.length;

          let photoUrl = '';
          const img = container.querySelector('img[src*="googleusercontent.com"], img[src*="gstatic.com"]');
          if (img) {
            photoUrl = (img.src || img.getAttribute('src') || '').replace(/=s\d+(-c)?$/, '=s128-c');
          }

          // Real display name
          let name = '';
          if (img && img.getAttribute('alt')) {
            name = cleanName(img.getAttribute('alt'));
          }
          if (!name || name.includes('@')) {
            const labeled = container.querySelector('[aria-label], [title], [data-name]');
            if (labeled) {
              name = cleanName(labeled.getAttribute('aria-label') || labeled.getAttribute('title') || labeled.getAttribute('data-name'));
            }
          }
          if (!name || name.includes('@')) {
            const headings = Array.from(container.querySelectorAll('div, span, strong, b, h1, h2, h3'));
            for (const h of headings) {
              if (h.children.length === 0) {
                const t = h.textContent.trim();
                if (t && t.length >= 2 && t.length <= 40 && !t.includes('@') && !/sign out|signed in|google|default/i.test(t)) {
                  name = t;
                  break;
                }
              }
            }
          }
          if (!name || name.includes('@')) {
            name = email.split('@')[0].replace(/[._\-+]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          }

          rawAccounts.push({
            id: 'google_' + email.replace(/[^a-z0-9]/g, '_'),
            name: name,
            email: email,
            avatarUrl: photoUrl,
            gmailIndex: isNaN(sessionIdx) ? rawAccounts.length : sessionIdx,
            color: ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][(isNaN(sessionIdx) ? rawAccounts.length : sessionIdx) % 7],
            initial: name.charAt(0).toUpperCase()
          });
        });

        const accounts = sanitizeAccountList(rawAccounts);
        if (accounts.length > 0) {
          chrome.storage.local.set({
            google_synced_accounts: accounts,
            last_account_sync_ts: Date.now()
          });
          return;
        }
      }

      // General detection across Google sites (Gmail, Search, YouTube, etc.)
      const accountBtns = Array.from(document.querySelectorAll('a[aria-label*="Google Account"], a[aria-label*="Google-Konto"], [aria-label*="Compte Google"], a[href*="SignOutOptions"], a[href*="SignOut"], button[aria-label*="Google Account"]'));
      for (const btn of accountBtns) {
        const label = btn.getAttribute('aria-label') || btn.getAttribute('title') || '';
        const nameMatch = label.match(/Google Account:\s*([^\n\r(]+?)(?:\s*\(|\s*\n|$)/i);
        const emailMatch = label.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (nameMatch && nameMatch[1] && emailMatch) {
          const realName = nameMatch[1].trim();
          const email = emailMatch[0].toLowerCase();
          chrome.storage.local.get(['google_synced_accounts']).then(res => {
            const list = sanitizeAccountList(res.google_synced_accounts || []);
            const match = list.find(a => a.email.toLowerCase() === email);
            if (match && match.name !== realName && !realName.includes('@')) {
              match.name = realName;
              match.initial = realName.charAt(0).toUpperCase();
              chrome.storage.local.set({ google_synced_accounts: list });
            }
          });
        }
      }

      // Avatar detection
      const imgs = Array.from(document.querySelectorAll('img[src*="googleusercontent.com"]'));
      for (const img of imgs) {
        const src = img.src || img.getAttribute('src') || '';
        if (/https:\/\/lh3\.googleusercontent\.com\/(a|ogw)\//i.test(src)) {
          const highRes = src.replace(/=s\d+(-c)?$/, '=s128-c');
          chrome.storage.local.set({ google_detected_avatar: highRes });
          break;
        }
      }
    } catch (e) {}
  }

  scanAccounts();
  setTimeout(scanAccounts, 1000);
  setTimeout(scanAccounts, 3000);
})();
