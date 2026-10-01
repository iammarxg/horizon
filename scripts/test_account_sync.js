const assert = require('assert');
const sync = require('../extension/account_sync.js');

function varint(value) {
  const bytes = [];
  do {
    let byte = value & 0x7f;
    value >>>= 7;
    if (value) byte |= 0x80;
    bytes.push(byte);
  } while (value);
  return Buffer.from(bytes);
}

function stringField(field, value) {
  const data = Buffer.from(value, 'utf8');
  return Buffer.concat([varint((field << 3) | 2), varint(data.length), data]);
}

function boolField(field, value) {
  return Buffer.concat([varint(field << 3), varint(value ? 1 : 0)]);
}

function account(email, id, options = {}) {
  const body = Buffer.concat([
    stringField(3, email),
    stringField(10, id),
    options.name ? stringField(2, options.name) : Buffer.alloc(0),
    options.avatarUrl ? stringField(4, options.avatarUrl) : Buffer.alloc(0),
    options.valid === false ? boolField(9, false) : Buffer.alloc(0),
    options.signedOut ? boolField(14, true) : Buffer.alloc(0)
  ]);
  return Buffer.concat([varint((1 << 3) | 2), varint(body.length), body]);
}

function record(email, index, id = `google_${email.replace(/[^a-z0-9]/g, '_')}`) {
  return { id, name: email.split('@')[0], email, gmailIndex: index };
}

console.log('--- Running Account Sync Test Suite ---');

const binaryFixture = Buffer.concat([
  account('primary@gmail.com', 'gaia-primary', { name: 'Primary' }),
  account('secondary@gmail.com', 'gaia-secondary', { name: 'Secondary' }),
  account('signedout@gmail.com', 'gaia-signedout', { signedOut: true }),
  account('invalid@gmail.com', 'gaia-invalid', { valid: false })
]).toString('base64');
const binaryAccounts = sync.parseListAccountsResponse(binaryFixture);
assert.deepStrictEqual(binaryAccounts.map(a => [a.email, a.gmailIndex]), [
  ['primary@gmail.com', 0],
  ['secondary@gmail.com', 1]
]);
console.log('✓ Binary GAIA fields are parsed and usable sessions keep canonical order');

const jsonFixture = `)]}'\n["gaia.l.a", [
  ["gaia.l.a", 0, "Primary", "primary@gmail.com", "https://photo1=s48-c", 1, 0, 0, 0, 1, "gaia-primary", 0, 0, 0, 0, 1],
  ["gaia.l.a", 1, "Secondary", "secondary@gmail.com", "https://photo2=s48-c", 1, 0, 0, 0, 1, "gaia-secondary", 0, 0, 0, 0, 1]
]]`;
const jsonAccounts = sync.parseListAccountsResponse(jsonFixture);
assert.deepStrictEqual(jsonAccounts.map(a => [a.email, a.gmailIndex]), [
  ['primary@gmail.com', 0],
  ['secondary@gmail.com', 1]
]);
console.log('✓ JSON GAIA positional fields are parsed without guessing numeric values');

assert.deepStrictEqual(sync.parseListAccountsResponseResult('["gaia.l.a", []]'), {
  valid: true,
  accounts: [],
  error: null
});
assert.strictEqual(sync.parseListAccountsResponseResult('not a GAIA response').valid, false);
assert.strictEqual(sync.parseListAccountsResponseResult('["gaia.l.a", "%%%"]' ).valid, false);
console.log('✓ Valid empty account lists are distinct from malformed responses');

const rotated = [
  record('account1@gmail.com', 0),
  record('account2@gmail.com', 1),
  record('account3@gmail.com', 2),
  record('account0@gmail.com', 6)
];
const sanitized = sync.sanitizeAccountList(rotated);
assert.deepStrictEqual(sanitized.map(a => [a.email, a.gmailIndex]), [
  ['account1@gmail.com', 0],
  ['account2@gmail.com', 1],
  ['account3@gmail.com', 2],
  ['account0@gmail.com', 6]
]);
console.log('✓ Rotated/transient input order cannot rewrite stored indices');

const phantomClean = sync.sanitizeAccountList([
  record('realuser@gmail.com', 0),
  record('corruptrealuser@gmail.com', 1),
  record('other@example.org', 2)
]);
assert.deepStrictEqual(phantomClean.map(a => a.email), ['realuser@gmail.com', 'other@example.org']);
console.log('✓ Duplicate and concatenated phantom records are removed without reindexing');

