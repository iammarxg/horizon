const assert = require('assert');
const fs = require('fs');
const path = require('path');

const extensionDir = path.join(__dirname, '..', 'extension');
const manifest = JSON.parse(fs.readFileSync(path.join(extensionDir, 'manifest.json'), 'utf8'));
const rules = JSON.parse(fs.readFileSync(path.join(extensionDir, 'rules/gaia_origin.json'), 'utf8'));

assert.strictEqual(manifest.version, '1.0.2');
assert(manifest.permissions.includes('declarativeNetRequest'));
assert(manifest.declarative_net_request.rule_resources.some(resource =>
  resource.path === 'rules/gaia_origin.json' && resource.enabled
));
assert.strictEqual(rules.length, 1);
assert.deepStrictEqual(rules[0].condition.requestDomains, ['accounts.google.com']);
assert.deepStrictEqual(rules[0].condition.requestMethods, ['post']);
assert.deepStrictEqual(rules[0].condition.resourceTypes, ['xmlhttprequest', 'other']);
assert.strictEqual(rules[0].condition.urlFilter, '|https://accounts.google.com/ListAccounts^');
assert.deepStrictEqual(rules[0].action.requestHeaders, [{
  header: 'Origin',
  operation: 'set',
  value: 'https://www.google.com'
}]);

console.log('✓ GAIA Origin rule is enabled, limited to ListAccounts POSTs, and version stays at 1.0.2');
