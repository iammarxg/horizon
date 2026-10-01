const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const WebSocket = require('ws');

const extension = path.join(__dirname, '..', 'extension');
const source = fs.readFileSync(path.join(extension, 'newtab.js'), 'utf8');
const cssContent = fs.readFileSync(path.join(extension, 'newtab.css'), 'utf8');

function section(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert(from >= 0 && to > from, `Production section missing: ${start}`);
  return source.slice(from, to);
}
const production = [
  section('let accountSyncStatus =', '// ── Default State'),
  section('let manualAccountSyncFeedback =', 'function updateAccountUI()'),
  section('function openPanel(id)', 'function openCustomizePanel()')
].join('\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = path.join(os.tmpdir(), 'chrome-horizon-test-' + Date.now());

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
      this.ws.on('message', data => {
        const msg = JSON.parse(data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(msg.error);
          else cb.resolve(msg.result);
        }
      });
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }
  close() {
    try { this.ws.close(); } catch (e) {}
  }
}

async function run() {
  const port = 9245;
  const proc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=' + profile,
    '--window-size=800,650',
    'about:blank'
  ]);

  try {
    let connected = false;
    let cdp;
    for (let attempt = 0; attempt < 20; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const tabs = await res.json();
        const pageTab = tabs.find(t => t.type === 'page');
        if (pageTab?.webSocketDebuggerUrl) {
          cdp = new CDP(pageTab.webSocketDebuggerUrl);
          await cdp.connect();
          connected = true;
          break;
        }
      } catch (e) {}
    }
    assert(connected, 'Failed to connect to Chrome CDP');

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    const htmlContent = `
      <div id="account-panel" class="floating-panel"></div>
      <div id="apps-panel" class="hidden"></div>
      <div id="customize-panel" class="hidden"></div>
      <div id="backdrop" class="hidden"></div>
    `;

    await cdp.eval(`
      document.body.innerHTML = ${JSON.stringify(htmlContent)};
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(cssContent)} + '\\n* { animation: none !important; transition: none !important; }';
      document.head.appendChild(style);

      window.state = { accounts: [], activeAccountId: null };
      window.getActiveAccount = () => null;
      window.escHtml = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      window.closeSuggestions = window.closeContextMenu = window.closeCustomizePanel = () => {};
      window.pendingSyncCallbacks = [];
      window.chrome = { runtime: { lastError: null, sendMessage(message, callback) {
        if (window.throwWorkerError) throw new Error('Worker unavailable');
        window.pendingSyncCallbacks.push(callback);
      } } };
      window.completeSync = (response, error) => {
        chrome.runtime.lastError = error ? { message: 'Worker unavailable' } : null;
        if (pendingSyncCallbacks.length) pendingSyncCallbacks.shift()(response);
        chrome.runtime.lastError = null;
      };
      ${production}
      accountSyncStatus = { state: 'success', lastSuccess: Date.now() };
      renderAccountPanel();
    `);

    // Verify initial state
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');
    assert(!await cdp.eval(`document.querySelector('#account-panel').textContent.includes('Google account order synced')`));

    // Click sync button
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync').disabled`), true);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-label').textContent`), 'Syncing…');

    // Duplicate click is ignored while syncing
    await cdp.eval(`syncGoogleAccountsManually()`);
    assert.strictEqual(await cdp.eval(`pendingSyncCallbacks.length`), 1);

    // Background update does not overwrite syncing feedback
    await cdp.eval(`
      accountSyncStatus = { state: 'error', errorCode: 'background-test' };
      renderAccountPanel();
    `);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync').disabled`), true);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');

    // Complete sync with success
    await cdp.eval(`completeSync({ state: 'success' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Success');
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync').disabled`), false);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-label').textContent`), 'Sync Google Accounts');

    // Preserves region across redraws
    await cdp.eval(`
      window.originalRegion = document.getElementById('apx-sync-result');
      accountSyncStatus = { state: 'error', errorCode: 'background-test' };
      renderAccountPanel();
    `);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Success');
    assert(await cdp.eval(`originalRegion === document.getElementById('apx-sync-result')`));
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').getAttribute('aria-live')`), 'polite');
    console.log('✓ Manual feedback survives redraws and background updates; duplicate clicks are ignored');

    // Layout checks
    for (const theme of ['dark', 'light']) {
      await cdp.eval(`document.body.classList.toggle('theme-light', ${theme === 'light'})`);
      const layout = await cdp.eval(`
        (() => {
          const btn = document.querySelector('#apx-sync').getBoundingClientRect();
          const tag = document.querySelector('#apx-sync-result').getBoundingClientRect();
          const panel = document.querySelector('#account-panel').getBoundingClientRect();
          return {
            panelWidth: panel.width,
            tagRightOfBtn: tag.x >= btn.x + btn.width,
            tagFitsPanel: tag.x + tag.width <= panel.x + panel.width,
            verticallyAligned: Math.abs((btn.y + btn.height / 2) - (tag.y + tag.height / 2)) < 2
          };
        })()
      `);
      assert.strictEqual(layout.panelWidth, 340);
      assert(layout.tagRightOfBtn, 'Tag must sit to the right of the button');
      assert(layout.tagFitsPanel, 'Tag must fit inside the panel');
      assert(layout.verticallyAligned, 'Tag and button must be vertically aligned');
    }

    // Test empty response
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`completeSync({ state: 'empty' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Success');
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').getAttribute('title')`), 'Google returned no active sessions.');

    // Test error response
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`completeSync({ state: 'error', errorCode: 'http-post-400' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Failed');
    assert(await cdp.eval(`document.querySelector('.acc-sync-status.error').textContent.includes('http-post-400')`));

    // Test worker unavailable
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`completeSync(undefined, true)`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Failed');
    assert(await cdp.eval(`document.querySelector('#apx-sync-result').getAttribute('title').includes('worker-unavailable')`));

    // Test worker invalid response
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`completeSync(undefined)`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Failed');
    assert(await cdp.eval(`document.querySelector('#apx-sync-result').getAttribute('title').includes('worker-invalid-response')`));
    console.log('✓ Success, valid empty, failure, and unavailable/missing worker responses show the correct result');

    // Test close and reopen behavior
    await cdp.eval(`document.querySelector('#apx-close').click()`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');
    await cdp.eval(`renderAccountPanel(); openPanel('account-panel');`);
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`document.querySelector('#apx-close').click()`);
    await cdp.eval(`renderAccountPanel(); openPanel('account-panel');`);
    await cdp.eval(`document.querySelector('#apx-sync').click()`);
    await cdp.eval(`completeSync({ state: 'error', errorCode: 'late-old-result' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync').disabled`), true);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');
    await cdp.eval(`completeSync({ state: 'success' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), 'Success');
    await cdp.eval(`openPanel('apps-panel'); renderAccountPanel(); openPanel('account-panel');`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');
    await cdp.eval(`(function() { window.backgroundSync = syncGoogleAccounts(true); return true; })()`);
    await cdp.eval(`completeSync({ state: 'success' })`);
    assert.strictEqual(await cdp.eval(`document.querySelector('#apx-sync-result').textContent`), '');
    console.log('ALL MANUAL ACCOUNT SYNC TESTS PASSED!');
    cdp.close();
  } finally {
    try {
      const { execSync } = require('child_process');
      execSync(`taskkill /F /T /PID ${proc.pid}`, { stdio: 'ignore' });
    } catch (e) {
      try { proc.kill('SIGKILL'); } catch (err) {}
    }
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
