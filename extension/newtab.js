// ============================================================
//  Horizon: Chrome New Tab for Brave — newtab.js
// ============================================================

// ── Curated backgrounds ──────────────────────────────────────
const CURATED_BACKGROUNDS = [
  { name: 'Mount Fuji',    author: 'Hideaki Kikuchi', authorUrl: 'https://unsplash.com/@hidd3n',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Desert Canyon', author: 'Ivana Cajina',    authorUrl: 'https://unsplash.com/@von_co',
    thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Aurora Borealis', author: 'Vincent Guth', authorUrl: 'https://unsplash.com/@vingtcent',
    thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Ocean Cliffs',  author: 'Sean Oulashin',   authorUrl: 'https://unsplash.com/@oulashin',
    thumb: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Milky Way',     author: 'Graeme Worsfold', authorUrl: 'https://unsplash.com/@graeme_w',
    thumb: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Golden Fields', author: 'Federico Respini',authorUrl: 'https://unsplash.com/@federicorespini',
    thumb: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Alpine Lake',   author: 'Samuel Ferrara',  authorUrl: 'https://unsplash.com/@samuelferrara',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85&auto=format&fit=crop' },
  { name: 'City Lights',   author: 'Banter Snaps',    authorUrl: 'https://unsplash.com/@bantersnaps',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Autumn Forest', author: 'Patrick Fore',    authorUrl: 'https://unsplash.com/@patrickfore',
    thumb: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Snow Mountains',author: 'Bailey Zindel',   authorUrl: 'https://unsplash.com/@baileyzindel',
    thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Red Rock Desert',author:'Ivana Cajina',    authorUrl: 'https://unsplash.com/@von_co',
    thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85&auto=format&fit=crop' },
  { name: 'Tropical Beach', author:'Cristian Palmer', authorUrl: 'https://unsplash.com/@cristian_palmer',
    thumb: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=360&q=65&auto=format&fit=crop',
    full:  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&q=85&auto=format&fit=crop' },
];

const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    suggestUrl: (q) => `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(q)}`,
    icon: 'https://www.google.com/favicon.ico'
  },
  brave: {
    name: 'Brave Search',
    url: 'https://search.brave.com/search?q=',
    suggestUrl: (q) => `https://search.brave.com/api/suggest?q=${encodeURIComponent(q)}`,
    icon: 'https://brave.com/favicon.ico'
  },
  bing: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    suggestUrl: (q) => `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(q)}`,
    icon: 'https://www.bing.com/favicon.ico'
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    suggestUrl: (q) => `https://duckduckgo.com/ac/?type=list&q=${encodeURIComponent(q)}`,
    icon: 'https://duckduckgo.com/favicon.ico'
  },
  qwant: {
    name: 'Qwant',
    url: 'https://www.qwant.com/?q=',
    suggestUrl: (q) => `https://api.qwant.com/v3/suggest?client=opensearch&q=${encodeURIComponent(q)}`,
    icon: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.qwant.com&size=256'
  },
  yahoo: {
    name: 'Yahoo Search',
    url: 'https://search.yahoo.com/search?p=',
    suggestUrl: (q) => `https://ff.search.yahoo.com/gossip?output=json&command=${encodeURIComponent(q)}`,
    icon: 'https://www.yahoo.com/favicon.ico'
  },
};

// ── Google Apps — 42 services with local bundled assets & account routing
const GOOGLE_APPS = [
  {
    name: 'Account',
    icon: 'assets/apps/account.png',
    fallback: 'assets/apps/account.png',
    getUrl: (i) => `https://myaccount.google.com/u/${i}/`,
    isAccountApp: true,
  },
  {
    name: 'Search',
    icon: 'assets/apps/search.png',
    getUrl: () => 'https://www.google.com',
  },
  {
    name: 'Business Profile',
    icon: 'assets/apps/business_profile.png',
    getUrl: (i) => `https://business.google.com/?authuser=${i}`,
  },
  {
    name: 'Maps',
    icon: 'assets/apps/maps.png',
    getUrl: (i) => `https://maps.google.com/?authuser=${i}`,
  },
  {
    name: 'Play',
    icon: 'assets/apps/play.png',
    getUrl: (i) => `https://play.google.com/?authuser=${i}`,
  },
  {
    name: 'YouTube',
    icon: 'assets/apps/youtube.png',
    getUrl: (i) => `https://www.youtube.com/?authuser=${i}`,
  },
  {
    name: 'Gmail',
    icon: 'assets/apps/gmail.png',
    getUrl: (i) => `https://mail.google.com/mail/u/${i}/`,
  },
  {
    name: 'Contacts',
    icon: 'assets/apps/contacts.png',
    getUrl: (i) => `https://contacts.google.com/?authuser=${i}`,
  },
  {
    name: 'Drive',
    icon: 'assets/apps/drive.png',
    getUrl: (i) => `https://drive.google.com/drive/u/${i}/`,
  },
  {
    name: 'Gemini',
    icon: 'assets/apps/gemini.png',
    getUrl: (i) => `https://gemini.google.com/?authuser=${i}`,
  },
  {
    name: 'Calendar',
    icon: 'assets/apps/calendar.png',
    getUrl: (i) => `https://calendar.google.com/calendar/r?authuser=${i}`,
  },
  {
    name: 'News',
    icon: 'assets/apps/news.png',
    getUrl: () => 'https://news.google.com',
  },
  {
    name: 'Photos',
    icon: 'assets/apps/photos.png',
    getUrl: (i) => `https://photos.google.com/u/${i}/`,
  },
  {
    name: 'Meet',
    icon: 'assets/apps/meet.png',
    getUrl: (i) => `https://meet.google.com/?authuser=${i}`,
  },
  {
    name: 'Translate',
    icon: 'assets/apps/translate.png',
    getUrl: () => 'https://translate.google.com',
  },
  {
    name: 'Vids',
    icon: 'assets/apps/vids.png',
    getUrl: (i) => `https://docs.google.com/videos/u/${i}/`,
  },
  {
    name: 'Sheets',
    icon: 'assets/apps/sheets.png',
    getUrl: (i) => `https://docs.google.com/spreadsheets/u/${i}/`,
  },
  {
    name: 'Docs',
    icon: 'assets/apps/docs.png',
    getUrl: (i) => `https://docs.google.com/document/u/${i}/`,
  },
  {
    name: 'Slides',
    icon: 'assets/apps/slides.png',
    getUrl: (i) => `https://docs.google.com/presentation/u/${i}/`,
  },
  {
    name: 'Google One',
    icon: 'assets/apps/google_one.png',
    getUrl: (i) => `https://one.google.com/u/${i}/`,
  },
  {
    name: 'Shopping',
    icon: 'assets/apps/shopping.png',
    getUrl: () => 'https://shopping.google.com',
  },
  {
    name: 'Finance',
    icon: 'assets/apps/finance.png',
    getUrl: () => 'https://www.google.com/finance',
  },
  {
    name: 'Keep',
    icon: 'assets/apps/keep.png',
    getUrl: (i) => `https://keep.google.com/u/${i}/`,
  },
  {
    name: 'My Ad Center',
    icon: 'assets/apps/my_ad_center.png',
    getUrl: (i) => `https://myadcenter.google.com/?authuser=${i}`,
  },
  {
    name: 'Classroom',
    icon: 'assets/apps/classroom.svg',
    getUrl: (i) => `https://classroom.google.com/u/${i}/`,
  },
  {
    name: 'Chat',
    icon: 'assets/apps/chat.png',
    getUrl: (i) => `https://chat.google.com/u/${i}/`,
  },
  {
    name: 'Earth',
    icon: 'assets/apps/earth.png',
    getUrl: () => 'https://earth.google.com/web/',
  },
  {
    name: 'Saved',
    icon: 'assets/apps/saved.png',
    getUrl: () => 'https://www.google.com/interests/saved',
  },
  {
    name: 'Arts & Culture',
    icon: 'assets/apps/arts_culture.png',
    getUrl: () => 'https://artsandculture.google.com',
  },
  {
    name: 'Google Ads',
    icon: 'assets/apps/google_ads.svg',
    getUrl: (i) => `https://ads.google.com/home/?authuser=${i}`,
  },
  {
    name: 'Merchant Center',
    icon: 'assets/apps/merchant_center.png',
    getUrl: (i) => `https://merchants.google.com/?authuser=${i}`,
  },
  {
    name: 'Travel',
    icon: 'assets/apps/travel.png',
    getUrl: () => 'https://www.google.com/travel',
  },
  {
    name: 'Forms',
    icon: 'assets/apps/forms.png',
    getUrl: (i) => `https://docs.google.com/forms/u/${i}/`,
  },
  {
    name: 'Books',
    icon: 'assets/apps/books.png',
    getUrl: () => 'https://books.google.com',
  },
  {
    name: 'Chrome Web Store',
    icon: 'assets/apps/chrome_web_store.png',
    getUrl: () => 'https://chromewebstore.google.com',
  },
  {
    name: 'Password Manager',
    icon: 'assets/apps/password_manager.png',
    getUrl: (i) => `https://passwords.google.com/?authuser=${i}`,
  },
  {
    name: 'Google Analytics',
    icon: 'assets/apps/google_analytics.png',
    getUrl: (i) => `https://analytics.google.com/analytics/web/?authuser=${i}`,
  },
  {
    name: 'Blogger',
    icon: 'assets/apps/blogger.png',
    getUrl: (i) => `https://www.blogger.com/?authuser=${i}`,
  },
  {
    name: 'YouTube Music',
    icon: 'assets/apps/youtube_music.png',
    getUrl: (i) => `https://music.youtube.com/?authuser=${i}`,
  },
  {
    name: 'Wallet',
    icon: 'assets/apps/wallet.png',
    getUrl: (i) => `https://wallet.google.com/?authuser=${i}`,
  },
  {
    name: 'Gemini Notebook',
    icon: 'assets/apps/gemini_notebook.png',
    fallback: 'assets/apps/gemini_notebook.png',
    getUrl: (i) => `https://notebooklm.google.com/?authuser=${i}`,
  },
  {
    name: 'Tasks',
    icon: 'assets/apps/tasks.png',
    getUrl: (i) => `https://calendar.google.com/calendar/u/${i}/r/tasks`,
  },
];

// ── Helpers ──────────────────────────────────────────────────

function getAccountIndex() {
  const acc = getActiveAccount();
  return (acc && typeof acc.gmailIndex === 'number' && !isNaN(acc.gmailIndex) && acc.gmailIndex >= 0) ? acc.gmailIndex : 0;
}

function sanitizeAccountList(accounts) {
  if (!Array.isArray(accounts)) return [];

  const valid = [];
  for (const acc of accounts) {
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

    // Reject phantom concatenation duplicates (e.g. 'ammariammarxgames@gmail.com' ending with 'iammarxgames@gmail.com')
    const isConcatenatedPhantom = clean.some(accepted =>
      acc.email.endsWith(accepted.email) && acc.email !== accepted.email
    );
    if (isConcatenatedPhantom) continue;

    seenEmails.add(acc.email);
    clean.push(acc);
  }

  clean.sort((a, b) => (a.gmailIndex ?? 0) - (b.gmailIndex ?? 0));

  // Normalize indices if non-zero starting or staggered
  if (clean.length > 0 && clean[0].gmailIndex !== 0) {
    clean.forEach((acc, idx) => {
      acc.gmailIndex = idx;
    });
  }

  return clean;
}

function appUrl(app) {
  return app.getUrl(getAccountIndex());
}

const FAVICON_API = (domain) => `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`;

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function favIcon(url) {
  try { return FAVICON_API(new URL(url).hostname); } catch { return FAVICON_API('example.com'); }
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}
function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false });
}
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/\x27/g,'&#39;');
}
function stringToColor(str) {
  let h=0;
  for (let i=0;i<str.length;i++) h=str.charCodeAt(i)+((h<<5)-h);
  return `hsl(${Math.abs(h)%360},60%,45%)`;
}

// ── Favicon & Icon Helper ────────────────────────────────────

/**
 * Applies a favicon to an img element with native browser HTTP caching
 */
function applyCachedFavicon(imgElement, originalUrl, fallbackUrl) {
  if (!imgElement || !originalUrl) return;

  imgElement.src = originalUrl;
  imgElement.onerror = () => {
    if (fallbackUrl && imgElement.src !== fallbackUrl) {
      imgElement.src = fallbackUrl;
    }
  };
}

// ── Google SignOutOptions Parser & Account Sync ───────────────

function cleanDisplayName(raw) {
  if (!raw) return '';
  return raw.replace(/^(google\s*account|account|profile\s*photo|avatar|signed\s*in\s*as)\s*:\s*/i, '')
            .replace(/\s*\([^\)]*@.*?\)/g, '')
            .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
            .split(/[,|\-•\n]/)[0]
            .trim();
}

function extractDisplayNameFromNode(node, email, html = '') {
  const emailLower = (email || '').toLowerCase();

  // 1. Check img alt
  const img = node?.querySelector?.('img[src*="googleusercontent.com"], img[src*="gstatic.com"]');
  if (img && img.getAttribute('alt')) {
    const fromAlt = cleanDisplayName(img.getAttribute('alt'));
    if (fromAlt && fromAlt.length >= 2 && !fromAlt.includes('@') && !/sign out|signed in|google|account/i.test(fromAlt)) {
      return fromAlt;
    }
  }

  // 2. Check labeled attributes
  const labeledNodes = node?.querySelectorAll ? Array.from(node.querySelectorAll('[aria-label], [title], [data-name]')) : [];
  for (const el of labeledNodes) {
    const text = el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('data-name') || '';
    const fromAttr = cleanDisplayName(text);
    if (fromAttr && fromAttr.length >= 2 && !fromAttr.includes('@') && !/sign out|signed in|google/i.test(fromAttr)) {
      return fromAttr;
    }
  }

  // 3. Check headings and text containers
  if (node?.querySelectorAll) {
    const textNodes = Array.from(node.querySelectorAll('div, span, strong, b, h1, h2, h3, h4'));
    for (const el of textNodes) {
      const directText = Array.from(el.childNodes)
        .filter(n => n.nodeType === 3)
        .map(n => n.textContent.trim())
        .filter(Boolean)
        .join(' ');
      const t = directText || el.textContent.trim();
      if (t && t.length >= 2 && t.length <= 40 && !t.includes('@') && !/sign out|signed in|google|default|current|switch/i.test(t)) {
        return t;
      }
    }
  }

  // 4. Try JSON array match in HTML if available
  if (html && emailLower) {
    const escEmail = emailLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = new RegExp(`\\[\\s*"([^"]{2,40})"\\s*,\\s*"${escEmail}"`, 'i').exec(html)
           || new RegExp(`"([^"]{2,40})"[^"]{1,60}"${escEmail}"`, 'i').exec(html);
    if (m && m[1] && !m[1].includes('@') && !m[1].toLowerCase().includes('http')) {
      return m[1].trim();
    }
  }

  // 5. Fallback formatting
  const username = emailLower.split('@')[0] || 'User';
  return username.replace(/[._\-+]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function parseSignOutOptionsHTML(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const rawAccounts = [];
  const seen = new Set();

  // 1. Look for explicit email attributes first to avoid textContent concatenation
  let emailNodes = Array.from(doc.querySelectorAll('[data-email], [data-identifier]'));

  // 2. If none found, look strictly at leaf elements whose sole text is an email address
  if (emailNodes.length === 0) {
    emailNodes = Array.from(doc.querySelectorAll('*')).filter(el =>
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

    const name = extractDisplayNameFromNode(container, email, html);

    rawAccounts.push({
      id: 'google_' + email.replace(/[^a-z0-9]/g, '_'),
      name: name,
      email: email,
      avatarUrl: photoUrl || '',
      gmailIndex: isNaN(sessionIdx) ? rawAccounts.length : sessionIdx,
      color: ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][(isNaN(sessionIdx) ? rawAccounts.length : sessionIdx) % 7],
      initial: name.charAt(0).toUpperCase(),
    });
  });

  // Regex Fallback if no DOM nodes matched at all
  if (rawAccounts.length === 0) {
    const emailRegex = /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;
    const photoRegex = /(https:\/\/lh3\.googleusercontent\.com\/(?:a|ogw)\/[a-zA-Z0-9_\-]+(?:=s\d+(-c)?)?)/g;

    const emailsFound = [];
    let match;
    while ((match = emailRegex.exec(html)) !== null) {
      const em = match[1].toLowerCase();
      if (!seen.has(em) && !em.endsWith('@google.com') && !em.endsWith('@example.com')) {
        seen.add(em);
        emailsFound.push(em);
      }
    }

    const photosFound = [];
    while ((match = photoRegex.exec(html)) !== null) {
      photosFound.push(match[1].replace(/=s\d+(-c)?$/, '=s128-c'));
    }

    emailsFound.forEach((email, idx) => {
      const name = extractDisplayNameFromNode(null, email, html);
      const photoUrl = photosFound[idx] || '';
      rawAccounts.push({
        id: 'google_' + email.replace(/[^a-z0-9]/g, '_'),
        name,
        email,
        avatarUrl: photoUrl,
        gmailIndex: idx,
        color: ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][idx % 7],
        initial: name.charAt(0).toUpperCase(),
      });
    });
  }

  return sanitizeAccountList(rawAccounts);
}

async function fetchAccountsFromSignOutOptions() {
  try {
    const url = 'https://accounts.google.com/SignOutOptions?hl=en&continue=https://mail.google.com/mail&service=mail&ec=GBRAFw';
    const res = await fetch(url, { credentials: 'include', cache: 'no-cache' });
    if (!res.ok) return [];
    const html = await res.text();
    return parseSignOutOptionsHTML(html);
  } catch (err) {
    return [];
  }
}

async function fetchGoogleAccountsAPI() {
  try {
    const res = await fetch(
      'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromeExtSettingsMediation&mo=1&mn=1',
      { credentials: 'include', cache: 'no-cache' }
    );
    if (!res.ok) return [];
    const text = await res.text();
    const cleanText = text.replace(/^\)\]\}'?\s*/, '').trim();
    if (!cleanText) return [];
    const parsed = JSON.parse(cleanText);

    let list = [];
    if (Array.isArray(parsed)) {
      if (Array.isArray(parsed[1])) list = parsed[1];
      else if (Array.isArray(parsed[0])) list = parsed;
    }

    const accounts = [];
    list.forEach((item, idx) => {
      if (Array.isArray(item)) {
        const sessionIndex = parseInt(item[0], 10);
        const name = (item[1] && typeof item[1] === 'string' && !item[1].includes('@')) ? item[1].trim() : '';
        const email = (item[2] && typeof item[2] === 'string') ? item[2].trim() : '';
        let rawPhoto = (item[3] && typeof item[3] === 'string' && item[3].startsWith('http')) ? item[3] : '';
        let photoUrl = rawPhoto ? rawPhoto.replace(/=s\d+(-c)?$/, '=s128-c') : '';

        if (email) {
          accounts.push({
            name: name,
            email: email,
            avatarUrl: photoUrl,
            gmailIndex: isNaN(sessionIndex) ? idx : sessionIndex,
          });
        }
      }
    });
    return accounts;
  } catch (e) {
    return [];
  }
}

