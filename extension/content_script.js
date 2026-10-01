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

  function sanitizeAccountList(accounts) {
    return window.HorizonAccountSync
      ? window.HorizonAccountSync.sanitizeAccountList(accounts)
      : [];
  }

  function persistAccountMetadata(accounts) {
    if (!window.HorizonAccountSync || !Array.isArray(accounts)) return;
    chrome.storage.local.get(['google_account_metadata']).then(result => {
      let metadata = result.google_account_metadata || {};
      for (const account of accounts) {
        metadata = window.HorizonAccountSync.observeMetadata(metadata, account);
      }
      return chrome.storage.local.set({ google_account_metadata: metadata });
    }).catch(() => {});
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

          const container = node.closest('li, [role="listitem"], [data-email], form') || node.parentElement || node;
          const containerText = container.textContent || '';

          // Filter out signed-out accounts so they never displace active sessions
          if (/\bsigned\s*out\b/i.test(containerText)) {
            return;
          }

          seen.add(email);

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
            gmailIndex: null,
            color: '#4285F4',
            initial: name.charAt(0).toUpperCase()
          });
        });

        const accounts = sanitizeAccountList(rawAccounts);
        if (accounts.length > 0) {
          persistAccountMetadata(accounts);
          return;
        }
      }

      // Live URL session index detection (e.g. /mail/u/1/, /drive/u/0/, ?authuser=2)
      // General detection across Google sites (Gmail, Search, YouTube, etc.)
      const accountBtns = Array.from(document.querySelectorAll('a[aria-label*="Google Account"], a[aria-label*="Google-Konto"], [aria-label*="Compte Google"], a[href*="SignOutOptions"], a[href*="SignOut"], button[aria-label*="Google Account"]'));
      for (const btn of accountBtns) {
        const label = btn.getAttribute('aria-label') || btn.getAttribute('title') || '';
        const nameMatch = label.match(/Google Account:\s*([^\n\r(]+?)(?:\s*\(|\s*\n|$)/i);
        const emailMatch = label.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (nameMatch && nameMatch[1] && emailMatch) {
          const realName = nameMatch[1].trim();
          const email = emailMatch[0].toLowerCase();
          const avatar = btn.querySelector('img[src*="googleusercontent.com"]');
          persistAccountMetadata([{
            email,
            name: realName,
            avatarUrl: avatar?.src ? avatar.src.replace(/=s\d+(-c)?$/, '=s128-c') : ''
          }]);
        }
      }

    } catch (e) {}
  }

  scanAccounts();
  setTimeout(scanAccounts, 1000);
  setTimeout(scanAccounts, 3000);
})();
