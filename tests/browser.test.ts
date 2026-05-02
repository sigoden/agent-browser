import test, { describe } from 'node:test';
import assert from 'node:assert';
import { Browser } from '../src/browser.js';

describe('Browser', () => {
  const browser = new Browser();
  test('goto', async () => {
    await browser.goto('https://agent-browser.dev/');
    const url = await browser.get.url();
    assert.strictEqual(url, 'https://agent-browser.dev/');
  });
});