import test, { describe } from 'node:test';
import assert from 'node:assert';
import { Browser } from '../src/browser.js';

function shouldSkip() {
  // Tests stuck on windows in CI environment, skipping for now
  if (process.platform === 'win32' && process.env.CI) {
    console.warn('Skipping test on Windows in CI environment');
    return true;
  }
  return false;
}

describe('Browser', { skip: shouldSkip()}, () => {
  const browser = new Browser();
  test('goto', async () => {
    await browser.goto('https://agent-browser.dev/');
    const url = await browser.get.url();
    assert.strictEqual(url, 'https://agent-browser.dev/');
  });
});