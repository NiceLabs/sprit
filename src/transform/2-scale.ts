import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { through2obj } from "../utils";
import { ITile } from "./1-tile";

export default (renderer: IOptions["renderer"]) => through2obj(
    async (tile: ITile): Promise<ITile> => {
        const ratio = getScale(renderer.scale, tile);
        if (ratio === 1) { return tile; }
        const engine = await getEngine(renderer.engine);
        const scaled = await engine.scale(tile, ratio);
        return _.assign(tile, _.pick(scaled, ["width", "height", "contents"]));
    },
);

const getScale = (scale: IOptions["renderer"]["scale"], tile: ITile): number => {
    if (typeof scale === "function") {
        return scale(tile);
    }
    return scale.maximum / Math.max(tile.width, tile.height);
};
