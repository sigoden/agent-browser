import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toCliOptions, spawnAgentBrowser, runAgentBrowser } from '../src/runner.js';

describe('toCliOptions', () => {
  it('returns empty array for undefined', () => {
    assert.deepStrictEqual(toCliOptions(undefined), []);
  });

  it('returns empty array for empty object', () => {
    assert.deepStrictEqual(toCliOptions({}), []);
  });

  it('converts camelCase to kebab-case', () => {
    assert.deepStrictEqual(
      toCliOptions({ ignoreHttpsErrors: true }),
      ['--ignore-https-errors'],
    );
  });

  it('handles single-word keys', () => {
    assert.deepStrictEqual(toCliOptions({ json: true }), ['--json']);
  });

  it('handles boolean false as --no-flag', () => {
    assert.deepStrictEqual(toCliOptions({ json: false }), ['--no-json']);
  });

  it('handles string values', () => {
    assert.deepStrictEqual(
      toCliOptions({ session: 'my-session' }),
      ['--session', 'my-session'],
    );
  });

  it('handles number values', () => {
    assert.deepStrictEqual(
      toCliOptions({ maxOutput: 5000 }),
      ['--max-output', '5000'],
    );
  });

  it('handles array values as repeated flags', () => {
    assert.deepStrictEqual(
      toCliOptions({ extension: ['ext-a', 'ext-b'] }),
      ['--extension', 'ext-a', '--extension', 'ext-b'],
    );
  });

  it('skips null and undefined values', () => {
    assert.deepStrictEqual(
      toCliOptions({ session: 'active', unused: undefined, missing: null }),
      ['--session', 'active'],
    );
  });

  it('handles mixed options', () => {
    const result = toCliOptions({
      headed: true,
      session: 'test',
      extension: ['a', 'b'],
      json: false,
    });
    assert.deepStrictEqual(result, [
      '--headed',
      '--session', 'test',
      '--extension', 'a',
      '--extension', 'b',
      '--no-json',
    ]);
  });
});

describe('spawnAgentBrowser', () => {
  it('spawns agent-browser and resolves with stdout on --version', async () => {
    const result = await spawnAgentBrowser(['--version']);
    assert.ok(result.includes('agent-browser'));
  });
});

describe('runAgentBrowser', () => {
  it('resolves with stdout for --version command', async () => {
    const result = await runAgentBrowser(['--version'], [], {});
    assert.ok(result.includes('agent-browser'));
  });
});
