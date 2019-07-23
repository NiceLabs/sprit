import Jimp from "jimp";
import _ from "lodash";
import { IEncodedImage, IEngine } from "../types";

const engine: IEngine = {
    async create(tiles, options) {
        const canvas = new Jimp(options.width, options.height);
        for (const tile of tiles) {
            const soruce = await Jimp.read(tile.contents);
            const x = tile.x + tile.offset;
            const y = tile.y + tile.offset;
            await canvas.composite(soruce, x, y);
        }
        return toBuffer(canvas);
    },
    async scale(tile, ratio) {
        const canvas = await Jimp.read(tile.contents);
        const scaled = await canvas.scale(ratio);
        return toBuffer(scaled);
    },
};

const toBuffer = async (canvas: Jimp): Promise<IEncodedImage> => ({
    contents: await canvas.getBufferAsync(Jimp.MIME_PNG),

    type: "png",

    width: canvas.bitmap.width,
    height: canvas.bitmap.height,
});

export default engine;
