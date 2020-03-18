import { IOptions } from "../options";
import { ITile } from "./1-tile";
import pack from "bin-pack";
import { through2obj } from "./utils";

export default (layout: IOptions["layout"]) => {
    const items: pack.Item<ITile>[] = [];
    return through2obj<ITile>(
        async (tile) => {
            items.push({
                width: tile.width + layout.padding + layout.margin,
                height: tile.height + layout.padding + layout.margin,
                meta: tile,
            });
        },
        async function () {
            const { width, height } = pack(items, { inPlace: true });
            this.push({
                width,
                height,
                items
            });
        },
    );
};
