import { imageSize } from 'image-size';
import { Transform } from 'stream';
import File from 'vinyl';
import { ITile } from '../types';
import { through2obj } from './utils';

export default (): Transform =>
  through2obj<File, ITile>(async (file) => {
    const contents = file.contents as Buffer;
    const info = imageSize(contents);
    return {
      fileName: file.relative,
      fileType: info.type,

      contents,

      width: info.width,
      height: info.height,
    };
  });
