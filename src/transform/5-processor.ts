import _ from 'lodash';
import path from 'path';
import { Transform } from 'stream';
import File from 'vinyl';
import { Options } from '../options';
import { getProcessor } from '../processor';
import { SpriteExported } from '../types';
import { through2obj } from './utils';

export default (context: string, output: Options['output']): Transform => {
  const makePath = (ext: string) =>
    path.join(context, path.format({ name: output.fileName, ext: `.${ext}` }));
  return through2obj<SpriteExported>(async function (layout) {
    const processor = await getProcessor(output.processor);
    this.push(
      makeFile(
        makePath(layout.sprite.format),
        layout.sprite.contents,
        layout.sprite.format,
      ),
    );
    this.push(
      makeFile(
        makePath(processor.extension),
        await processor.handler(
          layout,
          _.merge(output.options, {
            path: `${output.fileName}.${layout.sprite.format}`,
          }),
        ),
        processor.extension,
      ),
    );
  });
};

const makeFile = (
  target: string,
  contents: string | Buffer,
  extension: string,
) => {
  if (typeof contents === 'string') {
    contents = Buffer.from(contents, 'utf-8');
  }
  return new File({ path: target, contents, extension });
};