const ACCOUNT_SYNC_TTL_MS = 60 * 60 * 1000; // 1 hour

async function syncGoogleAccounts(force = false) {
  const now = Date.now();
  const lastSync = state.lastAccountSync || 0;
  const isExpired = (now - lastSync) > ACCOUNT_SYNC_TTL_MS;

  let discovered = [];

  // 1. PRIMARY: Query official ListAccounts API — returns canonical accounts with exact sessionIndex (0, 1...)
  const apiAccounts = await fetchGoogleAccountsAPI();
  if (apiAccounts && apiAccounts.length > 0) {
    discovered = apiAccounts.map((acc, idx) => {
      const gIdx = (typeof acc.gmailIndex === 'number' && !isNaN(acc.gmailIndex)) ? acc.gmailIndex : idx;
      const cleanEmail = acc.email.toLowerCase().trim();
      const displayName = acc.name || cleanEmail.split('@')[0].replace(/[._\-+]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      return {
        id: 'google_' + cleanEmail.replace(/[^a-z0-9]/g, '_'),
        name: displayName,
        email: cleanEmail,
        avatarUrl: acc.avatarUrl || '',
        gmailIndex: gIdx,
        color: ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][gIdx % 7],
        initial: displayName.charAt(0).toUpperCase()
      };
    });
  }

  // 2. SECONDARY: Check storage from content_script if API was unavailable
  if (discovered.length === 0) {
    const localData = await chrome.storage.local.get(['google_synced_accounts', 'google_detected_avatar']);
    if (localData.google_synced_accounts && localData.google_synced_accounts.length > 0) {
      discovered = sanitizeAccountList(localData.google_synced_accounts);
    }
  }

  // 3. TERTIARY: Fetch SignOutOptions directly if still empty or forced/expired
  if (discovered.length === 0 && (force || isExpired || !state.accounts || state.accounts.length === 0)) {
    const fetched = await fetchAccountsFromSignOutOptions();
    if (fetched && fetched.length > 0) {
      discovered = sanitizeAccountList(fetched);
    }
  }

  // 4. Sanitize and finalize discovered accounts
  discovered = sanitizeAccountList(discovered);

  if (discovered.length > 0) {
    state.accounts = discovered;
    state.lastAccountSync = now;

    // Clean up local storage so outdated corrupted accounts are permanently eradicated
    chrome.storage.local.set({ google_synced_accounts: discovered });

    // Validate activeAccountId - if missing or invalid, default to primary account (index 0)
    if (!state.activeAccountId || !state.accounts.some(a => a.id === state.activeAccountId)) {
      state.activeAccountId = state.accounts[0].id;
    }

    saveState();
    updateAccountUI();
    renderAppsPanel();
    renderAccountsInPanel();
    return;
  }

  // Fallback avatar if content_script found a single active avatar
  const localData = await chrome.storage.local.get(['google_detected_avatar']);
  if (localData.google_detected_avatar) {
    const active = getActiveAccount();
    if (active && !active.avatarUrl) {
      active.avatarUrl = localData.google_detected_avatar;
      saveState();
      updateAccountUI();
      renderAppsPanel();
    }
  }
}

function resolveAccountAvatar(acc, onResolved) {
  if (!acc) { onResolved(null); return; }
  if (acc.avatarUrl && acc.avatarUrl.trim()) {
    onResolved(acc.avatarUrl.trim());
    return;
  }
  onResolved(null);
}

// ── Default State + State Management ────────────────────────

const DEFAULT_STATE = {
  accounts:        [],
  activeAccountId: null,
  shortcuts:       [],
  shortcutsView:   'row',
  searchEngine:    'google',
  background:      { type:'curated', index:0 },
  themeOverride:   'auto',
  customUploadedBg: null,
  lastAccountSync: 0,
  appsOrder:       null,
  voiceLang:       'auto',
  showVoiceBtn:    true,
  hasSeenFooterOnboarding: false,
};

let state = {};
let activeBgLayer    = 'a';
let contextTargetId  = null;
let editingShortcutId = null;
let editingAccountId  = null;
let selectedAccColor  = '#4285F4';

// Drag & Drop State
let draggedShortcutId  = null;
let isShortcutDragging = false;
let draggedAppName     = null;
let isAppDragging      = false;

function saveState() { chrome.storage.local.set({...state}); }

async function loadState() {
  const keys   = Object.keys(DEFAULT_STATE);
  const stored = await chrome.storage.local.get(keys);
  state = {};
  for (const k of keys) {
    state[k] = stored[k] !== undefined ? stored[k] : JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
  }
  if (!state.shortcuts || state.shortcuts.length === 0) {
    state.shortcuts = [
      { id:uid(), name:'YouTube', url:'https://youtube.com' },
      { id:uid(), name:'Gmail',   url:'https://mail.google.com' },
      { id:uid(), name:'Maps',    url:'https://maps.google.com' },
      { id:uid(), name:'GitHub',  url:'https://github.com' },
    ];
  }
  state.shortcuts = state.shortcuts.map(s => ({ id:s.id||uid(), ...s }));

  // Sanitize stored accounts immediately to clean any legacy corrupted duplicates on startup
  if (Array.isArray(state.accounts) && state.accounts.length > 0) {
    state.accounts = sanitizeAccountList(state.accounts);
    if (!state.activeAccountId || !state.accounts.some(a => a.id === state.activeAccountId)) {
      state.activeAccountId = state.accounts[0]?.id || null;
    }
  }
}

function getActiveAccount() {
  return state.accounts.find(a => a.id === state.activeAccountId) || null;
}

// ── Theme ────────────────────────────────────────────────────

function applyTheme() {
  const t = state.themeOverride || 'auto';
  document.body.classList.remove('theme-light');
  if (t === 'light') {
    document.body.classList.add('theme-light');
  } else if (t === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('theme-light');
  }
  document.querySelectorAll('.appearance-opt').forEach(b =>
    b.classList.toggle('active', b.dataset.theme === t));
}

// ── Clock ────────────────────────────────────────────────────

function tickClock() {
  const now = new Date();
  document.getElementById('clock').textContent = formatTime(now);
  document.getElementById('date-display').textContent = formatDate(now);
}
function startClock() { tickClock(); setInterval(tickClock, 1000); }

// ── Dynamic Background Luminance & Shading ────────────────────

function getColorLuminance(hexOrRgb) {
  if (!hexOrRgb) return 0;
  let r = 0, g = 0, b = 0;
  if (hexOrRgb.startsWith('#')) {
    let hex = hexOrRgb.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    r = (num >> 16) & 255;
    g = (num >> 8) & 255;
    b = num & 255;
  } else if (hexOrRgb.startsWith('rgb')) {
    const m = hexOrRgb.match(/\d+/g);
    if (m) { r = parseInt(m[0], 10); g = parseInt(m[1], 10); b = parseInt(m[2], 10); }
  }
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function applyDynamicShading(overallMode, regions = {}) {
  const isLight = overallMode === 'light';
  document.body.classList.toggle('bg-light-shading', isLight);
  document.body.classList.toggle('bg-dark-shading', !isLight);

  const tlMode = regions.topLeft || overallMode;
  const topLeftEl = document.getElementById('top-left');
  if (topLeftEl) {
    topLeftEl.classList.toggle('bg-light-text', tlMode === 'light');
    topLeftEl.classList.toggle('bg-dark-text', tlMode === 'dark');
  }

  const scMode = regions.shortcuts || overallMode;
  const shortcutsEl = document.getElementById('shortcuts-section');
  if (shortcutsEl) {
    shortcutsEl.classList.toggle('bg-light-shortcuts', scMode === 'light');
    shortcutsEl.classList.toggle('bg-dark-shortcuts', scMode === 'dark');
  }
}

function analyzeBackgroundLuminance(url) {
  if (!url) {
    applyDynamicShading('dark');
    return;
  }

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 64, 64);
      const imgData = ctx.getImageData(0, 0, 64, 64).data;

      // 1. Overall average luminance
      let totalLum = 0, count = 0;
      for (let i = 0; i < imgData.length; i += 4) {
        totalLum += 0.299 * imgData[i] + 0.587 * imgData[i+1] + 0.114 * imgData[i+2];
        count++;
      }
      const avgLum = totalLum / count;

      // 2. Top-left region (Clock & Date)
      let tlLum = 0, tlCount = 0;
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 24; x++) {
          const idx = (y * 64 + x) * 4;
          tlLum += 0.299 * imgData[idx] + 0.587 * imgData[idx+1] + 0.114 * imgData[idx+2];
          tlCount++;
        }
      }
      const avgTlLum = tlLum / tlCount;

      // 3. Shortcuts region (Center-bottom)
      let scLum = 0, scCount = 0;
      for (let y = 28; y < 58; y++) {
        for (let x = 12; x < 52; x++) {
          const idx = (y * 64 + x) * 4;
          scLum += 0.299 * imgData[idx] + 0.587 * imgData[idx+1] + 0.114 * imgData[idx+2];
          scCount++;
        }
      }
      const avgScLum = scLum / scCount;

      applyDynamicShading(avgLum > 140 ? 'light' : 'dark', {
        topLeft: avgTlLum > 140 ? 'light' : 'dark',
        shortcuts: avgScLum > 140 ? 'light' : 'dark'
      });
    } catch (e) {
      applyDynamicShading('dark');
    }
  };
  img.onerror = () => {
    applyDynamicShading('dark');
  };
  img.src = url;
}

// ── Background ───────────────────────────────────────────────

function applyBackground(bg, skipTransition) {
  const layerA = document.getElementById('bg-a');
  const layerB = document.getElementById('bg-b');
  const overlay = document.getElementById('bg-overlay');
  const credit  = document.getElementById('photo-credit');
  bg = bg || state.background;

  if (bg.type === 'color') {
    document.body.style.background = bg.value;
    overlay.style.display = 'none';
    credit.innerHTML = '';
    layerA.style.backgroundImage = '';
    layerB.style.backgroundImage = '';
    const lum = getColorLuminance(bg.value);
    applyDynamicShading(lum > 140 ? 'light' : 'dark');
    return;
  }

  document.body.style.background = '';
  overlay.style.display = '';

  let url = '', creditHtml = '';
  if (bg.type === 'curated') {
    const item = CURATED_BACKGROUNDS[bg.index] || CURATED_BACKGROUNDS[0];
    url = item.full;
    creditHtml = `Photo by <a href="${item.authorUrl}" target="_blank" rel="noopener">${item.author}</a>`;
    analyzeBackgroundLuminance(item.thumb || item.full);
  } else if (bg.type === 'upload') {
    url = state.customUploadedBg || '';
    creditHtml = 'Custom background';
    analyzeBackgroundLuminance(url);
  }

  credit.innerHTML = creditHtml;

  const currLayer = activeBgLayer === 'a' ? layerA : layerB;
  const nextLayer = activeBgLayer === 'a' ? layerB : layerA;

  if (skipTransition) {
    currLayer.style.backgroundImage = url ? `url("${url}")` : '';
    currLayer.style.opacity = '1';
    nextLayer.style.backgroundImage = '';
    nextLayer.style.opacity = '0';
    return;
  }

  nextLayer.style.backgroundImage = url ? `url("${url}")` : '';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    nextLayer.style.opacity = '1';
    currLayer.style.opacity = '0';
    activeBgLayer = activeBgLayer === 'a' ? 'b' : 'a';
  }));
}

// ── Search & Autocomplete ─────────────────────────────────────

let suggestAbortController = null;
let suggestDebounceTimer = null;
let currentSuggestions = [];
let activeSuggestionIndex = -1;
let originalTypedQuery = '';
let preVoiceSearchQuery = '';

function parseEngineSuggestions(data) {
  if (!data) return [];
  if (Array.isArray(data)) {
    if (Array.isArray(data[1])) {
      return data[1].map(item => (typeof item === 'string' ? item : item?.phrase || '')).filter(Boolean);
    }
    if (data.length > 0 && typeof data[0] === 'object') {
      return data.map(item => item.phrase || item.key || item.value || '').filter(Boolean);
    }
    if (typeof data[0] === 'string') {
      return data.filter(Boolean);
    }
  }
  if (data?.gossip?.results && Array.isArray(data.gossip.results)) {
    return data.gossip.results.map(r => r.key).filter(Boolean);
  }
  const list = data.results || data.suggestions || data.items;
  if (Array.isArray(list)) {
    return list.map(item => (typeof item === 'string' ? item : (item.value || item.phrase || item.title || ''))).filter(Boolean);
  }
  return [];
}

function formatSuggestionMatch(text, query) {
  if (!text) return '';
  if (!query || !query.trim()) return escHtml(text);
  const qTrim = query.trim();
  const lowerText = text.toLowerCase();
  const lowerQuery = qTrim.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return escHtml(text);
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + qTrim.length);
  const after = text.slice(idx + qTrim.length);
  return `${escHtml(before)}<span class="match">${escHtml(match)}</span>${escHtml(after)}`;
}

function closeSuggestions() {
  const container = document.getElementById('search-suggestions');
  const wrapper = document.getElementById('search-bar-wrapper');
  const input = document.getElementById('search-input');
  if (container) {
    container.classList.add('hidden');
    container.innerHTML = '';
  }
  if (wrapper) {
    wrapper.classList.remove('has-suggestions');
  }
  if (input) {
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }
  currentSuggestions = [];
  activeSuggestionIndex = -1;
}

function renderSuggestions(shortcutMatches, queryMatches, query) {
  const container = document.getElementById('search-suggestions');
  const wrapper = document.getElementById('search-bar-wrapper');
  const input = document.getElementById('search-input');
  if (!container || !wrapper) return;

  const combined = [...shortcutMatches, ...queryMatches];
  currentSuggestions = combined;
  activeSuggestionIndex = -1;

  if (combined.length === 0) {
    closeSuggestions();
    return;
  }

  if (input) {
    input.setAttribute('aria-expanded', 'true');
  }

  container.innerHTML = '';

  combined.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'suggestion-item';
    row.setAttribute('role', 'option');
    row.setAttribute('id', `suggest-item-${index}`);

    if (item.type === 'shortcut') {
      row.innerHTML = `
        <div class="suggestion-icon">
          <img src="${escHtml(item.icon)}" alt="" onerror="this.style.display='none'">
        </div>
        <div class="suggestion-text-wrap">
          <span class="suggestion-text">${formatSuggestionMatch(item.title, query)}</span>
          <span class="suggestion-badge">Shortcut</span>
          <span class="suggestion-sub">${formatSuggestionMatch(item.subText, query)}</span>
        </div>
        <button class="suggestion-fill-btn" title="Fill query" aria-label="Fill query">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      `;
      const imgEl = row.querySelector('.suggestion-icon img');
      if (imgEl && item.icon) {
        applyCachedFavicon(imgEl, item.icon);
      }
    } else if (item.type === 'url') {
      row.innerHTML = `
        <div class="suggestion-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <div class="suggestion-text-wrap">
          <span class="suggestion-text">${formatSuggestionMatch(item.displayText, query)}</span>
          <span class="suggestion-badge url-badge">Website</span>
        </div>
        <button class="suggestion-fill-btn" title="Fill query" aria-label="Fill query">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      `;
    } else {
      row.innerHTML = `
        <div class="suggestion-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div class="suggestion-text-wrap">
          <span class="suggestion-text">${formatSuggestionMatch(item.displayText, query)}</span>
        </div>
        <button class="suggestion-fill-btn" title="Fill query" aria-label="Fill query">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      `;
    }

    row.addEventListener('click', (e) => {
      if (e.target.closest('.suggestion-fill-btn')) return;
      closeSuggestions();
      if (item.type === 'shortcut' || item.type === 'url') {
        window.location.href = item.url || item.displayText;
      } else {
        doSearch(item.displayText);
      }
    });

    row.addEventListener('mouseenter', () => {
      activeSuggestionIndex = index;
      updateActiveSuggestionUI();
    });

    const fillBtn = row.querySelector('.suggestion-fill-btn');
    if (fillBtn) {
      fillBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const inputEl = document.getElementById('search-input');
        inputEl.value = item.displayText;
        originalTypedQuery = item.displayText;
        inputEl.focus();
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.classList.remove('hidden');
        fetchAndRenderSuggestions(item.displayText);
      });
    }

    container.appendChild(row);
  });

  container.classList.remove('hidden');
  wrapper.classList.add('has-suggestions');
}

