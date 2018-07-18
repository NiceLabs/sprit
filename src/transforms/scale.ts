import _ from "lodash";
import { Transform } from "stream";
import { IOptions } from "../options";
import { ITile } from "./tile";
import { through2obj } from "./utils";

export default (
    Engine: IOptions["renderer"]["Engine"],
    scale: IOptions["renderer"]["Scale"],
): Transform => through2obj(async (tile: ITile): Promise<ITile> => {
    const ratio = scale(tile);
    if (ratio === 1) { return tile; }
    const engine = await Engine();
    const scaled = await engine.scale(tile, ratio);
    return _.assign(
        {},
        tile,
        _.pick(scaled, ["width", "height", "contents"]),
    );
});
