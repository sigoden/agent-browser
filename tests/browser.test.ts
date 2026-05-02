import test, { describe } from 'node:test';
import assert from 'node:assert';
import { Browser } from '../dist';

describe('Browser', () => {
  const browser = new Browser();
  test('goto', async () => {
    await browser.goto('https://agent-browser.dev/');
    const title = await browser.get.url();
    assert.strictEqual(title, 'https://agent-browser.dev/');
  });
});