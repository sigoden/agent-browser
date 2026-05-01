import { spawn } from 'node:child_process';

function toCliOptions(options: Record<string, unknown> | undefined): string[] {
  if (!options) return [];
  const result: string[] = [];
  for (const [key, value] of Object.entries(options)) {
    if (value === undefined || value === null) continue;
    const flag = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
    if (typeof value === 'boolean') {
      result.push(value ? `--${flag}` : `--no-${flag}`);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        result.push(`--${flag}`, String(item));
      }
    } else {
      result.push(`--${flag}`, String(value));
    }
  }
  return result;
}

export async function delegate(
  command: string[],
  args: string[],
  globalOptions: Record<string, unknown>,
  options?: Record<string, unknown>,
): Promise<string> {
  const allArgs = ['agent-browser', ...toCliOptions(globalOptions), ...command, ...args, ...toCliOptions(options)];

  return new Promise<string>((resolve, reject) => {
    const child = spawn('npx', allArgs, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false,
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    child.on('close', (code: number | null) => {
      if (code === 0 || code === null) {
        resolve(stdout);
      } else {
        reject(new Error(stderr || `agent-browser exited with code ${code}`));
      }
    });

    child.on('error', (err: Error) => {
      reject(new Error(`Failed to spawn agent-browser: ${err.message}`));
    });
  });
}