async function fetchAndRenderSuggestions(query) {
  if (!query || !query.trim()) {
    closeSuggestions();
    return;
  }

  const qTrim = query.trim();
  const qNorm = qTrim.toLowerCase();

  // 1. Instant local matching shortcuts
  const shortcutMatches = (state.shortcuts || [])
    .filter(s => (s.name || '').toLowerCase().includes(qNorm) || (s.url || '').toLowerCase().includes(qNorm))
    .slice(0, 3)
    .map(s => ({
      type: 'shortcut',
      title: s.name,
      url: s.url,
      id: s.id,
      icon: favIcon(s.url),
      displayText: s.name,
      subText: s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    }));

  // 2. Remote suggestion API with AbortController
  if (suggestAbortController) {
    suggestAbortController.abort();
  }
  suggestAbortController = new AbortController();
  const signal = suggestAbortController.signal;

  const eng = SEARCH_ENGINES[state.searchEngine] || SEARCH_ENGINES.google;
  let queryMatches = [];

  if (eng.suggestUrl) {
    try {
      const res = await fetch(eng.suggestUrl(qTrim), {
        signal,
        headers: { 'Accept': 'application/json, text/javascript, */*' }
      });
      if (res.ok) {
        const data = await res.json();
        const parsed = parseEngineSuggestions(data);
        const seen = new Set(shortcutMatches.map(s => s.displayText.toLowerCase()));
        queryMatches = parsed
          .filter(text => {
            if (typeof text !== 'string' || !text.trim()) return false;
            const t = text.trim();
            const lower = t.toLowerCase();
            if (seen.has(lower)) return false;
            seen.add(lower);
            return true;
          })
          .slice(0, 7)
          .map(text => {
            const t = text.trim();
            const isUrl = /^https?:\/\/[^\s]+$/i.test(t);
            return {
              type: isUrl ? 'url' : 'query',
              displayText: t,
              query: t,
              url: isUrl ? t : null
            };
          });
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  if (document.activeElement === document.getElementById('search-input')) {
    renderSuggestions(shortcutMatches, queryMatches, qTrim);
  }
}

function updateActiveSuggestionUI() {
  const items = document.querySelectorAll('.suggestion-item');
  items.forEach((el, i) => {
    el.classList.toggle('selected', i === activeSuggestionIndex);
    if (i === activeSuggestionIndex) {
      el.scrollIntoView({ block: 'nearest' });
    }
  });

  const input = document.getElementById('search-input');
  if (input) {
    if (activeSuggestionIndex >= 0) {
      input.setAttribute('aria-activedescendant', `suggest-item-${activeSuggestionIndex}`);
    } else {
      input.removeAttribute('aria-activedescendant');
    }
    if (activeSuggestionIndex === -1) {
      input.value = originalTypedQuery;
    } else if (currentSuggestions[activeSuggestionIndex]) {
      input.value = currentSuggestions[activeSuggestionIndex].displayText;
    }
  }
}

function updateEngineUI() {
  const eng  = SEARCH_ENGINES[state.searchEngine] || SEARCH_ENGINES.google;
  const icon = document.getElementById('engine-icon');
  applyCachedFavicon(icon, eng.icon);
  icon.alt = eng.name;
  document.querySelectorAll('.engine-opt').forEach(opt => {
    const chk = opt.querySelector('.engine-check');
    if (chk) chk.classList.toggle('hidden', opt.dataset.engine !== state.searchEngine);
  });
  document.querySelectorAll('.engine-list-item').forEach(el =>
    el.classList.toggle('active', el.dataset.engine === state.searchEngine));
}

function doSearch(q) {
  if (!q || !q.trim()) return;
  closeSuggestions();
  const trimmed = q.trim();
  if (/^https?:\/\/[^\s]+$/i.test(trimmed)) {
    window.location.href = trimmed;
    return;
  }
  const eng = SEARCH_ENGINES[state.searchEngine] || SEARCH_ENGINES.google;
  window.location.href = eng.url + encodeURIComponent(trimmed);
}

// ── Voice Search Dictation Module ─────────────────────────────

const BRAVE_VOICE_NOTICE = 'Voice search is in development for Brave Browser (Brave is building on-device private speech recognition). In the meantime, you can use voice search in Google Chrome or Microsoft Edge, or type your query in the search bar.';

const VOICE_LANGUAGES = [
  { code: 'auto', name: 'Auto (Browser Default)', nativeName: 'Auto', short: 'Auto' },
  { code: 'en-US', name: 'English (US)', nativeName: 'English (United States)', short: 'EN (US)' },
  { code: 'en-GB', name: 'English (UK)', nativeName: 'English (United Kingdom)', short: 'EN (UK)' },
  { code: 'en-AU', name: 'English (Australia)', nativeName: 'English (Australia)', short: 'EN (AU)' },
  { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', short: 'EN (IN)' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', nativeName: 'العربية (السعودية)', short: 'العربية (السعودية)', rtl: true },
  { code: 'ar-EG', name: 'Arabic (Egypt)', nativeName: 'العربية (مصر)', short: 'العربية (مصر)', rtl: true },
  { code: 'ar-AE', name: 'Arabic (UAE)', nativeName: 'العربية (الإمارات)', short: 'العربية (الإمارات)', rtl: true },
  { code: 'ar-KW', name: 'Arabic (Kuwait)', nativeName: 'العربية (الكويت)', short: 'العربية (الكويت)', rtl: true },
  { code: 'ar-MA', name: 'Arabic (Morocco)', nativeName: 'العربية (المغرب)', short: 'العربية (المغرب)', rtl: true },
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)', short: 'ES (ES)' },
  { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)', short: 'ES (MX)' },
  { code: 'es-US', name: 'Spanish (US)', nativeName: 'Español (EE.UU.)', short: 'ES (US)' },
  { code: 'es-AR', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', short: 'ES (AR)' },
  { code: 'fr-FR', name: 'French (France)', nativeName: 'Français (France)', short: 'FR (FR)' },
  { code: 'fr-CA', name: 'French (Canada)', nativeName: 'Français (Canada)', short: 'FR (CA)' },
  { code: 'de-DE', name: 'German (Germany)', nativeName: 'Deutsch (Deutschland)', short: 'DE (DE)' },
  { code: 'de-AT', name: 'German (Austria)', nativeName: 'Deutsch (Österreich)', short: 'DE (AT)' },
  { code: 'it-IT', name: 'Italian (Italy)', nativeName: 'Italiano (Italia)', short: 'IT (IT)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', short: 'PT (BR)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', short: 'PT (PT)' },
  { code: 'ru-RU', name: 'Russian (Russia)', nativeName: 'Русский (Россия)', short: 'RU (RU)' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', short: '日本語' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어', short: '한국어' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', short: '中文 (简)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', short: '中文 (繁)' },
  { code: 'hi-IN', name: 'Hindi (India)', nativeName: 'हिन्दी (भारत)', short: 'हिन्दी' },
  { code: 'ur-PK', name: 'Urdu (Pakistan)', nativeName: 'اردو (پاکستان)', short: 'اردو (پاکستان)', rtl: true },
  { code: 'tr-TR', name: 'Turkish (Turkey)', nativeName: 'Türkçe (Türkiye)', short: 'TR (TR)' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)', nativeName: 'Nederlands (Nederland)', short: 'NL (NL)' },
  { code: 'pl-PL', name: 'Polish (Poland)', nativeName: 'Polski (Polska)', short: 'PL (PL)' },
  { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia', short: 'ID (ID)' },
  { code: 'vi-VN', name: 'Vietnamese', nativeName: 'Tiếng Việt', short: 'VI (VN)' },
  { code: 'th-TH', name: 'Thai', nativeName: 'ไทย', short: 'TH (TH)' },
  { code: 'sv-SE', name: 'Swedish', nativeName: 'Svenska (Sverige)', short: 'SV (SE)' }
];

const VOICE_LOCALIZATIONS = {
  en: {
    saySomething: 'Say something...',
    listening: 'Listening...',
    tapToSpeak: 'Tap microphone to speak',
    connecting: 'Connecting...',
    searching: 'Searching...',
    noSpeech: "Didn't catch that. Tap microphone to speak",
    voiceSearchTitle: 'Voice Search',
    searchLangPlaceholder: 'Search language...',
    changeLangTitle: 'Change voice language',
    micPermissionNeeded: 'Microphone Permission Needed',
    micPermissionDesc: 'To enable Voice Search on your new tab, Chrome requires permission on an extension page.',
    grantMicBtn: 'Grant Microphone Access',
    timeoutError: 'Speech recognition service timed out. Please check your microphone and try again.',
    micBlockedError: 'Microphone access is blocked. Please allow microphone permissions in site settings to use voice search.',
    micDeniedChromeError: 'Microphone access is blocked. Please allow microphone permissions in Chrome site settings (chrome://settings/content/microphone) to use voice search.',
    unreachableError: 'Speech recognition service unreachable. Please check your network connection and try again.',
    typeSearch: 'Type search',
    tryAgain: 'Try again'
  },
  ar: {
    saySomething: 'تحدّث الآن...',
    listening: 'جارٍ الاستماع...',
    tapToSpeak: 'اضغط على الميكروفون للتحدث',
    connecting: 'جارٍ الاتصال...',
    searching: 'جارٍ البحث...',
    noSpeech: 'لم يتم التعرف على الصوت. اضغط للتحدث',
    voiceSearchTitle: 'البحث الصوتي',
    searchLangPlaceholder: 'البحث عن لغة...',
    changeLangTitle: 'تغيير لغة البحث الصوتي',
    micPermissionNeeded: 'مطلوب إذن الميكروفون',
    micPermissionDesc: 'لتفعيل البحث الصوتي في الصفحة الرئيسية، يلزم منح الإذن من صفحة الإضافة.',
    grantMicBtn: 'منح إذن الميكروفون',
    timeoutError: 'انتهت مهلة خدمة التعرف على الصوت. يرجى التحقق من الميكروفون والمحاولة مرة أخرى.',
    micBlockedError: 'تم حظر الوصول إلى الميكروفون. يرجى السماح بإذن الميكروفون في إعدادات الموقع لاستخدام البحث الصوتي.',
    unreachableError: 'تعذر الوصول إلى خدمة التعرف على الصوت. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.',
    typeSearch: 'البحث بالكتابة',
    tryAgain: 'إعادة المحاولة'
  },
  es: {
    saySomething: 'Di algo...',
    listening: 'Escuchando...',
    tapToSpeak: 'Toca el micrófono para hablar',
    connecting: 'Conectando...',
    searching: 'Buscando...',
    noSpeech: 'No se escuchó nada. Toca el micrófono para hablar',
    voiceSearchTitle: 'Búsqueda por voz',
    searchLangPlaceholder: 'Buscar idioma...',
    changeLangTitle: 'Cambiar idioma de voz',
    micPermissionNeeded: 'Se requiere permiso de micrófono',
    micPermissionDesc: 'Para habilitar la búsqueda por voz, Chrome requiere permiso en una página de extensión.',
    grantMicBtn: 'Permitir acceso al micrófono',
    timeoutError: 'El servicio de reconocimiento de voz ha agotado el tiempo. Comprueba tu micrófono e inténtalo de nuevo.',
    micBlockedError: 'El acceso al micrófono está bloqueado. Permite los permisos de micrófono en la configuración del sitio para usar la búsqueda por voz.',
    unreachableError: 'No se puede acceder al servicio de reconocimiento de voz. Comprueba tu conexión a Internet e inténtalo de nuevo.',
    typeSearch: 'Escribir búsqueda',
    tryAgain: 'Reintentar'
  },
  fr: {
    saySomething: 'Dites quelque chose...',
    listening: 'Écoute en cours...',
    tapToSpeak: 'Appuyez sur le micro pour parler',
    connecting: 'Connexion...',
    searching: 'Recherche...',
    noSpeech: 'Rien entendu. Appuyez sur le micro pour parler',
    voiceSearchTitle: 'Recherche vocale',
    searchLangPlaceholder: 'Rechercher une langue...',
    changeLangTitle: 'Changer la langue vocale',
    micPermissionNeeded: 'Autorisation du micro requise',
    micPermissionDesc: "Pour activer la recherche vocale, Chrome nécessite une autorisation sur une page d'extension.",
    grantMicBtn: "Autoriser l'accès au micro",
    timeoutError: 'Le service de reconnaissance vocale a expiré. Veuillez vérifier votre micro et réessayer.',
    micBlockedError: "L'accès au micro est bloqué. Veuillez autoriser le micro dans les paramètres du site pour utiliser la recherche vocale.",
    unreachableError: 'Service de reconnaissance vocale inaccessible. Veuillez vérifier votre connexion réseau et réessayer.',
    typeSearch: 'Saisir la recherche',
    tryAgain: 'Réessayer'
  },
  de: {
    saySomething: 'Sprich jetzt...',
    listening: 'Zuhören...',
    tapToSpeak: 'Tippe auf das Mikrofon zum Sprechen',
    connecting: 'Verbindung...',
    searching: 'Suchen...',
    noSpeech: 'Nicht verstanden. Tippe zum Sprechen',
    voiceSearchTitle: 'Sprachsuche',
    searchLangPlaceholder: 'Sprache suchen...',
    changeLangTitle: 'Sprache für Spracheingabe ändern',
    micPermissionNeeded: 'Mikrofonberechtigung erforderlich',
    micPermissionDesc: 'Um die Spracheingabe zu aktivieren, benötigt Chrome eine Berechtigung auf einer Erweiterungsseite.',
    grantMicBtn: 'Mikrofonzugriff erlauben',
    timeoutError: 'Zeitüberschreitung beim Spracherkennungsdienst. Bitte überprüfe dein Mikrofon und versuche es erneut.',
    micBlockedError: 'Mikrofonzugriff ist blockiert. Bitte erlaube Mikrofonberechtigungen in den Website-Einstellungen.',
    unreachableError: 'Spracherkennungsdienst nicht erreichbar. Bitte überprüfe deine Netzwerkverbindung und versuche es erneut.',
    typeSearch: 'Suche tippen',
    tryAgain: 'Erneut versuchen'
  },
  it: {
    saySomething: "Di' qualcosa...",
    listening: 'In ascolto...',
    tapToSpeak: 'Tocca il microfono per parlare',
    connecting: 'Connessione...',
    searching: 'Ricerca...',
    noSpeech: 'Non ho capito. Tocca per parlare',
    voiceSearchTitle: 'Ricerca vocale',
    searchLangPlaceholder: 'Cerca lingua...',
    changeLangTitle: 'Cambia lingua vocale',
    micPermissionNeeded: 'Autorizzazione microfono richiesta',
    micPermissionDesc: "Per abilitare la ricerca vocale, Chrome richiede l'autorizzazione su una pagina dell'estensione.",
    grantMicBtn: 'Consenti accesso al microfono',
    timeoutError: 'Servizio di riconoscimento vocale scaduto. Controlla il microfono e riprova.',
    micBlockedError: 'Accesso al microfono bloccato. Consenti le autorizzazioni del microfono nelle impostazioni del sito.',
    unreachableError: 'Servizio di riconoscimento vocale non raggiungibile. Controlla la connessione di rete e riprova.',
    typeSearch: 'Digita la ricerca',
    tryAgain: 'Riprova'
  },
  pt: {
    saySomething: 'Fale agora...',
    listening: 'Ouvindo...',
    tapToSpeak: 'Toque no microfone para falar',
    connecting: 'Conectando...',
    searching: 'Pesquisando...',
    noSpeech: 'Não entendi. Toque no microfone para falar',
    voiceSearchTitle: 'Pesquisa por voz',
    searchLangPlaceholder: 'Buscar idioma...',
    changeLangTitle: 'Alterar idioma de voz',
    micPermissionNeeded: 'Permissão de microfone necessária',
    micPermissionDesc: 'Para ativar a pesquisa por voz, o Chrome requer permissão em uma página de extensão.',
    grantMicBtn: 'Permitir acesso ao microfone',
    timeoutError: 'Tempo limite do serviço de reconhecimento de voz. Verifique seu microfone e tente novamente.',
    micBlockedError: 'O acesso ao microfone está bloqueado. Permita as permissões do microfone nas configurações do site.',
    unreachableError: 'Serviço de reconhecimento de voz inacessível. Verifique sua conexão de rede e tente novamente.',
    typeSearch: 'Digitar pesquisa',
    tryAgain: 'Tentar novamente'
  },
  ru: {
    saySomething: 'Говорите...',
    listening: 'Слушаю...',
    tapToSpeak: 'Нажмите на микрофон, чтобы говорить',
    connecting: 'Подключение...',
    searching: 'Поиск...',
    noSpeech: 'Не удалось распознать. Нажмите для повтора',
    voiceSearchTitle: 'Голосовой поиск',
    searchLangPlaceholder: 'Поиск языка...',
    changeLangTitle: 'Сменить язык голосового поиска',
    micPermissionNeeded: 'Требуется доступ к микрофону',
    micPermissionDesc: 'Чтобы включить голосовой поиск, Chrome требует разрешения на странице расширения.',
    grantMicBtn: 'Предоставить доступ к микрофону',
    timeoutError: 'Время ожидания распознавания речи истекло. Проверьте микрофон и повторите попытку.',
    micBlockedError: 'Доступ к микрофону заблокирован. Разрешите доступ к микрофону в настройках сайта.',
    unreachableError: 'Сервер распознавания речи недоступен. Проверьте подключение к сети и повторите попытку.',
    typeSearch: 'Ввести вручную',
    tryAgain: 'Повторить'
  },
  ja: {
    saySomething: 'お話しください...',
    listening: '聞き取り中...',
    tapToSpeak: 'マイクをタップして話してください',
    connecting: '接続中...',
    searching: '検索中...',
    noSpeech: '聞き取れませんでした。タップしてもう一度お話しください',
    voiceSearchTitle: '音声検索',
    searchLangPlaceholder: '言語を検索...',
    changeLangTitle: '音声言語を変更',
    micPermissionNeeded: 'マイクの許可が必要です',
    micPermissionDesc: '新しいタブで音声検索を有効にするには、拡張機能ページで許可が必要です。',
    grantMicBtn: 'マイクへのアクセスを許可',
    timeoutError: '音声認識サービスがタイムアウトしました。マイクを確認してもう一度お試しください。',
    micBlockedError: 'マイクへのアクセスがブロックされています。サイト設定でマイクを許可してください。',
    unreachableError: '音声認識サービスに接続できません。ネットワーク接続を確認してもう一度お試しください。',
    typeSearch: '文字で検索',
    tryAgain: '再試行'
  },
  ko: {
    saySomething: '말씀하세요...',
    listening: '듣고 있습니다...',
    tapToSpeak: '마이크를 탭하여 말하세요',
    connecting: '연결 중...',
    searching: '검색 중...',
    noSpeech: '음성을 인식하지 못했습니다. 다시 탭하세요',
    voiceSearchTitle: '음성 검색',
    searchLangPlaceholder: '언어 검색...',
    changeLangTitle: '음성 언어 변경',
    micPermissionNeeded: '마이크 권한이 필요합니다',
    micPermissionDesc: '새 탭에서 음성 검색을 사용하려면 확장 프로그램 페이지에서 권한이 필요합니다.',
    grantMicBtn: '마이크 액세스 허용',
    timeoutError: '음성 인식 서비스 시간이 초과되었습니다. 마이크를 확인하고 다시 시도하세요.',
    micBlockedError: '마이크 액세스가 차단되었습니다. 음성 검색을 사용하려면 사이트 설정에서 마이크를 허용하세요.',
    unreachableError: '음성 인식 서비스에 연결할 수 없습니다. 네트워크 연결을 확인하고 다시 시도하세요.',
    typeSearch: '직접 입력',
    tryAgain: '다시 시도'
  },
  zh: {
    saySomething: '请说话...',
    listening: '正在聆听...',
    tapToSpeak: '点击麦克风开始说话',
    connecting: '正在连接...',
    searching: '正在搜索...',
    noSpeech: '未听到声音，点击麦克风重试',
    voiceSearchTitle: '语音搜索',
    searchLangPlaceholder: '搜索语言...',
    changeLangTitle: '更改语音语言',
    micPermissionNeeded: '需要麦克风权限',
    micPermissionDesc: '若要在新标签页启用语音搜索，Chrome 需要在扩展程序页面获取权限。',
    grantMicBtn: '允许麦克风权限',
    timeoutError: '语音识别服务超时，请检查麦克风后重试。',
    micBlockedError: '麦克风访问已被阻止。请在网站设置中允许麦克风权限以使用语音搜索。',
    unreachableError: '无法连接到语音识别服务，请检查网络连接后重试。',
    typeSearch: '输入搜索',
    tryAgain: '重试'
  },
  hi: {
    saySomething: 'कुछ बोलिए...',
    listening: 'सुन रहे हैं...',
    tapToSpeak: 'बोलने के लिए माइक्रोफ़ोन पर टैप करें',
    connecting: 'कनेक्ट हो रहा है...',
    searching: 'खोज रहे हैं...',
    noSpeech: 'कुछ सुनाई नहीं दिया। बोलने के लिए टैप करें',
    voiceSearchTitle: 'वॉइस सर्च',
    searchLangPlaceholder: 'भाषा खोजें...',
    changeLangTitle: 'आवाज़ की भाषा बदलें',
    micPermissionNeeded: 'माइक्रोफ़ोन अनुमति आवश्यक है',
    micPermissionDesc: 'वॉइस सर्च सक्षम करने के लिए, एक्सटेंशन पेज पर अनुमति आवश्यक है।',
    grantMicBtn: 'माइक्रोफ़ोन एक्सेस दें',
    timeoutError: 'वॉइस पहचान सेवा का समय समाप्त हो गया। कृपया अपना माइक्रोफ़ोन जांचें और पुनः प्रयास करें।',
    micBlockedError: 'माइक्रोफ़ोन एक्सेस अवरोधित है। वॉइस सर्च का उपयोग करने के लिए साइट सेटिंग्स में अनुमति दें।',
    unreachableError: 'वॉइस पहचान सेवा अनुपलब्ध है। कृपया नेटवर्क कनेक्शन जांचें और पुनः प्रयास करें।',
    typeSearch: 'टाइप करके खोजें',
    tryAgain: 'पुनः प्रयास करें'
  },
  ur: {
    saySomething: 'کچھ بولیں...',
    listening: 'سن رہا ہے...',
    tapToSpeak: 'بولنے کے لیے مائیکروفون دبائیں',
    connecting: 'رابطہ ہو رہا ہے...',
    searching: 'تلاش ہو رہی ہے...',
    noSpeech: 'آواز سمجھ نہیں آئی۔ بولنے کے لیے دوبارہ دبائیں',
    voiceSearchTitle: 'وائس سرچ',
    searchLangPlaceholder: 'زبان تلاش کریں...',
    changeLangTitle: 'آواز کی زبان تبدیل کریں',
    micPermissionNeeded: 'مائیکروفون کی اجازت درکار ہے',
    micPermissionDesc: 'وائس سرچ کو فعال کرنے کے لیے ایکسٹینشن پیج پر اجازت درکار ہے۔',
    grantMicBtn: 'مائیکروفون رسائی دیں',
    timeoutError: 'آواز کی شناخت کی سروس کا وقت ختم ہو گیا۔ مائیکروفون چیک کریں اور دوبارہ کوشش کریں۔',
    micBlockedError: 'مائیکروفون تک رسائی بند ہے۔ وائس سرچ کے لیے سائٹ سیٹنگز میں اجازت دیں۔',
    unreachableError: 'آواز کی شناخت کی سروس دستیاب نہیں ہے۔ انٹرنیٹ چیک کریں اور دوبارہ کوشش کریں۔',
    typeSearch: 'لکھ کر تلاش کریں',
    tryAgain: 'دوبارہ کوشش کریں'
  },
  tr: {
    saySomething: 'Bir şeyler söyleyin...',
    listening: 'Dinleniyor...',
    tapToSpeak: 'Konuşmak için mikrofona dokunun',
    connecting: 'Bağlanıyor...',
    searching: 'Aranıyor...',
    noSpeech: 'Ses algılanamadı. Konuşmak için dokunun',
    voiceSearchTitle: 'Sesli Arama',
    searchLangPlaceholder: 'Dil ara...',
    changeLangTitle: 'Ses dilini değiştir',
    micPermissionNeeded: 'Mikrofon İzni Gerekli',
    micPermissionDesc: 'Sesli aramayı etkinleştirmek için Chrome uzantı sayfasında izin gerektirir.',
    grantMicBtn: 'Mikrofon Erişimine İzin Ver',
    timeoutError: 'Ses tanıma hizmeti zaman aşımına uğradı. Lütfen mikrofonunuzu kontrol edip tekrar deneyin.',
    micBlockedError: 'Mikrofon erişimi engellendi. Sesli aramayı kullanmak için site ayarlarında izin verin.',
    unreachableError: 'Ses tanıma hizmetine ulaşılamıyor. Lütfen ağ bağlantınızı kontrol edin ve tekrar deneyin.',
    typeSearch: 'Aramayı yazın',
    tryAgain: 'Tekrar dene'
  },
  nl: {
    saySomething: 'Zeg iets...',
    listening: 'Luisteren...',
    tapToSpeak: 'Tik op de microfoon om te spreken',
    connecting: 'Verbinden...',
    searching: 'Zoeken...',
    noSpeech: 'Niet verstaan. Tik om te spreken',
    voiceSearchTitle: 'Spraakgestuurd zoeken',
    searchLangPlaceholder: 'Taal zoeken...',
    changeLangTitle: 'Spraaktaal wijzigen',
    micPermissionNeeded: 'Microfoontoegang vereist',
    micPermissionDesc: 'Om spraakgestuurd zoeken in te schakelen, vereist Chrome toestemming op een extensiepagina.',
    grantMicBtn: 'Microfoontoegang toestaan',
    timeoutError: 'Spraakherkenningsservice time-out. Controleer je microfoon en probeer het opnieuw.',
    micBlockedError: 'Microfoontoegang is geblokkeerd. Sta microfoontoegang toe in de site-instellingen.',
    unreachableError: 'Spraakherkenningsservice onbereikbaar. Controleer je netwerkverbinding en probeer het opnieuw.',
    typeSearch: 'Typ zoekopdracht',
    tryAgain: 'Opnieuw proberen'
  },
  pl: {
    saySomething: 'Powiedz coś...',
    listening: 'Słucham...',
    tapToSpeak: 'Dotknij mikrofonu, aby mówić',
    connecting: 'Łączenie...',
    searching: 'Szukanie...',
    noSpeech: 'Nie rozpoznano mowy. Dotknij, aby powtórzyć',
    voiceSearchTitle: 'Wyszukiwanie głosowe',
    searchLangPlaceholder: 'Szukaj języka...',
    changeLangTitle: 'Zmień język głosu',
    micPermissionNeeded: 'Wymagany dostęp do mikrofonu',
    micPermissionDesc: 'Aby włączyć wyszukiwanie głosowe, Chrome wymaga zgody na stronie rozszerzenia.',
    grantMicBtn: 'Zezwól na dostęp do mikrofonu',
    timeoutError: 'Upłynął limit czasu usługi rozpoznawania mowy. Sprawdź mikrofon i spróbuj ponownie.',
    micBlockedError: 'Dostęp do mikrofonu jest zablokowany. Zezwól na dostęp do mikrofonu w ustawieniach witryny.',
    unreachableError: 'Usługa rozpoznawania mowy jest nieosiągalna. Sprawdź połączenie sieciowe i spróbuj ponownie.',
    typeSearch: 'Wpisz wyszukiwanie',
    tryAgain: 'Spróbuj ponownie'
  },
  id: {
    saySomething: 'Katakan sesuatu...',
    listening: 'Mendengarkan...',
    tapToSpeak: 'Ketuk mikrofon untuk berbicara',
    connecting: 'Menghubungkan...',
    searching: 'Mencari...',
    noSpeech: 'Suara tidak terdengar. Ketuk untuk berbicara',
    voiceSearchTitle: 'Penelusuran Suara',
    searchLangPlaceholder: 'Cari bahasa...',
    changeLangTitle: 'Ubah bahasa suara',
    micPermissionNeeded: 'Izin Mikrofon Diperlukan',
    micPermissionDesc: 'Untuk mengaktifkan Penelusuran Suara, Chrome memerlukan izin pada halaman ekstensi.',
    grantMicBtn: 'Berikan Akses Mikrofon',
    timeoutError: 'Layanan pengenalan suara habis waktu. Silakan periksa mikrofon Anda dan coba lagi.',
    micBlockedError: 'Akses mikrofon diblokir. Izinkan izin mikrofon di setelan situs untuk menggunakan penelusuran suara.',
    unreachableError: 'Layanan pengenalan suara tidak dapat dijangkau. Periksa koneksi jaringan Anda dan coba lagi.',
    typeSearch: 'Ketik penelusuran',
    tryAgain: 'Coba lagi'
  },
  vi: {
    saySomething: 'Hãy nói gì đó...',
    listening: 'Đang nghe...',
    tapToSpeak: 'Nhấn vào micrô để nói',
    connecting: 'Đang kết nối...',
    searching: 'Đang tìm kiếm...',
    noSpeech: 'Không nhận dạng được. Nhấn để nói lại',
    voiceSearchTitle: 'Tìm kiếm bằng giọng nói',
    searchLangPlaceholder: 'Tìm kiếm ngôn ngữ...',
    changeLangTitle: 'Thay đổi ngôn ngữ giọng nói',
    micPermissionNeeded: 'Cần có quyền truy cập micrô',
    micPermissionDesc: 'Để bật Tìm kiếm bằng giọng nói, Chrome yêu cầu cấp quyền trên trang tiện ích mở rộng.',
    grantMicBtn: 'Cấp quyền truy cập micrô',
    timeoutError: 'Dịch vụ nhận dạng giọng nói đã hết thời gian. Vui lòng kiểm tra micrô và thử lại.',
    micBlockedError: 'Quyền truy cập micrô bị chặn. Vui lòng cho phép quyền sử dụng micrô trong cài đặt trang web.',
    unreachableError: 'Không thể kết nối với dịch vụ nhận dạng giọng nói. Vui lòng kiểm tra kết nối mạng và thử lại.',
    typeSearch: 'Nhập tìm kiếm',
    tryAgain: 'Thử lại'
  },
  th: {
    saySomething: 'พูดอะไรบางอย่าง...',
    listening: 'กำลังฟัง...',
    tapToSpeak: 'แตะไมโครโฟนเพื่อพูด',
    connecting: 'กำลังเชื่อมต่อ...',
    searching: 'กำลังค้นหา...',
    noSpeech: 'ไม่ได้ยิน แตะเพื่อพูดอีกครั้ง',
    voiceSearchTitle: 'การค้นหาด้วยเสียง',
    searchLangPlaceholder: 'ค้นหาภาษา...',
    changeLangTitle: 'เปลี่ยนภาษาของเสียง',
    micPermissionNeeded: 'จำเป็นต้องได้รับอนุญาตใช้ไมโครโฟน',
    micPermissionDesc: 'ในการเปิดใช้การค้นหาด้วยเสียง จำเป็นต้องอนุญาตในหน้าส่วนขยาย',
    grantMicBtn: 'อนุญาตให้เข้าถึงไมโครโฟน',
    timeoutError: 'บริการการรู้จำเสียงหมดเวลา โปรดตรวจสอบไมโครโฟนของคุณแล้วลองอีกครั้ง',
    micBlockedError: 'การเข้าถึงไมโครโฟนถูกบล็อก โปรดอนุญาตการใช้ไมโครโฟนในการตั้งค่าไซต์',
    unreachableError: 'ไม่สามารถเข้าถึงบริการการรู้จำเสียง โปรดตรวจสอบการเชื่อมต่อเครือข่ายแล้วลองอีกครั้ง',
    typeSearch: 'พิมพ์คำค้นหา',
    tryAgain: 'ลองอีกครั้ง'
  },
  sv: {
    saySomething: 'Säg något...',
    listening: 'Lyssnar...',
    tapToSpeak: 'Tryck på mikrofonen för att tala',
    connecting: 'Ansluter...',
    searching: 'Söker...',
    noSpeech: 'Hörde inte. Tryck för att tala',
    voiceSearchTitle: 'Röstsökning',
    searchLangPlaceholder: 'Sök språk...',
    changeLangTitle: 'Ändra röstspråk',
    micPermissionNeeded: 'Mikrofonåtkomst krävs',
    micPermissionDesc: 'För att aktivera röstsökning krävs tillstånd på en tilläggssida.',
    grantMicBtn: 'Tillåt mikrofonåtkomst',
    timeoutError: 'Tidsgräns för röstigenkänning överskreds. Kontrollera mikrofonen och försök igen.',
    micBlockedError: 'Mikrofonåtkomst är blockerad. Tillåt mikrofonbehörighet i webbplatsinställningarna.',
    unreachableError: 'Det gick inte att nå röstigenkänningstjänsten. Kontrollera nätverksanslutningen och försök igen.',
    typeSearch: 'Skriv sökning',
    tryAgain: 'Försök igen'
  }
};

function getVoiceI18n(key) {
  const currentLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  let langCode = currentLang;
  if (langCode === 'auto') {
    langCode = (window.navigator?.language || 'en-US');
  }
  const langKey = (langCode || 'en').toLowerCase().split('-')[0];
  const dict = VOICE_LOCALIZATIONS[langKey] || VOICE_LOCALIZATIONS['en'];
  return dict[key] || VOICE_LOCALIZATIONS['en'][key] || '';
}

function getVoiceLanguages() {
  return VOICE_LANGUAGES;
}

function getEffectiveVoiceLang() {
  const vLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  if (vLang === 'auto') {
    return (window.navigator?.language || 'en-US');
  }
  return vLang;
}

function isCurrentVoiceLangRtl() {
  const currentLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  const langObj = VOICE_LANGUAGES.find(l => l.code === currentLang);
  if (langObj && langObj.rtl) return true;
  const lang = (getEffectiveVoiceLang() || '').toLowerCase();
  return lang.startsWith('ar') || lang.startsWith('ur') || lang.startsWith('fa') || lang.startsWith('he');
}

function updateVoiceBtnVisibility() {
  const voiceBtn = document.getElementById('voice-btn');
  const isVisible = (typeof state !== 'undefined' && state?.showVoiceBtn !== undefined) ? state.showVoiceBtn !== false : true;
  if (voiceBtn) {
    voiceBtn.classList.toggle('hidden', !isVisible);
  }
  const toggle = document.getElementById('voice-btn-toggle');
  if (toggle) {
    toggle.checked = isVisible;
  }
}

function populateVoiceLangSelect() {
  const select = document.getElementById('voice-lang-select');
  if (!select) return;
  select.innerHTML = '';
  const currentLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  VOICE_LANGUAGES.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang.code;
    opt.textContent = lang.code === 'auto'
      ? lang.name
      : `${lang.name} — ${lang.nativeName}`;
    if (lang.code === currentLang) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

function updateVoiceLangUI() {
  const currentLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  const langObj = VOICE_LANGUAGES.find(l => l.code === currentLang) || VOICE_LANGUAGES[0];

  const labelEl = document.getElementById('voice-lang-current-label');
  if (labelEl) {
    labelEl.textContent = langObj.short || langObj.name;
    labelEl.dir = langObj.rtl ? 'rtl' : 'ltr';
  }

  const langBtn = document.getElementById('voice-lang-btn');
  if (langBtn) {
    langBtn.title = getVoiceI18n('changeLangTitle');
  }

  const searchInput = document.getElementById('voice-lang-search-input');
  if (searchInput) {
    searchInput.placeholder = getVoiceI18n('searchLangPlaceholder');
  }

  const select = document.getElementById('voice-lang-select');
  if (select && select.value !== currentLang) {
    select.value = currentLang;
  }

  if (typeof document.querySelectorAll === 'function') {
    document.querySelectorAll('.voice-lang-opt').forEach(opt => {
      const isActive = opt.dataset.code === currentLang;
      opt.classList.toggle('active', isActive);
      const chk = opt.querySelector?.('.voice-lang-check');
      if (chk) chk.classList.toggle('hidden', !isActive);
    });
  }

  const transcriptEl = document.getElementById('voice-transcript');
  const isRtl = isCurrentVoiceLangRtl();
  if (transcriptEl) {
    transcriptEl.dir = isRtl ? 'rtl' : 'ltr';
    transcriptEl.classList.toggle('rtl-text', isRtl);
    if (!transcriptEl.classList.contains('has-text')) {
      transcriptEl.textContent = getVoiceI18n('saySomething');
    }
  }

  const statusEl = document.getElementById('voice-status');
  if (statusEl) {
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    if (voiceOverlayOpen) {
      if (isVoiceConnecting) {
        statusEl.textContent = getVoiceI18n('connecting');
      } else if (isVoiceListening) {
        statusEl.textContent = getVoiceI18n('listening');
      } else if (isVoiceFinishing) {
        statusEl.textContent = getVoiceI18n('searching');
      } else if (!isVoiceErrorDisplayed) {
        statusEl.textContent = getVoiceI18n('tapToSpeak');
      }
    }
  }

  const errorText = document.getElementById('voice-error-text');
  if (errorText) {
    errorText.dir = isRtl ? 'rtl' : 'ltr';
    errorText.classList.toggle('rtl-text', isRtl);
  }

  const retryBtn = document.getElementById('voice-retry-btn');
  if (retryBtn) retryBtn.textContent = getVoiceI18n('tryAgain');

  const typeBtn = document.getElementById('voice-type-btn');
  if (typeBtn) typeBtn.textContent = getVoiceI18n('typeSearch');

  const grantBtn = document.getElementById('voice-grant-btn');
  if (grantBtn) grantBtn.textContent = getVoiceI18n('grantMicBtn');
}

function renderVoiceLangDropdown(filterQuery = '') {
  const listEl = document.getElementById('voice-lang-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  const currentLang = (typeof state !== 'undefined' && state?.voiceLang) ? state.voiceLang : 'auto';
  const q = (filterQuery || '').toLowerCase().trim();

  const filtered = VOICE_LANGUAGES.filter(l => {
    if (!q) return true;
    return l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      (l.short && l.short.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'voice-lang-empty';
    noResults.textContent = 'No languages found';
    listEl.appendChild(noResults);
    return;
  }

  filtered.forEach(l => {
    const opt = document.createElement('div');
    opt.className = 'voice-lang-opt' + (l.code === currentLang ? ' active' : '');
    opt.dataset.code = l.code;
    opt.setAttribute('role', 'option');
    opt.setAttribute('aria-selected', l.code === currentLang ? 'true' : 'false');
    opt.setAttribute('tabindex', '0');
    opt.title = l.code === 'auto' ? l.name : `${l.name} (${l.nativeName})`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'voice-lang-name';
    if (l.code === 'auto') {
      nameSpan.textContent = l.name;
    } else {
      const enSpan = document.createElement('span');
      enSpan.className = 'voice-lang-en';
      enSpan.textContent = l.name;

      const natSpan = document.createElement('bdi');
      natSpan.className = 'voice-lang-native';
      natSpan.textContent = l.nativeName;

      nameSpan.appendChild(enSpan);
      const sep = document.createElement('span');
      sep.className = 'voice-lang-sep';
      sep.textContent = ' — ';
      nameSpan.appendChild(sep);
      nameSpan.appendChild(natSpan);
    }

    const checkSpan = document.createElement('span');
    checkSpan.className = 'voice-lang-check' + (l.code === currentLang ? '' : ' hidden');
    checkSpan.textContent = '✓';

    opt.appendChild(nameSpan);
    opt.appendChild(checkSpan);

    const selectOpt = (e) => {
      if (e) e.stopPropagation();
      setVoiceLanguage(l.code);
      closeVoiceLangDropdown();
      document.getElementById('voice-lang-btn')?.focus();
    };

    opt.addEventListener('click', selectOpt);
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOpt(e);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = opt.nextElementSibling;
        if (next && next.classList.contains('voice-lang-opt')) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = opt.previousElementSibling;
        if (prev && prev.classList.contains('voice-lang-opt')) {
          prev.focus();
        } else {
          document.getElementById('voice-lang-search-input')?.focus();
        }
      }
    });

    listEl.appendChild(opt);
  });
}

function setVoiceLanguage(langCode) {
  if (typeof state !== 'undefined') {
    state.voiceLang = langCode;
    if (typeof saveState === 'function') saveState();
  }
  updateVoiceLangUI();

  // If voice search is open and not Brave, restart recognition with new language
  if (voiceOverlayOpen && !isBraveSync()) {
    const errorBox = document.getElementById('voice-error-box');
    const isPermPrompt = errorBox && errorBox.classList.contains('perm-prompt');
    const isDenied = currentMicPerm?.state === 'denied';
    if (!isPermPrompt && !isDenied) {
      if (voiceRecognition) {
        voiceRecognition.onstart = null;
        voiceRecognition.onresult = null;
        voiceRecognition.onerror = null;
        voiceRecognition.onend = null;
        voiceRecognition.onspeechstart = null;
        voiceRecognition.onspeechend = null;
        try { voiceRecognition.abort(); } catch (e) {}
        voiceRecognition = null;
      }
      isVoiceConnecting = false;
      isVoiceListening = false;
      clearVoiceTimers();
      startVoiceListening();
    }
  }
}

function toggleVoiceLangDropdown() {
  const dropdown = document.getElementById('voice-lang-dropdown');
  const picker = document.getElementById('voice-lang-picker');
  const btn = document.getElementById('voice-lang-btn');
  if (!dropdown) return;
  const isHidden = dropdown.classList.contains('hidden');
  if (isHidden) {
    dropdown.classList.remove('hidden');
    picker?.classList.add('open');
    btn?.setAttribute?.('aria-expanded', 'true');
    const searchInput = document.getElementById('voice-lang-search-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderVoiceLangDropdown('');
  } else {
    closeVoiceLangDropdown();
  }
}

function closeVoiceLangDropdown() {
  const dropdown = document.getElementById('voice-lang-dropdown');
  const picker = document.getElementById('voice-lang-picker');
  const btn = document.getElementById('voice-lang-btn');
  if (dropdown) dropdown.classList.add('hidden');
  if (picker) picker.classList.remove('open');
  if (btn) btn?.setAttribute?.('aria-expanded', 'false');
}

function isBraveSync() {
  return Boolean(
    (window.navigator?.brave && typeof window.navigator.brave.isBrave === 'function') ||
    (window.navigator?.userAgentData?.brands?.some(b => b.brand === 'Brave'))
  );
}

async function isBraveBrowser() {
  if (window.navigator?.brave && typeof window.navigator.brave.isBrave === 'function') {
    try { return await window.navigator.brave.isBrave(); } catch { return true; }
  }
  if (window.navigator?.userAgentData?.brands) {
    return window.navigator.userAgentData.brands.some(b => b.brand === 'Brave');
  }
  return false;
}

let voiceRecognition = null;
let voiceOverlayOpen = false;
let isVoiceConnecting = false;
let isVoiceListening = false;
let isVoiceFinishing = false;
let finalVoiceTranscript = '';
let lastRecognizedTranscript = '';
let isVoiceErrorDisplayed = false;
let voiceConnectTimer = null;
let voiceSilenceTimer = null;
let voiceNoSpeechTimer = null;
let voiceFinalSubmitTimer = null;

function clearVoiceTimers() {
  if (voiceConnectTimer) {
    clearTimeout(voiceConnectTimer);
    voiceConnectTimer = null;
  }
  if (voiceSilenceTimer) {
    clearTimeout(voiceSilenceTimer);
    voiceSilenceTimer = null;
  }
  if (voiceNoSpeechTimer) {
    clearTimeout(voiceNoSpeechTimer);
    voiceNoSpeechTimer = null;
  }
  if (voiceFinalSubmitTimer) {
    clearTimeout(voiceFinalSubmitTimer);
    voiceFinalSubmitTimer = null;
  }
}

let micPermWatcherActive = false;
let currentMicPerm = null;

function setupMicPermissionListeners(perm) {
  currentMicPerm = perm;
  if (perm) {
    perm.onchange = () => {
      if (!voiceOverlayOpen || isVoiceFinishing) return;
      if (perm.state === 'granted' && !isVoiceListening && !isVoiceConnecting) {
        startVoiceListening();
      } else if (perm.state === 'denied') {
        showVoiceError(getVoiceI18n('micDeniedChromeError'));
      } else if (perm.state === 'prompt' && !isVoiceListening && !isVoiceConnecting) {
        showVoicePermissionPrompt();
      }
    };
  }
  if (!micPermWatcherActive) {
    micPermWatcherActive = true;
    window.addEventListener('focus', async () => {
      if (voiceOverlayOpen && !isVoiceListening && !isVoiceConnecting && !isVoiceFinishing) {
        if (navigator.permissions && typeof navigator.permissions.query === 'function') {
          try {
            const p = await navigator.permissions.query({ name: 'microphone' });
            if (p.state === 'granted' && !isVoiceListening && !isVoiceConnecting) {
              startVoiceListening();
            } else if (p.state === 'denied') {
              showVoiceError(getVoiceI18n('micDeniedChromeError'));
            }
          } catch (e) {}
        }
      }
    });
  }
}

function openPermissionPage() {
  const permUrl = typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getURL === 'function'
    ? chrome.runtime.getURL('voice_permission.html')
    : 'voice_permission.html';
  try {
    if (typeof chrome !== 'undefined' && chrome.tabs && typeof chrome.tabs.create === 'function') {
      chrome.tabs.create({ url: permUrl });
      return;
    }
  } catch (e) {}
  window.open(permUrl, '_blank');
}

function showVoicePermissionPrompt() {
  isVoiceConnecting = false;
  isVoiceListening = false;
  isVoiceFinishing = false;
  clearVoiceTimers();

  const statusEl = document.getElementById('voice-status');
  const errorBox = document.getElementById('voice-error-box');
  const errorText = document.getElementById('voice-error-text');
  const transcriptEl = document.getElementById('voice-transcript');
  const pulseContainer = document.getElementById('voice-pulse-container');
  const micCircle = document.getElementById('voice-mic-circle');
  const retryBtn = document.getElementById('voice-retry-btn');
  const typeBtn = document.getElementById('voice-type-btn');
  let grantBtn = document.getElementById('voice-grant-btn');

  const isRtl = isCurrentVoiceLangRtl();
  if (statusEl) {
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    statusEl.textContent = getVoiceI18n('micPermissionNeeded');
  }
  if (transcriptEl) {
    transcriptEl.dir = isRtl ? 'rtl' : 'ltr';
    transcriptEl.classList.toggle('rtl-text', isRtl);
    transcriptEl.textContent = '';
    transcriptEl.classList.remove('has-text');
  }
  if (pulseContainer) pulseContainer.classList.remove('listening');
  if (micCircle) micCircle.classList.remove('error');

  if (errorBox && errorText) {
    errorText.dir = isRtl ? 'rtl' : 'ltr';
    errorText.classList.toggle('rtl-text', isRtl);
    errorBox.classList.add('perm-prompt');
    errorText.textContent = getVoiceI18n('micPermissionDesc');
    errorBox.classList.remove('hidden');

    if (retryBtn) retryBtn.classList.add('hidden');
    if (typeBtn) typeBtn.classList.add('hidden');

    if (!grantBtn) {
      grantBtn = document.createElement('button');
      grantBtn.id = 'voice-grant-btn';
      grantBtn.className = 'modal-btn primary voice-grant-btn';
      grantBtn.textContent = getVoiceI18n('grantMicBtn');
      errorBox.appendChild(grantBtn);
    } else {
      grantBtn.textContent = getVoiceI18n('grantMicBtn');
    }
    grantBtn.classList.remove('hidden');
    if (!grantBtn.dataset?.listenerBound) {
      if (grantBtn.dataset) grantBtn.dataset.listenerBound = 'true';
      grantBtn.addEventListener('click', openPermissionPage);
    }
  }
}

async function openVoiceSearch() {
  closeSuggestions();
  document.getElementById('engine-dropdown')?.classList.add('hidden');

  if (!voiceOverlayOpen) {
    preVoiceSearchQuery = document.getElementById('search-input')?.value || '';
  }
  voiceOverlayOpen = true;
  isVoiceConnecting = false;
  isVoiceListening = false;
  isVoiceFinishing = false;
  finalVoiceTranscript = '';
  lastRecognizedTranscript = '';
  isVoiceErrorDisplayed = false;
  clearVoiceTimers();
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const searchClearBtn = document.getElementById('search-clear-btn');
  if (searchClearBtn) searchClearBtn.classList.add('hidden');

  const overlay = document.getElementById('voice-overlay');
  const statusEl = document.getElementById('voice-status');
  const transcriptEl = document.getElementById('voice-transcript');
  const errorBox = document.getElementById('voice-error-box');
  const pulseContainer = document.getElementById('voice-pulse-container');
  const micCircle = document.getElementById('voice-mic-circle');

  overlay.classList.remove('hidden');
  errorBox.classList.add('hidden');
  micCircle.classList.remove('error');
  pulseContainer.classList.remove('listening');
  updateVoiceLangUI();

  if (await isBraveBrowser()) {
    showVoiceError(BRAVE_VOICE_NOTICE, true);
    return;
  }

  const isRtl = isCurrentVoiceLangRtl();
  if (transcriptEl) {
    transcriptEl.dir = isRtl ? 'rtl' : 'ltr';
    transcriptEl.classList.toggle('rtl-text', isRtl);
    transcriptEl.textContent = getVoiceI18n('saySomething');
    transcriptEl.classList.remove('has-text');
  }
  if (statusEl) {
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    statusEl.textContent = getVoiceI18n('connecting');
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showVoiceError('Voice search is not supported by your browser. Please try using Chrome or Edge.');
    return;
  }

  // Check microphone permissions
  if (navigator.permissions && typeof navigator.permissions.query === 'function') {
    try {
      const perm = await navigator.permissions.query({ name: 'microphone' });
      setupMicPermissionListeners(perm);

      if (perm.state === 'prompt') {
        showVoicePermissionPrompt();
        return;
      }
      if (perm.state === 'denied') {
        showVoiceError(getVoiceI18n('micDeniedChromeError'));
        return;
      }
      if (perm.state === 'granted') {
        startVoiceListening();
        return;
      }
    } catch (e) {
      // Fallback to starting directly if permissions query fails
    }
  }

  startVoiceListening();
}

function startVoiceListening() {
  if (isVoiceConnecting || isVoiceListening || isVoiceFinishing) {
    return;
  }

  if (isBraveSync()) {
    showVoiceError(BRAVE_VOICE_NOTICE, true);
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showVoiceError('Voice search is not supported by your browser. Please try using Chrome or Edge.');
    return;
  }

  clearVoiceTimers();
  isVoiceConnecting = true;
  isVoiceFinishing = false;
  isVoiceListening = false;

  if (voiceRecognition) {
    voiceRecognition.onstart = null;
    voiceRecognition.onresult = null;
    voiceRecognition.onerror = null;
    voiceRecognition.onend = null;
    voiceRecognition.onspeechstart = null;
    voiceRecognition.onspeechend = null;
    try { voiceRecognition.abort(); } catch (e) {}
    voiceRecognition = null;
  }

  const statusEl = document.getElementById('voice-status');
  const transcriptEl = document.getElementById('voice-transcript');
  const errorBox = document.getElementById('voice-error-box');
  const pulseContainer = document.getElementById('voice-pulse-container');
  const micCircle = document.getElementById('voice-mic-circle');
  const grantBtn = document.getElementById('voice-grant-btn');

  if (errorBox) {
    errorBox.classList.remove('perm-prompt');
    errorBox.classList.add('hidden');
  }
  if (grantBtn) grantBtn.classList.add('hidden');
  micCircle.classList.remove('error');
  const isRtl = isCurrentVoiceLangRtl();
  if (statusEl) {
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    statusEl.textContent = getVoiceI18n('connecting');
  }
  pulseContainer.classList.remove('listening');
  isVoiceErrorDisplayed = false;
  finalVoiceTranscript = '';
  lastRecognizedTranscript = '';
  if (transcriptEl) {
    transcriptEl.dir = isRtl ? 'rtl' : 'ltr';
    transcriptEl.classList.toggle('rtl-text', isRtl);
    transcriptEl.textContent = getVoiceI18n('saySomething');
    transcriptEl.classList.remove('has-text');
  }
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.dir = 'ltr';
  }
  const searchClearBtn = document.getElementById('search-clear-btn');
  if (searchClearBtn) searchClearBtn.classList.add('hidden');

  // 8s connection watchdog: trigger actionable timeout if onstart doesn't fire
  voiceConnectTimer = setTimeout(() => {
    isVoiceConnecting = false;
    if (!isVoiceListening && !isVoiceErrorDisplayed && voiceOverlayOpen) {
      try {
        if (voiceRecognition) {
          voiceRecognition.onstart = null;
          voiceRecognition.onresult = null;
          voiceRecognition.onerror = null;
          voiceRecognition.onend = null;
          voiceRecognition.onspeechstart = null;
          voiceRecognition.onspeechend = null;
          voiceRecognition.abort();
        }
      } catch (e) {}
      showVoiceError(getVoiceI18n('timeoutError'));
    }
  }, 8000);

  try {
    voiceRecognition = new SpeechRecognition();
    voiceRecognition.continuous = false;
    voiceRecognition.interimResults = true;
    voiceRecognition.lang = getEffectiveVoiceLang();
    voiceRecognition.maxAlternatives = 1;

    voiceRecognition.onstart = () => {
      isVoiceConnecting = false;
      if (voiceConnectTimer) {
        clearTimeout(voiceConnectTimer);
        voiceConnectTimer = null;
      }
      isVoiceListening = true;
      const isRtl = isCurrentVoiceLangRtl();
      if (statusEl) {
        statusEl.dir = isRtl ? 'rtl' : 'ltr';
        statusEl.classList.toggle('rtl-text', isRtl);
        statusEl.textContent = getVoiceI18n('listening');
      }
      pulseContainer.classList.add('listening');

      // 8s no-speech watchdog timer: gracefully stop if nothing is spoken
      if (voiceNoSpeechTimer) {
        clearTimeout(voiceNoSpeechTimer);
        voiceNoSpeechTimer = null;
      }
      voiceNoSpeechTimer = setTimeout(() => {
        if (isVoiceListening && !lastRecognizedTranscript.trim()) {
          isVoiceListening = false;
          pulseContainer.classList.remove('listening');
          const isRtlCurrent = isCurrentVoiceLangRtl();
          if (statusEl) {
            statusEl.dir = isRtlCurrent ? 'rtl' : 'ltr';
            statusEl.classList.toggle('rtl-text', isRtlCurrent);
            statusEl.textContent = getVoiceI18n('noSpeech');
          }
          try { voiceRecognition.stop(); } catch (e) {}
        }
      }, 8000);
    };

    voiceRecognition.onspeechstart = () => {
      const isRtl = isCurrentVoiceLangRtl();
      if (statusEl) {
        statusEl.dir = isRtl ? 'rtl' : 'ltr';
        statusEl.classList.toggle('rtl-text', isRtl);
        statusEl.textContent = getVoiceI18n('listening');
      }
      pulseContainer.classList.add('listening');
      if (voiceNoSpeechTimer) {
        clearTimeout(voiceNoSpeechTimer);
        voiceNoSpeechTimer = null;
      }
    };

    voiceRecognition.onresult = (event) => {
      if (voiceNoSpeechTimer) {
        clearTimeout(voiceNoSpeechTimer);
        voiceNoSpeechTimer = null;
      }
      if (voiceSilenceTimer) {
        clearTimeout(voiceSilenceTimer);
        voiceSilenceTimer = null;
      }
      if (voiceFinalSubmitTimer) {
        clearTimeout(voiceFinalSubmitTimer);
        voiceFinalSubmitTimer = null;
      }

      const finalParts = [];
      const interimParts = [];
      let hasFinal = false;

      for (let i = 0; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item && item[0]) {
          const text = (item[0].transcript || '').trim();
          if (text) {
            if (item.isFinal) {
              finalParts.push(text);
              hasFinal = true;
            } else {
              interimParts.push(text);
            }
          }
        }
      }

      const final = finalParts.join(' ').trim();
      const interim = interimParts.join(' ').trim();
      const combined = [final, interim].filter(Boolean).join(' ');
      const display = combined;

      if (display) {
        lastRecognizedTranscript = display;
        transcriptEl.textContent = display;
        transcriptEl.classList.add('has-text');
        const input = document.getElementById('search-input');
        if (input) {
          input.value = display;
          input.dir = isCurrentVoiceLangRtl() ? 'rtl' : 'ltr';
        }
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.classList.remove('hidden');
      }

      if (final) {
        finalVoiceTranscript = final;
      }

      // Auto-finish logic:
      // 1. If final chunk received with no lingering interim, execute search after 450ms pause
      // 2. If interim chunk received, execute search if user stops talking for 1.2s
      if (hasFinal && !interim && (finalVoiceTranscript || lastRecognizedTranscript).trim()) {
        voiceFinalSubmitTimer = setTimeout(() => {
          finishVoiceSearch();
        }, 450);
      } else if (display) {
        voiceSilenceTimer = setTimeout(() => {
          finishVoiceSearch();
        }, 1200);
      }
    };

    voiceRecognition.onspeechend = () => {
      const query = (finalVoiceTranscript || lastRecognizedTranscript).trim();
      if (query) {
        if (voiceSilenceTimer) {
          clearTimeout(voiceSilenceTimer);
          voiceSilenceTimer = null;
        }
        if (!voiceFinalSubmitTimer) {
          voiceFinalSubmitTimer = setTimeout(() => {
            finishVoiceSearch();
          }, 450);
        }
      }
    };

    voiceRecognition.onerror = async (event) => {
      console.warn('Speech recognition error:', event.error);
      isVoiceConnecting = false;
      clearVoiceTimers();
      isVoiceListening = false;
      pulseContainer.classList.remove('listening');

      if (event.error === 'aborted') {
        return;
      }

      if (event.error === 'no-speech') {
        const isRtl = isCurrentVoiceLangRtl();
        if (statusEl) {
          statusEl.dir = isRtl ? 'rtl' : 'ltr';
          statusEl.classList.toggle('rtl-text', isRtl);
          statusEl.textContent = getVoiceI18n('noSpeech');
        }
        return;
      }

      isVoiceErrorDisplayed = true;

      if (event.error === 'not-allowed') {
        showVoiceError(getVoiceI18n('micBlockedError'));
      } else if (event.error === 'network') {
        const isBrave = isBraveSync() || (await isBraveBrowser());
        if (isBrave) {
          showVoiceError(BRAVE_VOICE_NOTICE, true);
        } else {
          showVoiceError(getVoiceI18n('unreachableError'));
        }
      } else {
        showVoiceError(`Voice search error: ${event.error}.`);
      }
    };

    voiceRecognition.onend = () => {
      isVoiceConnecting = false;
      isVoiceListening = false;
      if (voiceConnectTimer) {
        clearTimeout(voiceConnectTimer);
        voiceConnectTimer = null;
      }
      clearVoiceTimers();
      pulseContainer.classList.remove('listening');

      const queryToSearch = (finalVoiceTranscript || lastRecognizedTranscript || '').trim();
      if (queryToSearch && !isVoiceErrorDisplayed && voiceOverlayOpen && !isVoiceFinishing) {
        finishVoiceSearch();
      } else if (!isVoiceErrorDisplayed && voiceOverlayOpen && !isVoiceFinishing) {
        const isRtl = isCurrentVoiceLangRtl();
        if (statusEl) {
          statusEl.dir = isRtl ? 'rtl' : 'ltr';
          statusEl.classList.toggle('rtl-text', isRtl);
          if (statusEl.textContent !== getVoiceI18n('noSpeech')) {
            statusEl.textContent = getVoiceI18n('tapToSpeak');
          }
        }
      }
    };

    voiceRecognition.start();
  } catch (err) {
    console.warn('Failed to start SpeechRecognition:', err);
    isVoiceConnecting = false;
    clearVoiceTimers();
    isVoiceListening = false;
    pulseContainer.classList.remove('listening');
    if (isBraveSync()) {
      showVoiceError(BRAVE_VOICE_NOTICE, true);
    } else {
      showVoiceError('Could not start microphone search. Please try again.');
    }
  }
}

function finishVoiceSearch() {
  if (isVoiceFinishing) return;
  const queryToSearch = (finalVoiceTranscript || lastRecognizedTranscript).trim();
  if (!queryToSearch) return;

  isVoiceFinishing = true;
  isVoiceConnecting = false;
  isVoiceListening = false;
  clearVoiceTimers();
  const pulseContainer = document.getElementById('voice-pulse-container');
  if (pulseContainer) pulseContainer.classList.remove('listening');
  const statusEl = document.getElementById('voice-status');
  if (statusEl) {
    const isRtl = isCurrentVoiceLangRtl();
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    statusEl.textContent = getVoiceI18n('searching');
  }

  if (voiceRecognition) {
    voiceRecognition.onstart = null;
    voiceRecognition.onresult = null;
    voiceRecognition.onerror = null;
    voiceRecognition.onend = null;
    voiceRecognition.onspeechstart = null;
    voiceRecognition.onspeechend = null;
    try { voiceRecognition.stop(); } catch (e) {}
    voiceRecognition = null;
  }

  setTimeout(() => {
    closeVoiceSearch(true);
    doSearch(queryToSearch);
  }, 350);
}

function showVoiceError(msg, isBrave = false) {
  isVoiceErrorDisplayed = true;
  isVoiceConnecting = false;
  isVoiceListening = false;
  isVoiceFinishing = false;
  clearVoiceTimers();
  const statusEl = document.getElementById('voice-status');
  const errorBox = document.getElementById('voice-error-box');
  const errorText = document.getElementById('voice-error-text');
  const pulseContainer = document.getElementById('voice-pulse-container');
  const micCircle = document.getElementById('voice-mic-circle');
  const retryBtn = document.getElementById('voice-retry-btn');
  let typeBtn = document.getElementById('voice-type-btn');
  const grantBtn = document.getElementById('voice-grant-btn');

  if (errorBox) errorBox.classList.remove('perm-prompt');
  if (grantBtn) grantBtn.classList.add('hidden');

  const isRtl = isCurrentVoiceLangRtl();
  if (statusEl) {
    statusEl.dir = isRtl ? 'rtl' : 'ltr';
    statusEl.classList.toggle('rtl-text', isRtl);
    statusEl.textContent = getVoiceI18n('voiceSearchTitle');
  }
  if (errorText) {
    errorText.dir = isRtl ? 'rtl' : 'ltr';
    errorText.classList.toggle('rtl-text', isRtl);
    errorText.textContent = msg;
  }
  errorBox.classList.remove('hidden');
  micCircle.classList.add('error');
  pulseContainer.classList.remove('listening');

  const showBraveActions = isBrave || (msg === BRAVE_VOICE_NOTICE) || isBraveSync();
  if (showBraveActions) {
    const transcriptEl = document.getElementById('voice-transcript');
    if (transcriptEl) {
      transcriptEl.textContent = '';
      transcriptEl.classList.remove('has-text');
    }
    if (retryBtn) retryBtn.classList.add('hidden');
    if (!typeBtn && errorBox) {
      typeBtn = document.createElement('button');
      typeBtn.id = 'voice-type-btn';
      typeBtn.className = 'modal-btn primary voice-type-btn';
      typeBtn.textContent = getVoiceI18n('typeSearch');
      errorBox.appendChild(typeBtn);
    }
    if (typeBtn) {
      typeBtn.textContent = getVoiceI18n('typeSearch');
      typeBtn.classList.remove('hidden');
      if (!typeBtn.dataset?.listenerBound) {
        if (typeBtn.dataset) typeBtn.dataset.listenerBound = 'true';
        typeBtn.addEventListener('click', () => {
          closeVoiceSearch();
          const searchInput = document.getElementById('search-input');
          if (searchInput) searchInput.focus();
        });
      }
    }
  } else {
    if (retryBtn) {
      retryBtn.textContent = getVoiceI18n('tryAgain');
      retryBtn.classList.remove('hidden');
    }
    if (typeBtn) typeBtn.classList.add('hidden');
  }
}

function closeVoiceSearch(isSearching = false) {
  voiceOverlayOpen = false;
  isVoiceConnecting = false;
  isVoiceListening = false;
  isVoiceFinishing = false;
  clearVoiceTimers();
  if (voiceRecognition) {
    voiceRecognition.onstart = null;
    voiceRecognition.onresult = null;
    voiceRecognition.onerror = null;
    voiceRecognition.onend = null;
    voiceRecognition.onspeechstart = null;
    voiceRecognition.onspeechend = null;
    try { voiceRecognition.abort(); } catch (e) {}
    voiceRecognition = null;
  }
  const overlay = document.getElementById('voice-overlay');
  if (overlay) overlay.classList.add('hidden');
  const errorBox = document.getElementById('voice-error-box');
  if (errorBox) {
    errorBox.classList.remove('perm-prompt');
    errorBox.classList.add('hidden');
  }
  const pulseContainer = document.getElementById('voice-pulse-container');
  if (pulseContainer) pulseContainer.classList.remove('listening');
  const retryBtn = document.getElementById('voice-retry-btn');
  const typeBtn = document.getElementById('voice-type-btn');
  const grantBtn = document.getElementById('voice-grant-btn');
  if (retryBtn) retryBtn.classList.remove('hidden');
  if (typeBtn) typeBtn.classList.add('hidden');
  if (grantBtn) grantBtn.classList.add('hidden');

  closeVoiceLangDropdown();

  if (!isSearching) {
    const input = document.getElementById('search-input');
    if (input && preVoiceSearchQuery !== undefined) {
      input.value = preVoiceSearchQuery;
      input.dir = 'ltr';
      const clearBtn = document.getElementById('search-clear-btn');
      if (clearBtn) clearBtn.classList.toggle('hidden', input.value.length === 0);
    }
  }
  finalVoiceTranscript = '';
  lastRecognizedTranscript = '';
  isVoiceErrorDisplayed = false;
  preVoiceSearchQuery = '';
}

// ── Shortcuts ────────────────────────────────────────────────

function renderShortcuts() {
  const container = document.getElementById('shortcuts-container');
  container.innerHTML = '';
  container.className = state.shortcutsView === 'grid' ? 'grid-view' : 'row-view';

  state.shortcuts.forEach(s => {
    const a = document.createElement('a');
    a.className = 'shortcut-item'; a.href = s.url; a.dataset.id = s.id;
    a.setAttribute('role','listitem');
    a.draggable = true;

    a.addEventListener('dragstart', e => {
      draggedShortcutId = s.id;
      isShortcutDragging = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', s.id);
      setTimeout(() => a.classList.add('dragging'), 0);
    });

    a.addEventListener('dragend', () => {
      a.classList.remove('dragging');
      document.querySelectorAll('.shortcut-item, .add-shortcut-item').forEach(el => {
        el.classList.remove('drag-over');
      });
      draggedShortcutId = null;
      setTimeout(() => { isShortcutDragging = false; }, 80);
    });

    a.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedShortcutId && draggedShortcutId !== s.id) {
        a.classList.add('drag-over');
      }
    });

    a.addEventListener('dragleave', () => {
      a.classList.remove('drag-over');
    });

    a.addEventListener('drop', e => {
      e.preventDefault();
      a.classList.remove('drag-over');
      if (draggedShortcutId && draggedShortcutId !== s.id) {
        const fromIdx = state.shortcuts.findIndex(x => x.id === draggedShortcutId);
        const toIdx = state.shortcuts.findIndex(x => x.id === s.id);
        if (fromIdx !== -1 && toIdx !== -1) {
          const [moved] = state.shortcuts.splice(fromIdx, 1);
          state.shortcuts.splice(toIdx, 0, moved);
          saveState();
          renderShortcuts();
        }
      }
    });

    a.addEventListener('click', e => {
      if (isShortcutDragging) {
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault(); window.location.href = s.url;
    });
    a.addEventListener('contextmenu', e => openContextMenu(e, s.id));

    const wrap = document.createElement('div'); wrap.className = 'shortcut-icon-wrap';
    const img  = document.createElement('img');
    img.alt = ''; img.width = 28; img.height = 28;
    img.addEventListener('error', () => {
      img.style.display = 'none';
      wrap.style.background = stringToColor(s.name);
      const sp = document.createElement('span');
      sp.style.cssText = 'font-size:18px;font-weight:700;color:#fff';
      sp.textContent   = s.name.charAt(0).toUpperCase();
      wrap.appendChild(sp);
    }, { once: true });

    applyCachedFavicon(img, favIcon(s.url));
    wrap.appendChild(img);

    const lbl = document.createElement('span');
    lbl.className   = 'shortcut-label';
    lbl.textContent = s.name;
    a.appendChild(wrap); a.appendChild(lbl);
    container.appendChild(a);
  });

  const addBtn  = document.createElement('div');
  addBtn.className = 'add-shortcut-item'; addBtn.setAttribute('role','listitem');
  addBtn.title = 'Add shortcut';
  addBtn.addEventListener('click', () => {
    if (!isShortcutDragging) openShortcutModal();
  });

  addBtn.addEventListener('dragover', e => {
    e.preventDefault();
    if (draggedShortcutId) {
      addBtn.classList.add('drag-over');
    }
  });
  addBtn.addEventListener('dragleave', () => addBtn.classList.remove('drag-over'));
  addBtn.addEventListener('drop', e => {
    e.preventDefault();
    addBtn.classList.remove('drag-over');
    if (draggedShortcutId) {
      const fromIdx = state.shortcuts.findIndex(x => x.id === draggedShortcutId);
      if (fromIdx !== -1) {
        const [moved] = state.shortcuts.splice(fromIdx, 1);
        state.shortcuts.push(moved);
        saveState();
        renderShortcuts();
      }
    }
  });

  const addWrap = document.createElement('div'); addWrap.className = 'add-icon-wrap';
  addWrap.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4v16m8-8H4"/></svg>';
  const addLbl  = document.createElement('span');
  addLbl.className = 'shortcut-label'; addLbl.textContent = 'Add shortcut';
  addBtn.appendChild(addWrap); addBtn.appendChild(addLbl);
  container.appendChild(addBtn);

  updateViewButtons();
  renderShortcutsInPanel();
}

function updateViewButtons() {
  document.getElementById('view-row-btn').classList.toggle('active', state.shortcutsView === 'row');
  document.getElementById('view-grid-btn').classList.toggle('active', state.shortcutsView === 'grid');
}

function renderShortcutsInPanel() {
  const list = document.getElementById('shortcuts-list'); if (!list) return;
  list.innerHTML = '';
  state.shortcuts.forEach(s => {
    const item = document.createElement('div'); item.className = 'sp-shortcut-item';
    const imgEl = document.createElement('img');
    imgEl.alt = '';
    applyCachedFavicon(imgEl, favIcon(s.url));

    const nameSpan = document.createElement('span');
    nameSpan.className = 'sp-shortcut-name';
    nameSpan.title = s.url;
    nameSpan.textContent = s.name;

    const editBtn = document.createElement('button');
    editBtn.className = 'sp-shortcut-edit';
    editBtn.title = 'Edit';
    editBtn.setAttribute('aria-label', 'Edit');
    editBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    editBtn.addEventListener('click', () => openShortcutModal(s.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'sp-shortcut-delete';
    delBtn.title = 'Remove';
    delBtn.setAttribute('aria-label', 'Remove');
    delBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>';
    delBtn.addEventListener('click', () => {
      state.shortcuts = state.shortcuts.filter(x => x.id !== s.id);
      saveState(); renderShortcuts();
    });

    item.appendChild(imgEl);
    item.appendChild(nameSpan);
    item.appendChild(editBtn);
    item.appendChild(delBtn);
    list.appendChild(item);
  });
}

// ── Shortcut Modal ─────────────────────────────────────────

function openShortcutModal(editId) {
  editingShortcutId = editId || null;
  const t = document.getElementById('shortcut-modal-title');
  const n = document.getElementById('shortcut-name-input');
  const u = document.getElementById('shortcut-url-input');
  if (editId) {
    const s = state.shortcuts.find(x => x.id === editId);
    t.textContent = 'Edit shortcut'; n.value = s ? s.name : ''; u.value = s ? s.url : '';
  } else { t.textContent = 'Add shortcut'; n.value = ''; u.value = ''; }
  document.getElementById('shortcut-modal').classList.remove('hidden');
  n.focus();
}

function closeShortcutModal() {
  document.getElementById('shortcut-modal').classList.add('hidden');
  editingShortcutId = null;
}

function saveShortcut() {
  const name = document.getElementById('shortcut-name-input').value.trim();
  let   url  = document.getElementById('shortcut-url-input').value.trim();
  if (!name || !url) return;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  if (editingShortcutId) {
    state.shortcuts = state.shortcuts.map(s =>
      s.id === editingShortcutId ? {...s, name, url} : s);
  } else {
    state.shortcuts.push({ id:uid(), name, url });
  }
  saveState(); renderShortcuts(); closeShortcutModal();
}

// ── Footer Onboarding Modal ──────────────────────────────────

function openFooterOnboardingModal() {
  const modal = document.getElementById('footer-onboarding-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeFooterOnboardingModal() {
  const modal = document.getElementById('footer-onboarding-modal');
  if (modal) modal.classList.add('hidden');
}

async function checkFooterOnboarding() {
  if (state.hasSeenFooterOnboarding) return;
  const isBrave = isBraveSync() || (await isBraveBrowser());
  if (isBrave) {
    state.hasSeenFooterOnboarding = true;
    saveState();
    return;
  }
  setTimeout(() => {
    openFooterOnboardingModal();
  }, 350);
}

// ── Context Menu ─────────────────────────────────────────────

function openContextMenu(e, shortcutId) {
  e.preventDefault();
  contextTargetId = shortcutId;
  const menu = document.getElementById('context-menu');
  menu.classList.remove('hidden');
  const x = Math.min(e.clientX, window.innerWidth  - menu.offsetWidth  - 8);
  const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight - 8);
  menu.style.left = x + 'px'; menu.style.top = y + 'px';
}
function closeContextMenu() {
  document.getElementById('context-menu').classList.add('hidden');
  contextTargetId = null;
}

// ── Apps Panel — dynamic account-aware rendering ──────────────

const APP_DISPLAY_NAMES = {
  'Business Profile': 'Business<br>Profile',
  'Merchant Center': 'Merchant<br>Center',
  'Password Manager': 'Password<br>Manager',
  'Chrome Web Store': 'Chrome Web<br>Store',
  'Google Analytics': 'Google<br>Analytics',
  'Gemini Notebook': 'Gemini<br>Notebook',
  'Arts & Culture': 'Arts &amp;<br>Culture',
  'My Ad Center': 'My Ad<br>Center',
  'YouTube Music': 'YouTube<br>Music',
};

function getSortedGoogleApps() {
  if (!state.appsOrder || !Array.isArray(state.appsOrder) || state.appsOrder.length === 0) {
    return [...GOOGLE_APPS];
  }
  const ordered = [];
  const appMap = new Map();
  GOOGLE_APPS.forEach(app => appMap.set(app.name, app));

  state.appsOrder.forEach(name => {
    if (appMap.has(name)) {
      ordered.push(appMap.get(name));
      appMap.delete(name);
    }
  });

  appMap.forEach(app => ordered.push(app));
  return ordered;
}

function renderAppsPanel() {
  const grid = document.getElementById('apps-grid'); if (!grid) return;
  grid.innerHTML = '';
  const active = getActiveAccount();
  const sortedApps = getSortedGoogleApps();

  sortedApps.forEach(app => {
    const a = document.createElement('a');
    a.className  = 'app-item';
    a.href       = appUrl(app);
    a.target     = '_blank';
    a.rel        = 'noopener noreferrer';
    a.title      = app.name;
    a.dataset.appName = app.name;
    a.draggable  = true;

    a.addEventListener('dragstart', e => {
      draggedAppName = app.name;
      isAppDragging = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', app.name);
      setTimeout(() => a.classList.add('dragging'), 0);
    });

    a.addEventListener('dragend', () => {
      a.classList.remove('dragging');
      document.querySelectorAll('.app-item').forEach(el => el.classList.remove('drag-over'));
      draggedAppName = null;
      setTimeout(() => { isAppDragging = false; }, 80);
    });

    a.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedAppName && draggedAppName !== app.name) {
        a.classList.add('drag-over');
      }
    });

    a.addEventListener('dragleave', () => {
      a.classList.remove('drag-over');
    });

    a.addEventListener('drop', e => {
      e.preventDefault();
      a.classList.remove('drag-over');
      if (draggedAppName && draggedAppName !== app.name) {
        const currentList = getSortedGoogleApps().map(x => x.name);
        const fromIdx = currentList.indexOf(draggedAppName);
        const toIdx = currentList.indexOf(app.name);
        if (fromIdx !== -1 && toIdx !== -1) {
          const [moved] = currentList.splice(fromIdx, 1);
          currentList.splice(toIdx, 0, moved);
          state.appsOrder = currentList;
          saveState();
          renderAppsPanel();
        }
      }
    });

    a.addEventListener('click', e => {
      if (isAppDragging) {
        e.preventDefault();
      }
    });

    const img = document.createElement('img');
    img.alt    = app.name;
    img.width  = 36; img.height = 36;

    if (app.isAccountApp) {
      if (active && active.avatarUrl) {
        resolveAccountAvatar(active, avatarSrc => {
          if (avatarSrc) {
            img.src = avatarSrc;
            img.style.borderRadius = '50%';
            img.onerror = () => {
              img.style.borderRadius = '8px';
              img.src = app.icon;
            };
          } else {
            img.style.borderRadius = '8px';
            applyCachedFavicon(img, app.icon, app.fallback);
          }
        });
      } else {
        img.style.borderRadius = '8px';
        applyCachedFavicon(img, app.icon, app.fallback);
      }
    } else {
      img.style.borderRadius = '8px';
      applyCachedFavicon(img, app.icon, app.fallback);
    }

    const sp  = document.createElement('span');
    if (APP_DISPLAY_NAMES[app.name]) {
      sp.innerHTML = APP_DISPLAY_NAMES[app.name];
    } else {
      sp.textContent = app.name;
    }

    a.appendChild(img); a.appendChild(sp);
    grid.appendChild(a);
  });
}

function refreshAppUrls() {
  const active = getActiveAccount();
  document.querySelectorAll('.app-item').forEach(a => {
    const app = GOOGLE_APPS.find(x => x.name === a.dataset.appName);
    if (app) {
      a.href = appUrl(app);
      if (app.isAccountApp) {
        const img = a.querySelector('img');
        if (img) {
          if (active && active.avatarUrl) {
            resolveAccountAvatar(active, avatarSrc => {
              if (avatarSrc) {
                img.src = avatarSrc;
                img.style.borderRadius = '50%';
                img.onerror = () => {
                  img.style.borderRadius = '8px';
                  img.src = app.icon;
                };
              } else {
                img.style.borderRadius = '8px';
                applyCachedFavicon(img, app.icon, app.fallback);
              }
            });
          } else {
            img.style.borderRadius = '8px';
            applyCachedFavicon(img, app.icon, app.fallback);
          }
        }
      }
    }
  });
}

// ── Account Panel ─────────────────────────────────────────────

function renderAccountPanel() {
  const panel  = document.getElementById('account-panel');
  const active = getActiveAccount();
  const others = state.accounts.filter(a => a.id !== state.activeAccountId);

  panel.innerHTML = buildAccountPanelHTML(active, others);
  bindAccountPanelEvents(panel);
}

function buildAccountPanelHTML(active, others) {
  let html = '';

  if (active) {
    const avatarSrc = active.avatarUrl || null;
    const avatarInner = avatarSrc
      ? `<img src="${avatarSrc}" alt="${escHtml(active.name)}" />`
      : (active.initial || active.name.charAt(0)).toUpperCase();

    html += `
    <div class="acc-panel-header">
      <div class="acc-panel-avatar" id="acc-header-avatar" style="background:${avatarSrc ? 'transparent' : active.color}">
        ${avatarInner}
      </div>
      <div class="acc-panel-info">
        <div class="acc-panel-name">${escHtml(active.name)}</div>
        <div class="acc-panel-email">${escHtml(active.email)}</div>
      </div>
      <button class="acc-panel-close" id="apx-close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>`;
  } else {
    html += `
    <div class="acc-panel-header" style="gap:8px">
      <div class="acc-panel-avatar" style="background:#5f6368;font-size:22px">G</div>
      <div class="acc-panel-info">
        <div class="acc-panel-name">No account connected</div>
        <div class="acc-panel-email">Add one below or sign in to Google</div>
      </div>
      <button class="acc-panel-close" id="apx-close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>`;
  }

  if (others.length > 0) {
    html += '<div class="acc-other-list">';
    others.forEach(acc => {
      const otherAvatarSrc = acc.avatarUrl || null;
      const otherInner = otherAvatarSrc
        ? `<img src="${otherAvatarSrc}" alt="${escHtml(acc.name)}" />`
        : (acc.initial || acc.name.charAt(0)).toUpperCase();

      html += `
      <div class="acc-other-item" data-accid="${acc.id}">
        <div class="acc-mini-avatar" style="background:${otherAvatarSrc ? 'transparent' : acc.color}">
          ${otherInner}
        </div>
        <div class="acc-other-info">
          <div class="acc-other-name">${escHtml(acc.name)}</div>
          <div class="acc-other-email">${escHtml(acc.email)}</div>
        </div>
      </div>`;
    });
    html += '</div>';
  }

  html += `
  <div class="acc-panel-actions">
    <button class="acc-action-btn btn-google" id="apx-add-page">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
      Add Google Account
    </button>
    <button class="acc-action-btn" id="apx-sync">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
      Sync Google Accounts
    </button>
    <button class="acc-action-btn" id="apx-signout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Sign out (Google)
    </button>
    <button class="acc-action-btn" id="apx-manage">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285F4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
      Manage Google Account
    </button>
  </div>
  <div class="acc-panel-footer">
    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>
    &nbsp;·&nbsp;
    <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a>
  </div>`;

  return html;
}

function bindAccountPanelEvents(panel) {
  panel.querySelector('#apx-close')?.addEventListener('click', closeAllPanels);

  panel.querySelectorAll('.acc-other-item').forEach(item => {
    item.addEventListener('click', () => {
      state.activeAccountId = item.dataset.accid;
      saveState();
      updateAccountUI();
      renderAppsPanel();
      closeAllPanels();
    });
  });

  panel.querySelector('#apx-sync')?.addEventListener('click', async () => {
    const btn = panel.querySelector('#apx-sync');
    if (btn) btn.textContent = 'Syncing...';
    await syncGoogleAccounts(true);
    renderAccountPanel();
  });

  panel.querySelector('#apx-add-page')?.addEventListener('click', () => {
    closeAllPanels();
    openAccountModal();
  });

  panel.querySelector('#apx-signout')?.addEventListener('click', () => {
    const i = getAccountIndex();
    window.open(`https://accounts.google.com/Logout?hl=en&continue=https://mail.google.com/mail/u/${i}/`, '_blank');
  });

  panel.querySelector('#apx-manage')?.addEventListener('click', () => {
    const i = getAccountIndex();
    window.open(`https://myaccount.google.com/u/${i}/`, '_blank');
  });
}

function updateAccountUI() {
  const active = getActiveAccount();
  const avatarEl    = document.getElementById('avatar-inner');
  const gmailLink   = document.getElementById('gmail-link');
  const accountBtn  = document.getElementById('account-btn');

  if (active) {
    gmailLink.href = `https://mail.google.com/mail/u/${active.gmailIndex || 0}/`;

    if (active.avatarUrl) {
      resolveAccountAvatar(active, avatarSrc => {
        if (avatarSrc) {
          const testImg = new Image();
          testImg.onload = () => {
            avatarEl.innerHTML = `<img src="${avatarSrc}" alt="${escHtml(active.name)}" />`;
            accountBtn.style.background = 'transparent';
          };
          testImg.onerror = () => {
            avatarEl.innerHTML = (active.initial || active.name.charAt(0)).toUpperCase();
            accountBtn.style.background = active.color;
          };
          testImg.src = avatarSrc;
        } else {
          avatarEl.innerHTML = (active.initial || active.name.charAt(0)).toUpperCase();
          accountBtn.style.background = active.color;
        }
      });
    } else {
      avatarEl.innerHTML = (active.initial || active.name.charAt(0)).toUpperCase();
      accountBtn.style.background = active.color;
    }
  } else {
    avatarEl.innerHTML          = 'G';
    accountBtn.style.background = '#4285F4';
    gmailLink.href              = 'https://mail.google.com/mail/u/0/';
  }

  refreshAppUrls();
}

// ── Account Modal ─────────────────────────────────────────────

function openAccountModal(editId) {
  editingAccountId = editId || null;
  const modal = document.getElementById('account-modal');
  const t   = document.getElementById('account-modal-title');
  const n   = document.getElementById('acc-name-input');
  const em  = document.getElementById('acc-email-input');
  const idx = document.getElementById('acc-index-input');
  const av  = document.getElementById('acc-avatar-input');
  const googleSection = document.getElementById('acc-google-section');
  const divider = document.getElementById('acc-modal-divider');
  const saveBtn = document.getElementById('account-save-btn');
  const statusEl = document.getElementById('acc-google-status');
  const googleBtnText = document.getElementById('acc-google-btn-text');

  if (statusEl) {
    statusEl.className = 'acc-status-msg hidden';
    statusEl.innerHTML = '';
  }
  if (googleBtnText) {
    googleBtnText.textContent = 'Sign in with Google';
  }

  if (editId) {
    const acc = state.accounts.find(a => a.id === editId);
    if (acc) {
      t.textContent = 'Edit account';
      if (googleSection) googleSection.classList.add('hidden');
      if (divider) divider.classList.add('hidden');
      if (saveBtn) saveBtn.textContent = 'Save';
      n.value = acc.name; em.value = acc.email; idx.value = acc.gmailIndex || 0;
      if (av) av.value = acc.avatarUrl || '';
      selectedAccColor = acc.color;
    }
  } else {
    t.textContent = 'Add Google Account';
    if (googleSection) googleSection.classList.remove('hidden');
    if (divider) divider.classList.remove('hidden');
    if (saveBtn) saveBtn.textContent = 'Add Manually';
    n.value = ''; em.value = ''; idx.value = state.accounts.length;
    if (av) av.value = '';
    selectedAccColor = ['#4285F4','#EA4335','#34A853','#FBBC04','#00BCD4','#9C27B0','#FF5722'][state.accounts.length % 7];
  }

  document.querySelectorAll('.acc-color-opt').forEach(o =>
    o.classList.toggle('selected', o.dataset.color === selectedAccColor));

  modal.classList.remove('hidden');
  if (editId) {
    n.focus();
  }
}

function closeAccountModal() {
  document.getElementById('account-modal').classList.add('hidden');
  editingAccountId = null;
}

function saveAccount() {
  const name  = document.getElementById('acc-name-input').value.trim();
  const email = document.getElementById('acc-email-input').value.trim();
  const gmailIndex = parseInt(document.getElementById('acc-index-input').value, 10);
  const avatarUrl = (document.getElementById('acc-avatar-input')?.value || '').trim();

  if (!name || !email) {
    const box = document.getElementById('account-modal-box');
    box.style.animation = 'none';
    box.offsetHeight;
    box.style.animation = 'shake 0.35s ease';
    return;
  }

  const accData = {
    name, email, avatarUrl,
    gmailIndex: isNaN(gmailIndex) ? 0 : gmailIndex,
    color: selectedAccColor,
    initial: name.charAt(0).toUpperCase(),
  };

  if (editingAccountId) {
    state.accounts = state.accounts.map(a =>
      a.id === editingAccountId ? { ...a, ...accData } : a);
  } else {
    const newAcc = { id: uid(), ...accData };
    state.accounts.push(newAcc);
    if (state.accounts.length === 1) state.activeAccountId = newAcc.id;
  }

  saveState();
  updateAccountUI();
  renderAppsPanel();
  renderAccountsInPanel();
  closeAccountModal();
}

// ── Accounts in Customize Panel ──────────────────────────────

function renderAccountsInPanel() {
  const list = document.getElementById('accounts-list'); if (!list) return;
  list.innerHTML = '';
  if (state.accounts.length === 0) {
    list.innerHTML = '<p class="sp-hint" style="text-align:center;padding:12px 0">No accounts connected yet.</p>';
    return;
  }
  state.accounts.forEach(acc => {
    const item = document.createElement('div');
    item.className = 'acc-list-item' + (acc.id === state.activeAccountId ? ' active' : '');

    const otherAvatarSrc = acc.avatarUrl || null;
    const avatarContent = otherAvatarSrc
      ? `<img src="${otherAvatarSrc}" alt="${escHtml(acc.name)}" />`
      : (acc.initial || acc.name.charAt(0)).toUpperCase();

    item.innerHTML = `
      <div class="acc-list-mini-avatar" style="background:${otherAvatarSrc ? 'transparent' : acc.color}">
        ${avatarContent}
      </div>
      <div class="acc-list-info">
        <div class="acc-list-name">${escHtml(acc.name)}</div>
        <div class="acc-list-email">${escHtml(acc.email)}  &nbsp;/u/${acc.gmailIndex || 0}/</div>
      </div>
      ${acc.id === state.activeAccountId ? '<span class="acc-active-badge">Active</span>' : ''}
      <button class="sp-shortcut-edit acc-edit-btn" title="Edit" aria-label="Edit account">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="sp-shortcut-delete acc-del-btn" title="Remove" aria-label="Remove account">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
      </button>`;

    item.addEventListener('click', e => {
      if (e.target.closest('.acc-edit-btn') || e.target.closest('.acc-del-btn')) return;
      state.activeAccountId = acc.id;
      saveState(); updateAccountUI(); renderAppsPanel(); renderAccountsInPanel();
    });
    item.querySelector('.acc-edit-btn').addEventListener('click', e => {
      e.stopPropagation(); openAccountModal(acc.id);
    });
    item.querySelector('.acc-del-btn').addEventListener('click', e => {
      e.stopPropagation();
      state.accounts = state.accounts.filter(a => a.id !== acc.id);
      if (state.activeAccountId === acc.id)
        state.activeAccountId = state.accounts[0]?.id || null;
      saveState(); updateAccountUI(); renderAppsPanel(); renderAccountsInPanel();
    });
    list.appendChild(item);
  });
}

// ── Curated Picker ────────────────────────────────────────────

function renderCuratedPicker() {
  const grid = document.getElementById('curated-grid'); if (!grid) return;
  grid.innerHTML = '';
  CURATED_BACKGROUNDS.forEach((bg, i) => {
    const div = document.createElement('div');
    div.className = 'bg-thumb' + (state.background.type === 'curated' && state.background.index === i ? ' active' : '');
    div.title = bg.name;
    div.innerHTML = `
      <img src="${bg.thumb}" alt="${escHtml(bg.name)}" loading="lazy" />
      <div class="bg-thumb-label">${escHtml(bg.name)}</div>
    `;
    div.addEventListener('click', () => {
      state.background = { type:'curated', index:i };
      saveState(); applyBackground();
      grid.querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
      div.classList.add('active');
      document.querySelectorAll('.color-swatch[data-color]').forEach(s => s.classList.remove('active'));
      document.getElementById('uploaded-preview').classList.add('hidden');
    });
    grid.appendChild(div);
  });
}

// ── Upload Background ─────────────────────────────────────────

function setupUpload() {
  const uploadBtn = document.getElementById('bg-upload-btn');
  const fileInput = document.getElementById('bg-upload');
  const preview   = document.getElementById('uploaded-preview');
  if (!uploadBtn) return;

  function showPreview(dataUrl) {
    preview.innerHTML = `<img src="${dataUrl}" alt="Custom Background" />`;
    const btn = document.createElement('button');
    btn.className = 'remove-upload-btn'; btn.title = 'Remove'; btn.innerHTML = '&times;';
    btn.addEventListener('click', e => {
      e.stopPropagation();
      state.customUploadedBg = null; state.background = { type:'curated', index:0 };
      saveState(); applyBackground();
      preview.classList.add('hidden'); preview.innerHTML = '';
      renderCuratedPicker();
    });
    preview.appendChild(btn);
    preview.classList.remove('hidden');
  }

  uploadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target.result;
      state.customUploadedBg = dataUrl; state.background = { type:'upload' };
      saveState(); applyBackground();
      showPreview(dataUrl);
      document.getElementById('curated-grid').querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.color-swatch[data-color]').forEach(s => s.classList.remove('active'));
    };
    reader.readAsDataURL(file);
  });

  if (state.customUploadedBg && state.background.type === 'upload') {
    showPreview(state.customUploadedBg);
  }
}

