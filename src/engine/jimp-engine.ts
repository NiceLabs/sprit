import Jimp from "jimp";
import _ from "lodash";
import { promisify } from "util";
import { IEncodedImage, IEngine, IEngineOptions, ITile } from ".";

class JimpEngine implements IEngine {
    public async create(tiles: ITile[], options: IEngineOptions): Promise<IEncodedImage> {
        const canvas = new Jimp(options.width, options.height);
        await Promise.all(_.map(tiles, async (tile) => {
            await canvas.composite(
                await Jimp.read(tile.contents),
                tile.x + tile.offset,
                tile.y + tile.offset,
            );
        }));
        return toBuffer(canvas);
    }

    public async scale(tile: ITile, ratio: number = 1): Promise<IEncodedImage> {
        const canvas = await Jimp.read(tile.contents);
        const scaled = await canvas.scale(ratio);
        return toBuffer(scaled);
    }
}

const toBuffer = async (canvas: Jimp): Promise<IEncodedImage> => ({
    contents: await canvas.getBufferAsync(Jimp.MIME_PNG),

    type: "png",

    width: canvas.bitmap.width,
    height: canvas.bitmap.height,
});

export default new JimpEngine();
