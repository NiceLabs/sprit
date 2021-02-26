import { Canvas, createCanvas, loadImage } from 'canvas';
import { EncodedImage, Engine } from '../types';

const engine: Engine = {
  async create(tiles, options) {
    const canvas = createCanvas(options.width, options.height);
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = Boolean(options.imageSmoothingEnabled);
    for (const tile of tiles) {
      const source = await loadImage(tile.contents);
      const x = tile.x + tile.offset;
      const y = tile.y + tile.offset;
      context.drawImage(source, x, y);
    }
    return toBuffer(canvas, options.format);
  },
  async scale(tile, ratio) {
    const image = await loadImage(tile.contents);

    const width = image.naturalWidth * ratio;
    const height = image.naturalHeight * ratio;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    return toBuffer(canvas);
  },
};

const toBuffer = async (
  canvas: Canvas,
  format = 'png',
): Promise<EncodedImage> => {
  let contents: Buffer;
  if (format === 'png') {
    contents = canvas.toBuffer('image/png', {
      compressionLevel: 9,
      filters: canvas.PNG_FILTER_PAETH,
    });
  } else {
    contents = canvas.toBuffer('image/jpeg', {
      quality: 0.9,
      progressive: true,
    });
  }
  return {
    contents,

    format,

    width: canvas.width,
    height: canvas.height,
  };
};

export default engine;