// ── Color Swatches ────────────────────────────────────────────

function setupColorSwatches() {
  function selectColor(val) {
    state.background = { type:'color', value:val }; saveState(); applyBackground();
    document.querySelectorAll('.color-swatch[data-color]').forEach(s => s.classList.remove('active'));
    document.getElementById('curated-grid').querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
    document.getElementById('uploaded-preview').classList.add('hidden');
  }
  document.querySelectorAll('.color-swatch[data-color]').forEach(s => {
    if (state.background.type === 'color' && state.background.value === s.dataset.color)
      s.classList.add('active');
    s.addEventListener('click', () => selectColor(s.dataset.color));
  });
  const customBtn  = document.getElementById('custom-color-btn');
  const colorInput = document.getElementById('custom-color-picker');
  if (customBtn && colorInput) {
    customBtn.addEventListener('click', () => colorInput.click());
    colorInput.addEventListener('input', () => selectColor(colorInput.value));
  }
}

// ── Panel Utilities ───────────────────────────────────────────

function openPanel(id) {
  closeSuggestions();
  document.getElementById('engine-dropdown')?.classList.add('hidden');
  closeAllPanels(id);
  document.getElementById(id).classList.remove('hidden');
  document.getElementById('backdrop').classList.remove('hidden');
}

