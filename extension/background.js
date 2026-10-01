// Horizon service worker: the sole authority for synchronized Google account order.
importScripts('account_sync.js');

const ACCOUNT_SYNC_ALARM = 'horizon-google-account-sync';
const ACCOUNT_SYNC_INTERVAL_MINUTES = 60;
const ACCOUNT_SYNC_TTL_MS = ACCOUNT_SYNC_INTERVAL_MINUTES * 60 * 1000;
const ACCOUNT_SYNC_SCHEMA_VERSION = 3;
const LIST_ACCOUNTS_URLS = [
  'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumSigninManager&laf=b64bin&json=standard',
  'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumSigninManager&json=standard'
];

let accountSyncPromise = null;
let accountWriteQueue = Promise.resolve();

function enqueueAccountWrite(operation) {
  accountWriteQueue = accountWriteQueue.then(operation, operation);
  return accountWriteQueue;
}

async function ensureAccountSyncAlarm() {
  const existing = await chrome.alarms.get(ACCOUNT_SYNC_ALARM);
  if (!existing) {
    await chrome.alarms.create(ACCOUNT_SYNC_ALARM, {
      delayInMinutes: ACCOUNT_SYNC_INTERVAL_MINUTES,
      periodInMinutes: ACCOUNT_SYNC_INTERVAL_MINUTES
    });
  }
}

function classifyGoogleHttpFailure(status, method, responseText) {
  const text = String(responseText || '').slice(0, 4096).toLowerCase();
  let reason = '';
  if (/\borigin\b/.test(text)) reason = '-origin';
  else if (/\bsource\b/.test(text)) reason = '-source';
  else if (/\b(json|format|protobuf|laf)\b/.test(text)) reason = '-format';
  else if (/\bbad request\b/.test(text)) reason = '-bad-request';
  return `http-${String(method || 'GET').toLowerCase()}-${status}${reason}`;
}

async function fetchGoogleAccounts() {
  let sawValidEmpty = false;
  let sawParseFailure = false;
  let lastFailure = 'network';
  let firstHttpFailure = null;

  for (const url of LIST_ACCOUNTS_URLS) {
    const requests = [
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: ' '
      },
      { method: 'GET' }
    ];

    for (const request of requests) {
      try {
        const response = await fetch(url, {
          ...request,
          credentials: 'include',
          cache: 'no-store'
        });
        if (!response.ok) {
          let responseText = '';
          try { responseText = await response.text(); } catch (error) {}
          const failure = classifyGoogleHttpFailure(response.status, request.method, responseText);
          if (!firstHttpFailure || request.method === 'POST') firstHttpFailure = failure;
          lastFailure = firstHttpFailure;
          continue;
        }

        const parsed = HorizonAccountSync.parseListAccountsResponseResult(await response.text());
        if (!parsed.valid) {
          sawParseFailure = true;
          lastFailure = 'invalid-response';
          continue;
        }
        if (parsed.accounts.length > 0) {
          return { status: 'success', accounts: parsed.accounts };
        }
        sawValidEmpty = true;
      } catch (error) {
        // Keep the diagnostic generic and never persist request/response data.
        lastFailure = error?.name === 'TypeError' ? 'network-type-error' : 'network-error';
      }
    }
  }

  if (sawValidEmpty) return { status: 'empty', accounts: [] };
  return {
    status: 'error',
    accounts: [],
    errorCode: sawParseFailure && lastFailure === 'invalid-response'
      ? 'invalid-response'
      : (firstHttpFailure || lastFailure)
  };
}

