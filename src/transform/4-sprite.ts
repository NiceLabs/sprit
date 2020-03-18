import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { ISpriteExported, ITile } from "../types";
import { Packed } from "bin-pack";
import { through2obj } from "./utils";

export default (renderer: IOptions["renderer"], layout: IOptions["layout"]) => through2obj<Packed<ITile>, ISpriteExported>(async (packed) => {
    const engine = await getEngine(renderer.engine);
    const tiles = _.map(packed.items, ({ x, y, meta }): ITile => ({
        x, y,
        offset: layout.padding,
        width: meta.width,
        height: meta.height,
        contents: meta.contents,
        fileName: meta.fileName,
        fileType: meta.fileType,
    }));
    const sprite = await engine.create(tiles, _.merge(renderer.options || {}, {
        width: packed.width,
        height: packed.height,
    }));
    return _.merge(
        { sprite: _.pick(sprite, ["type", "contents"]) },
        packed,
    );
});
