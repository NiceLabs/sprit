import _ from 'lodash';
import path from 'path';
import { Transform } from 'stream';
import File from 'vinyl';
import { IOptions } from '../options';
import { getProcessor } from '../processor';
import { ISpriteExported } from '../types';
import { through2obj } from './utils';

export default (context: string, output: IOptions['output']): Transform => {
  const makePath = (ext: string) =>
    path.join(
      context,
      path.format({
        name: output.fileName,
        ext: `.${ext}`,
      }),
    );
  return through2obj<ISpriteExported>(async function (layout) {
    const processor = await getProcessor(output.processor);
    this.push(
      makeFile(
        makePath(layout.sprite.type),
        layout.sprite.contents,
        layout.sprite.type,
      ),
    );
    this.push(
      makeFile(
        makePath(processor.extension),
        await processor.handler(
          layout,
          _.merge(output.options, {
            path: `${output.fileName}.${layout.sprite.type}`,
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
