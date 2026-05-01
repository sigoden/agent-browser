import test from 'node:test';
import assert from 'node:assert';
import { Browser } from './browser.js';

test('browser get title', async () => {
  const browser = new Browser();
  await browser.goto('https://agent-browser.dev/');
  const title = await browser.get.url();
  assert.strictEqual(title, 'https://agent-browser.dev/\n');
  await browser.close();
});
