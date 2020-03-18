import type { PackResult } from "bin-pack";
import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { ISpriteExported, ITile } from "../types";
import { through2obj } from "./utils";

export default (renderer: IOptions["renderer"], layout: IOptions["layout"]) => (
    through2obj<PackResult<ITile>, ISpriteExported>(async (packed) => {
        const engine = await getEngine(renderer.engine);
        const tiles = _.map(packed.items, ({ x, y, item }): ITile => ({
            x, y,
            offset: layout.padding,
            width: item.width,
            height: item.height,
            contents: item.contents,
            fileName: item.fileName,
            fileType: item.fileType,
        }));
        const sprite = await engine.create(tiles, _.merge(renderer.options || {}, {
            width: packed.width,
            height: packed.height,
        }));
        return _.merge(
            { sprite: _.pick(sprite, ["type", "contents"]) },
            packed,
        );
    })
);