const authoritative = [
  { email: 'account0@gmail.com', name: 'Account 0', gmailIndex: 0 },
  { email: 'account1@gmail.com', name: 'Account 1', gmailIndex: 1 },
  { email: 'account2@gmail.com', name: 'Account 2', gmailIndex: 2 },
  { email: 'account3@gmail.com', name: 'Account 3', gmailIndex: 3 },
  { email: 'account4@gmail.com', name: 'Account 4', gmailIndex: 4 },
  { email: 'account5@gmail.com', name: 'Account 5', gmailIndex: 5 },
  { email: 'account6@gmail.com', name: 'Account 6', gmailIndex: 6 }
];
const repaired = sync.mergeAuthoritativeAccounts(authoritative, [
  ...authoritative.map((account, index) => ({
    ...record(account.email, (index + 5) % authoritative.length),
    id: `google_${account.email.replace(/[^a-z0-9]/g, '_')}`
  }))
]);
assert.deepStrictEqual(repaired.filter(a => a.email.startsWith('account')).map(a => [a.email, a.gmailIndex]), [
  ['account0@gmail.com', 0],
  ['account1@gmail.com', 1],
  ['account2@gmail.com', 2],
  ['account3@gmail.com', 3],
  ['account4@gmail.com', 4],
  ['account5@gmail.com', 5],
  ['account6@gmail.com', 6]
]);
console.log('✓ Authoritative sync repairs legacy rotation while preserving account IDs');

const metadata = sync.observeMetadata({}, {
  email: 'account0@gmail.com',
  name: 'Updated Name',
  avatarUrl: 'https://lh3.googleusercontent.com/photo'
});
const metadataMerged = sync.mergeAccountMetadata(authoritative, metadata);
assert.deepStrictEqual(metadataMerged.map(a => a.gmailIndex), authoritative.map(a => a.gmailIndex));
assert.strictEqual(metadataMerged[0].name, 'Updated Name');
console.log('✓ Page metadata can update names/photos without changing routing indices');

assert.strictEqual(sync.isCanonicalList(authoritative), true);
assert.strictEqual(sync.isCanonicalList(rotated), false);
console.log('✓ Canonical-list validation detects rotated mappings');

// Corporate (@google.com) and test (@example.com) emails are valid
const corporateAccounts = sync.sanitizeAccountList([
  { email: 'developer@google.com', name: 'Developer', gmailIndex: 0 },
  { email: 'tester@example.com', name: 'Tester', gmailIndex: 1 }
]);
assert.strictEqual(corporateAccounts.length, 2);
assert.strictEqual(corporateAccounts[0].email, 'developer@google.com');
assert.strictEqual(corporateAccounts[1].email, 'tester@example.com');
console.log('✓ Google corporate (@google.com) and documentation (@example.com) emails are valid');

// Verified GAIA accounts with shared suffix usernames are never dropped
const suffixAccounts = sync.sanitizeAccountList([
  { email: 'dan@gmail.com', name: 'Dan', gaiaId: 'gaia-dan', id: 'google_dan_gmail_com', gmailIndex: 0 },
  { email: 'jordan@gmail.com', name: 'Jordan', gaiaId: 'gaia-jordan', id: 'google_jordan_gmail_com', gmailIndex: 1 }
]);
assert.strictEqual(suffixAccounts.length, 2);
assert.deepStrictEqual(suffixAccounts.map(a => a.email), ['dan@gmail.com', 'jordan@gmail.com']);
console.log('✓ Verified GAIA accounts with shared suffix usernames are preserved');

// Manual user accounts with shared suffix usernames are never dropped
const manualSuffixAccounts = sync.sanitizeAccountList([
  { email: 'sam@gmail.com', name: 'Sam', id: 'manual-1', gmailIndex: 0 },
  { email: 'uncle_sam@gmail.com', name: 'Uncle Sam', id: 'manual-2', gmailIndex: 1 }
]);
assert.strictEqual(manualSuffixAccounts.length, 2);
assert.deepStrictEqual(manualSuffixAccounts.map(a => a.email), ['sam@gmail.com', 'uncle_sam@gmail.com']);
console.log('✓ Manual user accounts with shared suffix usernames are preserved');

// Authoritative merge preserves existing name if incoming name is empty
const mergedEmptyName = sync.mergeAuthoritativeAccounts(
  [{ email: 'account0@gmail.com', name: '', avatarUrl: '' }],
  [{ email: 'account0@gmail.com', name: 'Saved Name', id: 'google_account0_gmail_com' }]
);
assert.strictEqual(mergedEmptyName[0].name, 'Saved Name');
console.log('✓ Authoritative merge preserves saved name when incoming name is empty');

console.log('====================================');
console.log('ALL ACCOUNT SYNC TESTS PASSED!');
