import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { ISpriteExported, ITile } from "../types";
import { Packed } from "bin-pack";
import { through2obj } from "./utils";

export default (renderer: IOptions["renderer"], layout: IOptions["layout"]) => through2obj<Packed<ITile>, ISpriteExported>(async (packed) => {
    const engine = await getEngine(renderer.engine);
    const tiles = _.map(packed.items, (block) => ({
        x: block.x,
        y: block.y,
        offset: layout.padding,
        width: block.meta.width,
        height: block.meta.height,
        contents: block.meta.contents,
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
