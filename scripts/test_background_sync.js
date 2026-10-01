const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const accountSync = require('../extension/account_sync.js');

const listeners = {
  installed: null,
  startup: null,
  message: null,
  alarm: null,
  storage: null
};
const alarms = new Map();
const data = {
  accounts: [],
  activeAccountId: null,
  accountSyncSchemaVersion: 2,
  lastAccountSync: 0
};
let fetchImpl = async () => { throw new Error('Unexpected fetch'); };
let fetchCalls = [];

const chrome = {
  runtime: {
    id: 'horizon-test',
    onInstalled: { addListener: callback => { listeners.installed = callback; } },
    onStartup: { addListener: callback => { listeners.startup = callback; } },
    onMessage: { addListener: callback => { listeners.message = callback; } }
  },
  alarms: {
    get: async name => alarms.get(name),
    create: async (name, info) => alarms.set(name, info),
    onAlarm: { addListener: callback => { listeners.alarm = callback; } }
  },
  storage: {
    local: {
      get: async keys => {
        if (Array.isArray(keys)) return Object.fromEntries(keys.map(key => [key, data[key]]));
        return { [keys]: data[keys] };
      },
      set: async values => Object.assign(data, values)
    },
    onChanged: { addListener: callback => { listeners.storage = callback; } }
  }
};

const context = {
  chrome,
  HorizonAccountSync: accountSync,
  importScripts() {},
  fetch: (...args) => {
    fetchCalls.push(args);
    return fetchImpl(...args);
  },
  Date,
  Promise,
  Number,
  String,
  Object,
  Array,
  JSON,
  setTimeout,
  clearTimeout
};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '../extension/background.js'), 'utf8'),
  context,
  { filename: 'background.js' }
);

function response(text, ok = true) {
  return { ok, status: ok ? 200 : 503, text: async () => text };
}

function gaiaJson(accounts) {
  return JSON.stringify(['gaia.l.a', accounts.map((email, index) => [
    'gaia.l.a', index, `Account ${index}`, email, '', 1, 0, 0, 0, 1,
    `gaia-id-${index}`, 0, 0, 0, 0, 1
  ])]);
}

function requestSync(force = true) {
  return new Promise(resolve => {
    const accepted = listeners.message(
      { type: 'HORIZON_SYNC_GOOGLE_ACCOUNTS', force },
      { id: chrome.runtime.id },
      resolve
    );
    assert.strictEqual(accepted, true);
  });
}

async function tick() {
  await new Promise(resolve => setImmediate(resolve));
}