function closeAllPanels(except) {
  ['account-panel','apps-panel'].forEach(pid => {
    if (pid !== except) document.getElementById(pid).classList.add('hidden');
  });
  if (except !== 'customize-panel') {
    const cp = document.getElementById('customize-panel');
    if (cp && cp.classList.contains('open')) {
      closeCustomizePanel();
    }
  }
  if (!except) {
    document.getElementById('backdrop').classList.add('hidden');
    closeContextMenu();
    closeSuggestions();
  }
}

function openCustomizePanel() {
  closeSuggestions();
  document.getElementById('engine-dropdown')?.classList.add('hidden');
  closeAllPanels('customize-panel');
  const panel = document.getElementById('customize-panel');
  panel.classList.remove('hidden');
  document.getElementById('backdrop').classList.remove('hidden');
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      panel.classList.add('open')
    )
  );
}

function closeCustomizePanel() {
  const panel = document.getElementById('customize-panel');
  panel.classList.remove('open');
  setTimeout(() => {
    panel.classList.add('hidden');
    const accOpen = !document.getElementById('account-panel').classList.contains('hidden');
    const appsOpen = !document.getElementById('apps-panel').classList.contains('hidden');
    if (!accOpen && !appsOpen) {
      document.getElementById('backdrop').classList.add('hidden');
    }
  }, 350);
}

