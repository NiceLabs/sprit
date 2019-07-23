import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { ISpriteExported } from "../types";
import { IPacked } from "./GrowingPacker";
import { through2obj } from "./utils";

export default (renderer: IOptions["renderer"], layout: IOptions["layout"]) => through2obj(
    async (packed: IPacked): Promise<ISpriteExported> => {
        const engine = await getEngine(renderer.engine);
        const tiles = _.map(packed.blocks, (block) => ({
            x: block.x,
            y: block.y,
            offset: layout.padding,
            width: block.tile.width,
            height: block.tile.height,
            contents: block.tile.contents,
        }));
        const sprite = await engine.create(tiles, _.merge(renderer.options || {}, {
            width: packed.width,
            height: packed.height,
        }));
        return _.merge(
            { sprite: _.pick(sprite, ["type", "contents"]) },
            packed,
        );
    },
);
