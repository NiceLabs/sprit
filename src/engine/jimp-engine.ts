import Jimp from 'jimp';
import { EncodedImage, Engine } from '../types';

const engine: Engine = {
  async create(tiles, options) {
    const canvas = new Jimp(options.width, options.height);
    for (const tile of tiles) {
      const soruce = await Jimp.read(tile.contents);
      const x = tile.x + tile.offset;
      const y = tile.y + tile.offset;
      canvas.composite(soruce, x, y);
    }
    return toBuffer(canvas, options.format);
  },
  async scale(tile, ratio) {
    const canvas = await Jimp.read(tile.contents);
    const scaled = canvas.scale(ratio);
    return toBuffer(scaled);
  },
};

const toBuffer = async (
  canvas: Jimp,
  format = 'png',
): Promise<EncodedImage> => ({
  contents: await canvas.getBufferAsync(getMIME(format)),

  format,

  width: canvas.bitmap.width,
  height: canvas.bitmap.height,
});

const getMIME = (format: string) => {
  if (format === 'png') {
    return Jimp.MIME_PNG;
  }
  return Jimp.MIME_JPEG;
};

export default engine;