// ── Customize Panel Tabs ──────────────────────────────────────

function setupCustomizePanelTabs() {
  document.querySelectorAll('.sp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sp-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sp-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById('tab-' + tab.dataset.tab);
      if (content) content.classList.add('active');
      if (tab.dataset.tab === 'backgrounds') renderCuratedPicker();
      if (tab.dataset.tab === 'shortcuts')   renderShortcutsInPanel();
      if (tab.dataset.tab === 'accounts')    renderAccountsInPanel();
      if (tab.dataset.tab === 'search')      updateEngineUI();
    });
  });
}

// ── Event Listeners ───────────────────────────────────────────

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');

  // Input typing and debounced suggestions
  if (searchClearBtn) {
    searchClearBtn.classList.toggle('hidden', searchInput.value.length === 0);
  }

  searchInput.addEventListener('input', e => {
    const val = e.target.value;
    document.getElementById('engine-dropdown')?.classList.add('hidden');
    if (searchClearBtn) {
      searchClearBtn.classList.toggle('hidden', val.length === 0);
    }
    originalTypedQuery = val;

    if (suggestDebounceTimer) {
      clearTimeout(suggestDebounceTimer);
    }

    if (!val.trim()) {
      if (suggestAbortController) {
        suggestAbortController.abort();
        suggestAbortController = null;
      }
      closeSuggestions();
      return;
    }

    suggestDebounceTimer = setTimeout(() => {
      fetchAndRenderSuggestions(val.trim());
    }, 150);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() && currentSuggestions.length === 0) {
      fetchAndRenderSuggestions(searchInput.value.trim());
    }
  });

  // Search keyboard navigation
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      if (currentSuggestions.length > 0) {
        e.preventDefault();
        if (activeSuggestionIndex < currentSuggestions.length - 1) {
          activeSuggestionIndex++;
        } else {
          activeSuggestionIndex = -1;
        }
        updateActiveSuggestionUI();
      }
    } else if (e.key === 'ArrowUp') {
      if (currentSuggestions.length > 0) {
        e.preventDefault();
        if (activeSuggestionIndex > -1) {
          activeSuggestionIndex--;
        } else {
          activeSuggestionIndex = currentSuggestions.length - 1;
        }
        updateActiveSuggestionUI();
      }
    } else if (e.key === 'Tab') {
      if (currentSuggestions.length > 0 && activeSuggestionIndex >= 0 && currentSuggestions[activeSuggestionIndex]) {
        e.preventDefault();
        searchInput.value = currentSuggestions[activeSuggestionIndex].displayText;
        originalTypedQuery = searchInput.value;
        fetchAndRenderSuggestions(searchInput.value);
      }
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && currentSuggestions[activeSuggestionIndex]) {
        e.preventDefault();
        const sel = currentSuggestions[activeSuggestionIndex];
        closeSuggestions();
        if (sel.type === 'shortcut' || sel.type === 'url') {
          window.location.href = sel.url || sel.displayText;
        } else {
          doSearch(sel.displayText);
        }
      } else {
        closeSuggestions();
        doSearch(e.target.value);
      }
    } else if (e.key === 'Escape') {
      const suggContainer = document.getElementById('search-suggestions');
      if (suggContainer && !suggContainer.classList.contains('hidden')) {
        e.preventDefault();
        e.stopPropagation();
        searchInput.value = originalTypedQuery;
        closeSuggestions();
      }
    }
  });

  // Clear button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      originalTypedQuery = '';
      searchClearBtn.classList.add('hidden');
      closeSuggestions();
      searchInput.focus();
    });
  }

  // Voice Search triggers
  document.getElementById('voice-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    openVoiceSearch();
  });
  document.getElementById('voice-close-btn')?.addEventListener('click', () => {
    closeVoiceSearch();
  });
  document.getElementById('voice-overlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('voice-overlay')) {
      closeVoiceSearch();
    }
  });
  document.getElementById('voice-retry-btn')?.addEventListener('click', () => {
    openVoiceSearch();
  });
  const voiceTypeBtn = document.getElementById('voice-type-btn');
  if (voiceTypeBtn && !voiceTypeBtn.dataset?.listenerBound) {
    if (voiceTypeBtn.dataset) voiceTypeBtn.dataset.listenerBound = 'true';
    voiceTypeBtn.addEventListener('click', () => {
      closeVoiceSearch();
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    });
  }
  const voiceGrantBtn = document.getElementById('voice-grant-btn');
  if (voiceGrantBtn && !voiceGrantBtn.dataset?.listenerBound) {
    if (voiceGrantBtn.dataset) voiceGrantBtn.dataset.listenerBound = 'true';
    voiceGrantBtn.addEventListener('click', openPermissionPage);
  }
  document.getElementById('voice-mic-circle')?.addEventListener('click', () => {
    const query = (finalVoiceTranscript || lastRecognizedTranscript).trim();
    if (query) {
      finishVoiceSearch();
      return;
    }
    if (isVoiceListening) {
      clearVoiceTimers();
      isVoiceListening = false;
      if (voiceRecognition) {
        voiceRecognition.onstart = null;
        voiceRecognition.onresult = null;
        voiceRecognition.onerror = null;
        voiceRecognition.onend = null;
        voiceRecognition.onspeechstart = null;
        voiceRecognition.onspeechend = null;
        try { voiceRecognition.abort(); } catch (e) {}
        voiceRecognition = null;
      }
      const pulseContainer = document.getElementById('voice-pulse-container');
      if (pulseContainer) pulseContainer.classList.remove('listening');
      const statusEl = document.getElementById('voice-status');
      if (statusEl) {
        const isRtl = isCurrentVoiceLangRtl();
        statusEl.dir = isRtl ? 'rtl' : 'ltr';
        statusEl.classList.toggle('rtl-text', isRtl);
        statusEl.textContent = getVoiceI18n('tapToSpeak');
      }
    } else {
      openVoiceSearch();
    }
  });

  // Voice Language selector in Voice Search modal
  document.getElementById('voice-lang-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    toggleVoiceLangDropdown();
  });
  document.getElementById('voice-lang-dropdown')?.addEventListener('click', e => {
    e.stopPropagation();
  });
  const langSearchInput = document.getElementById('voice-lang-search-input');
  if (langSearchInput) {
    langSearchInput.addEventListener('input', e => {
      renderVoiceLangDropdown(e.target.value);
    });
    langSearchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        const firstOpt = document.querySelector('#voice-lang-list .voice-lang-opt');
        if (firstOpt && firstOpt.dataset?.code) {
          setVoiceLanguage(firstOpt.dataset.code);
          closeVoiceLangDropdown();
          document.getElementById('voice-lang-btn')?.focus();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstOpt = document.querySelector('#voice-lang-list .voice-lang-opt');
        if (firstOpt) firstOpt.focus();
      }
    });
  }

  // Voice settings in Customize panel (Search tab)
  document.getElementById('voice-btn-toggle')?.addEventListener('change', e => {
    state.showVoiceBtn = e.target.checked;
    saveState();
    updateVoiceBtnVisibility();
  });
  document.getElementById('voice-lang-select')?.addEventListener('change', e => {
    setVoiceLanguage(e.target.value);
  });

  // Dismiss suggestions when focus leaves search section
  document.getElementById('search-section')?.addEventListener('focusout', () => {
    setTimeout(() => {
      const active = document.activeElement;
      const searchSec = document.getElementById('search-section');
      if (searchSec && !searchSec.contains(active)) {
        closeSuggestions();
      }
    }, 120);
  });

  // Engine dropdown toggle
  document.getElementById('engine-btn').addEventListener('click', e => {
    e.stopPropagation();
    closeSuggestions();
    document.getElementById('engine-dropdown').classList.toggle('hidden');
  });
  document.querySelectorAll('.engine-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      state.searchEngine = opt.dataset.engine; saveState(); updateEngineUI();
      document.getElementById('engine-dropdown').classList.add('hidden');
      // If user had text in search input, refresh suggestions for new engine
      if (searchInput.value.trim()) {
        fetchAndRenderSuggestions(searchInput.value.trim());
      }
    });
  });
  document.querySelectorAll('.engine-list-item').forEach(el => {
    el.addEventListener('click', () => {
      state.searchEngine = el.dataset.engine; saveState(); updateEngineUI();
      if (searchInput.value.trim()) {
        fetchAndRenderSuggestions(searchInput.value.trim());
      }
    });
  });

  // Shortcut view toggle
  document.getElementById('view-row-btn').addEventListener('click', () => {
    state.shortcutsView = 'row'; saveState(); renderShortcuts();
  });
  document.getElementById('view-grid-btn').addEventListener('click', () => {
    state.shortcutsView = 'grid'; saveState(); renderShortcuts();
  });

  // Account panel
  document.getElementById('account-btn').addEventListener('click', e => {
    e.stopPropagation();
    const p = document.getElementById('account-panel');
    if (p.classList.contains('hidden')) {
      syncGoogleAccounts(false);
      renderAccountPanel();
      openPanel('account-panel');
    } else {
      closeAllPanels();
    }
  });

  // Apps panel
  document.getElementById('apps-btn').addEventListener('click', e => {
    e.stopPropagation();
    const p = document.getElementById('apps-panel');
    if (p.classList.contains('hidden')) {
      renderAppsPanel();
      openPanel('apps-panel');
    } else {
      closeAllPanels();
    }
  });

  // Backdrop
  document.getElementById('backdrop').addEventListener('click', () => closeAllPanels());

  // Global dismiss
  document.addEventListener('click', e => {
    const dd = document.getElementById('engine-dropdown');
    if (!dd.classList.contains('hidden') &&
        !dd.contains(e.target) &&
        !document.getElementById('engine-btn').contains(e.target))
      dd.classList.add('hidden');
    if (!document.getElementById('context-menu').contains(e.target))
      closeContextMenu();
    const searchSection = document.getElementById('search-section');
    if (searchSection && !searchSection.contains(e.target)) {
      closeSuggestions();
    }
    if (!e.target.closest?.('#voice-lang-picker')) {
      closeVoiceLangDropdown();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const vld = document.getElementById('voice-lang-dropdown');
      if (vld && !vld.classList.contains('hidden')) {
        closeVoiceLangDropdown();
        return;
      }
      closeVoiceSearch();
      closeSuggestions();
      closeAllPanels(); closeCustomizePanel();
      closeShortcutModal(); closeAccountModal();
      closeFooterOnboardingModal();
      document.getElementById('engine-dropdown').classList.add('hidden');
      closeContextMenu();
    }
    if (e.key === 'Enter' && voiceOverlayOpen) {
      if (document.activeElement === document.getElementById('voice-lang-search-input')) {
        return;
      }
      const query = (finalVoiceTranscript || lastRecognizedTranscript || '').trim();
      if (query) {
        e.preventDefault();
        finishVoiceSearch();
        return;
      }
    }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
      if (voiceOverlayOpen) return;
      const inp = document.getElementById('search-input');
      if (document.activeElement !== inp &&
          !document.activeElement.matches('input,textarea,select,[contenteditable]'))
        inp.focus();
    }
  });

  // Customize panel
  document.getElementById('customize-btn').addEventListener('click', () => {
    const cp = document.getElementById('customize-panel');
    if (cp.classList.contains('open')) {
      closeCustomizePanel();
    } else {
      openCustomizePanel();
    }
  });
  document.getElementById('customize-close').addEventListener('click', closeCustomizePanel);

  // Shortcut modal
  document.getElementById('shortcut-save-btn').addEventListener('click', saveShortcut);
  document.getElementById('shortcut-cancel-btn').addEventListener('click', closeShortcutModal);
  document.getElementById('shortcut-modal-close').addEventListener('click', closeShortcutModal);
  document.getElementById('shortcut-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('shortcut-modal')) closeShortcutModal();
  });
  document.getElementById('shortcut-name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveShortcut();
  });
  document.getElementById('shortcut-url-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveShortcut();
  });
  document.getElementById('add-shortcut-sp-btn')?.addEventListener('click', () => openShortcutModal());

  // Context menu
  document.getElementById('ctx-edit').addEventListener('click', () => {
    if (contextTargetId) openShortcutModal(contextTargetId);
    closeContextMenu();
  });
  document.getElementById('ctx-delete').addEventListener('click', () => {
    if (contextTargetId) {
      state.shortcuts = state.shortcuts.filter(s => s.id !== contextTargetId);
      saveState(); renderShortcuts();
    }
    closeContextMenu();
  });

  // Account modal — save / cancel / close / backdrop
  document.getElementById('account-save-btn').addEventListener('click', saveAccount);
  document.getElementById('account-cancel-btn').addEventListener('click', closeAccountModal);
  document.getElementById('account-modal-close').addEventListener('click', closeAccountModal);
  document.getElementById('account-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('account-modal')) closeAccountModal();
  });
  document.getElementById('acc-name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('acc-email-input').focus();
  });
  document.getElementById('acc-email-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('acc-index-input').focus();
  });
  document.getElementById('acc-index-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveAccount();
  });

  // Account avatar file upload button
  const avatarUploadBtn = document.getElementById('acc-avatar-upload-btn');
  const avatarFileInput = document.getElementById('acc-avatar-file');
  const avatarUrlInput  = document.getElementById('acc-avatar-input');

  if (avatarUploadBtn && avatarFileInput && avatarUrlInput) {
    avatarUploadBtn.addEventListener('click', () => avatarFileInput.click());
    avatarFileInput.addEventListener('change', () => {
      const file = avatarFileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        avatarUrlInput.value = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Google Sign-in button inside account modal — direct redirect to Google
  document.getElementById('acc-google-signin-btn')?.addEventListener('click', () => {
    closeAccountModal();
    window.open('https://accounts.google.com/AddSession?hl=en&continue=https://mail.google.com/mail', '_blank');
  });

  // Account modal — "add account" button in Customize > Accounts tab
  document.getElementById('add-account-btn')?.addEventListener('click', () => openAccountModal());

  // Auto-refresh Google accounts whenever the user returns to the tab after signing in
  window.addEventListener('focus', async () => {
    await syncGoogleAccounts(true);
  });
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
      await syncGoogleAccounts(true);
    }
  });
  if (chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && (changes.google_synced_accounts || changes.accounts || changes.activeAccountId)) {
        loadState().then(() => {
          updateAccountUI();
          renderAppsPanel();
          renderAccountPanel();
          renderAccountsInPanel();
        });
      }
    });
  }

  // Account color picker
  document.querySelectorAll('.acc-color-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedAccColor = opt.dataset.color;
      document.querySelectorAll('.acc-color-opt').forEach(o =>
        o.classList.toggle('selected', o === opt));
    });
  });

  // Appearance
  document.querySelectorAll('.appearance-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      state.themeOverride = btn.dataset.theme; saveState(); applyTheme();
    });
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.themeOverride === 'auto') applyTheme();
  });

  // Footer onboarding guide
  document.getElementById('footer-onboarding-done-btn')?.addEventListener('click', () => {
    state.hasSeenFooterOnboarding = true;
    saveState();
    closeFooterOnboardingModal();
  });
  document.getElementById('footer-onboarding-dismiss-btn')?.addEventListener('click', closeFooterOnboardingModal);
  document.getElementById('footer-onboarding-close')?.addEventListener('click', closeFooterOnboardingModal);
  document.getElementById('footer-onboarding-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('footer-onboarding-modal')) closeFooterOnboardingModal();
  });
  document.getElementById('open-footer-guide-btn')?.addEventListener('click', () => {
    closeCustomizePanel();
    openFooterOnboardingModal();
  });
}

// ── Init ──────────────────────────────────────────────────────

async function init() {
  await loadState();
  applyTheme();
  startClock();
  applyBackground(null, true);
  updateEngineUI();
  updateVoiceBtnVisibility();
  populateVoiceLangSelect();
  updateVoiceLangUI();
  renderShortcuts();
  renderAppsPanel();
  updateAccountUI();
  renderCuratedPicker();
  setupUpload();
  setupColorSwatches();
  setupCustomizePanelTabs();
  setupEventListeners();
  renderAccountsInPanel();
  syncGoogleAccounts(false);
  checkFooterOnboarding();
}

document.addEventListener('DOMContentLoaded', init);