async function run() {
  await tick();
  const alarm = alarms.get('horizon-google-account-sync');
  assert.strictEqual(alarm.periodInMinutes, 60);
  console.log('✓ Service worker ensures the hourly alarm exists');

  const emails = Array.from({ length: 7 }, (_, index) => `account${index}@gmail.com`);
  data.accounts = emails.map((email, index) => ({
    id: `google_${email.replace(/[^a-z0-9]/g, '_')}`,
    name: `Account ${index}`,
    email,
    gmailIndex: (index + 5) % 7
  })).concat([{ id: 'manual-1', name: 'Manual', email: 'manual@example.org', gmailIndex: 9 }]);
  data.google_synced_accounts = data.accounts;
  data.activeAccountId = 'google_account0_gmail_com';

  let releaseFetch;
  fetchCalls = [];
  fetchImpl = () => new Promise(resolve => { releaseFetch = resolve; });
  const first = requestSync(true);
  const second = requestSync(true);
  await tick();
  assert.strictEqual(fetchCalls.length, 1, 'overlapping refresh messages must share one fetch');
  releaseFetch(response(gaiaJson(emails)));
  await Promise.all([first, second]);
  assert.deepStrictEqual(data.accounts.filter(item => item.id.startsWith('google_')).map(item => item.gmailIndex), [0, 1, 2, 3, 4, 5, 6]);
  assert.strictEqual(data.activeAccountId, 'google_account0_gmail_com');
  assert(data.accounts.some(item => item.id === 'manual-1' && item.gmailIndex === 9));
  console.log('✓ Single-flight GAIA refresh repairs all seven indices and preserves selection/manual accounts');

  fetchCalls = [];
  fetchImpl = async (url, options) => options.method === 'POST'
    ? response('server unavailable', false)
    : response(gaiaJson(emails));
  const getFallback = await requestSync(true);
  assert.strictEqual(getFallback.state, 'success');
  assert.deepStrictEqual(fetchCalls.slice(0, 2).map(call => call[1].method), ['POST', 'GET']);
  console.log('✓ GET is attempted after an unsuccessful POST');

  const indicesBeforeFailure = data.accounts.map(item => item.gmailIndex);
  const lastSuccess = data.accountSyncStatus.lastSuccess;
  data.google_account_observations = {
    'account0@gmail.com': { email: 'account0@gmail.com', gmailIndex: 5, observedAt: Date.now() }
  };
  fetchImpl = async () => { throw new Error('offline'); };
  const failed = await requestSync(true);
  assert.strictEqual(failed.state, 'error');
  assert.strictEqual(failed.errorCode, 'network-error');
  assert.deepStrictEqual(data.accounts.map(item => item.gmailIndex), indicesBeforeFailure);
  assert.strictEqual(data.accountSyncStatus.lastSuccess, lastSuccess);
  console.log('✓ Network failures preserve the last verified account mapping');

  fetchImpl = async () => response('server unavailable', false);
  const httpFailure = await requestSync(true);
  assert.strictEqual(httpFailure.errorCode, 'http-post-503');
  console.log('✓ HTTP failures expose a safe status code for diagnosis');

  fetchImpl = async () => response('Request rejected: invalid origin', false);
  const originFailure = await requestSync(true);
  assert.strictEqual(originFailure.errorCode, 'http-post-503-origin');
  console.log('✓ HTTP response diagnostics classify known causes without storing response text');

  data.google_account_metadata = {
    'account0@gmail.com': { email: 'account0@gmail.com', name: 'Updated name', avatarUrl: 'https://lh3.googleusercontent.com/avatar' }
  };
  listeners.storage({ google_account_metadata: { newValue: data.google_account_metadata } }, 'local');
  await tick();
  assert.deepStrictEqual(data.accounts.map(item => item.gmailIndex), indicesBeforeFailure);
  assert.strictEqual(data.accounts.find(item => item.email === 'account0@gmail.com').name, 'Updated name');
  console.log('✓ Page metadata updates names/photos without changing indices');

  fetchImpl = async () => response('["gaia.l.a", []]');
  const empty = await requestSync(true);
  assert.strictEqual(empty.state, 'empty');
  assert.deepStrictEqual(data.accounts.map(item => item.id), ['manual-1']);
  console.log('✓ A valid empty response removes synced Google accounts but preserves manual accounts');

  fetchImpl = async () => response('not valid JSON or protobuf');
  const malformed = await requestSync(true);
  assert.strictEqual(malformed.state, 'error');
  assert.strictEqual(malformed.errorCode, 'invalid-response');
  assert.deepStrictEqual(data.accounts.map(item => item.id), ['manual-1']);
  console.log('✓ Malformed responses are treated as failures instead of clearing account state');

  fetchImpl = async () => response(gaiaJson(['account0@gmail.com']));
  const beforeAlarm = data.accountSyncStatus.lastSuccess;
  listeners.alarm({ name: 'horizon-google-account-sync' });
  for (let attempt = 0; attempt < 4 && data.accountSyncStatus.lastSuccess === beforeAlarm; attempt++) await tick();
  assert(data.accountSyncStatus.lastSuccess > beforeAlarm);
  assert(data.accounts.some(item => item.email === 'account0@gmail.com' && item.gmailIndex === 0));
  console.log('✓ The hourly alarm triggers an authoritative sync');
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
