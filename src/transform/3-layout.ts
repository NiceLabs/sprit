import { IOptions } from "../options";
import { ITile } from "./1-tile";
import { GrowingPacker, IBlock } from "./GrowingPacker";
import { through2obj } from "./utils";

export default (layout: IOptions["layout"]) => {
    const blocks: IBlock[] = [];
    return through2obj(
        async (tile: ITile) => {
            blocks.push({
                width: tile.width + layout.padding + layout.margin,
                height: tile.height + layout.padding + layout.margin,
                tile,
            });
        },
        async function () {
            this.push(GrowingPacker.smallestPack(blocks));
        },
    );
};
