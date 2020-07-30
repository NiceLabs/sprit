import { imageSize } from 'image-size';
import { Transform } from 'stream';
import File from 'vinyl';
import { through2obj } from './utils';

export interface ITile {
  fileName: string;
  fileType: string;
  contents: Buffer;

  width: number;
  height: number;
}

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
