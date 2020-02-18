import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { ITile } from "./1-tile";
import { through2obj } from "./utils";

export default (renderer: IOptions["renderer"]) => through2obj<ITile>(
    async (tile): Promise<ITile> => {
        const ratio = getScale(renderer.scale, tile);
        if (ratio === 1) { return tile; }
        const engine = await getEngine(renderer.engine);
        const scaled = await engine.scale(tile, ratio);
        return _.assign(tile, _.pick(scaled, ["width", "height", "contents"]));
    },
);

const getScale = (scale: IOptions["renderer"]["scale"], tile: ITile): number => {
    if (typeof scale === "function") {
        return Math.max(scale(tile), 1);
    }
    return scale.maximum / Math.max(tile.width, tile.height);
};
