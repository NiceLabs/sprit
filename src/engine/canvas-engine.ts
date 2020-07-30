import { Canvas, Image } from 'canvas';
import { IEncodedImage, IEngine } from '../types';

const engine: IEngine = {
  async create(tiles, options) {
    const canvas = new Canvas(options.width, options.height);
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = Boolean(options.imageSmoothingEnabled);
    for (const tile of tiles) {
      const source = await readImage(tile.contents);
      const x = tile.x + tile.offset;
      const y = tile.y + tile.offset;
      context.drawImage(source, x, y);
    }
    return toBuffer(canvas);
  },
  async scale(tile, ratio) {
    const image = await readImage(tile.contents);

    const width = image.naturalWidth * ratio;
    const height = image.naturalHeight * ratio;

    const canvas = new Canvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    return toBuffer(canvas);
  },
};

const readImage = (contents: Image['src']) =>
  new Promise<Image>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = contents;
  });

const toBuffer = async (canvas: Canvas): Promise<IEncodedImage> => ({
  contents: canvas.toBuffer(),

  type: 'png',

  width: canvas.width,
  height: canvas.height,
});

export default engine;
