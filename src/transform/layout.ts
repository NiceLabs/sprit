import { algorithms, PackingSmith } from "layout";
import { IOptions } from "../options";
import { through2obj } from "../utils";
import { ITile } from "./tile";

export default (layout: IOptions["layout"]) => {
    const smith = new PackingSmith(algorithms["binary-tree"], { sort: true });
    return through2obj(
        async (tile: ITile) => {
            smith.addItem({
                meta: tile,
                width: tile.width + layout.padding + layout.margin,
                height: tile.height + layout.padding + layout.margin,
            });
        },
        async function () {
            this.push(smith.export());
        },
    );
};
