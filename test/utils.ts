import { assert } from 'chai';
import { hashElement } from 'folder-hash';
import { promises as fs } from 'fs';
import _ from 'lodash';
import os from 'os';
import path from 'path';

export const SAMPLE_GLOB = path.join(__dirname, 'sample', '*.png');

export async function mkdtemp(): Promise<string> {
  const target = process.env.CI
    ? path.join(process.env.HOME, os.tmpdir())
    : await fs.realpath(os.tmpdir());
  return fs.mkdtemp(target);
}

export function test(
  context: string,
  done: () => void,
  expected: string[],
  stream: NodeJS.ReadWriteStream,
): void {
  stream.on('end', async () => {
    const hashed = await hashElement(context, {
      files: { exclude: ['sprite.png'] },
    });
    assert.deepEqual(_.map(hashed.children, 'hash'), expected);
    done();
  });
}