async function syncGoogleAccounts(force = false) {
  if (accountSyncPromise) return accountSyncPromise;
  accountSyncPromise = (async () => {
    const now = Date.now();
    const stored = await chrome.storage.local.get([
      'accounts',
      'activeAccountId',
      'lastAccountSync',
      'accountSyncSchemaVersion',
      'accountSyncStatus'
    ]);
    const current = HorizonAccountSync.sanitizeAccountList(stored.accounts || []);
    const googleAccounts = current.filter(account => String(account.id).startsWith('google_'));
    const currentGoogleIsCanonical = googleAccounts.length === 0
      || HorizonAccountSync.isCanonicalList(googleAccounts);
    const isFresh = stored.accountSyncSchemaVersion === ACCOUNT_SYNC_SCHEMA_VERSION
      && currentGoogleIsCanonical
      && Number.isFinite(stored.lastAccountSync)
      && now - stored.lastAccountSync < ACCOUNT_SYNC_TTL_MS;

    if (!force && isFresh) return stored.accountSyncStatus || { status: 'success' };

    const previousStatus = stored.accountSyncStatus || {};
    const result = await fetchGoogleAccounts();
    const status = {
      state: result.status,
      lastAttempt: now,
      lastSuccess: result.status === 'error' ? (previousStatus.lastSuccess || 0) : now,
      errorCode: result.errorCode || null,
      errorDetail: result.status === 'error' ? (result.errorCode || null) : null
    };

    if (result.status === 'error') {
      await chrome.storage.local.set({ accountSyncStatus: status });
      return status;
    }

    await enqueueAccountWrite(async () => {
      // Re-read at commit time so an account selection or manual edit made
      // during the request is not replaced with the request's stale snapshot.
      const latest = await chrome.storage.local.get([
        'accounts',
        'activeAccountId',
        'google_account_metadata'
      ]);
      const latestAccounts = HorizonAccountSync.sanitizeAccountList(latest.accounts || []);
      let accounts = HorizonAccountSync.mergeAuthoritativeAccounts(result.accounts, latestAccounts);
      accounts = HorizonAccountSync.mergeAccountMetadata(accounts, latest.google_account_metadata);

      let activeAccountId = latest.activeAccountId || null;
      if (!activeAccountId || !accounts.some(account => account.id === activeAccountId)) {
        const previousActive = latestAccounts.find(account => account.id === latest.activeAccountId);
        const sameEmail = previousActive && accounts.find(account => account.email === previousActive.email);
        activeAccountId = sameEmail?.id || accounts[0]?.id || null;
      }

      await chrome.storage.local.set({
        accounts,
        google_synced_accounts: accounts,
        activeAccountId,
        lastAccountSync: now,
        accountSyncSchemaVersion: ACCOUNT_SYNC_SCHEMA_VERSION,
        accountSyncStatus: status
      });
    });

    return status;
  })().finally(() => {
    accountSyncPromise = null;
  });
  return accountSyncPromise;
}

async function mergeStoredAccountMetadata() {
  return enqueueAccountWrite(async () => {
    const stored = await chrome.storage.local.get(['accounts', 'google_account_metadata']);
    const accounts = HorizonAccountSync.mergeAccountMetadata(
      stored.accounts || [],
      stored.google_account_metadata
    );
    if (JSON.stringify(accounts) !== JSON.stringify(stored.accounts || [])) {
      await chrome.storage.local.set({ accounts, google_synced_accounts: accounts });
    }
  });
}

async function initializeAccountSync() {
  await ensureAccountSyncAlarm();
}

chrome.runtime.onInstalled.addListener(async details => {
  await initializeAccountSync();
  if (details.reason === 'install') {
    await chrome.storage.local.set({
      accounts: [],
      activeAccountId: null,
      shortcuts: [
        { id: 's1', name: 'YouTube', url: 'https://youtube.com' },
        { id: 's2', name: 'Gmail', url: 'https://mail.google.com' },
        { id: 's3', name: 'Maps', url: 'https://maps.google.com' },
        { id: 's4', name: 'GitHub', url: 'https://github.com' }
      ],
      shortcutsView: 'row',
      background: { type: 'curated', index: 0 },
      themeOverride: 'auto',
      voiceLang: 'auto',
      showVoiceBtn: true,
      hasSeenFooterOnboarding: false
    });
  }
  if (details.reason === 'install' || details.reason === 'update') {
    await syncGoogleAccounts(true);
  }
});

chrome.runtime.onStartup.addListener(async () => {
  await initializeAccountSync();
  await syncGoogleAccounts(true);
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === ACCOUNT_SYNC_ALARM) syncGoogleAccounts(true);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || message?.type !== 'HORIZON_SYNC_GOOGLE_ACCOUNTS') return false;
  syncGoogleAccounts(Boolean(message.force)).then(sendResponse).catch(() => {
    sendResponse({ state: 'error', errorCode: 'worker-error' });
  });
  return true;
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.google_account_metadata) {
    mergeStoredAccountMetadata();
  }
});

// Alarms can be cleared on browser restart or extension reload in some
// Chromium versions, so recreate one whenever the worker starts.
initializeAccountSync().catch(() => {});
