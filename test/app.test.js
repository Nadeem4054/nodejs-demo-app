const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { handler } = require('../app');

test('server responds with 200', async () => {
  const server = http.createServer(handler);
  await new Promise((r) => server.listen(0, r));
  const res = await fetch(`http://localhost:${server.address().port}`);
  assert.strictEqual(res.status, 200);
  assert.match(await res.text(), /Hello/);
  server.close();
});