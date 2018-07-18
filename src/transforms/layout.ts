import { algorithms, PackingSmith } from "layout";
import { Transform } from "stream";
import { ITile } from "./tile";
import { through2obj } from "./utils";

export default (padding: number): Transform => {
    const smith = new PackingSmith(algorithms["binary-tree"], { sort: true });
    return through2obj(
        async (tile: ITile) => {
            smith.addItem({
                meta: tile,
                width: tile.width + padding,
                height: tile.height + padding,
            });
        },
        async function () {
            this.push(smith.export());
        },
    );
};
