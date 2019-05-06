import { LayoutExported } from "layout";
import _ from "lodash";
import { getEngine } from "../engine";
import { IOptions } from "../options";
import { IEncodedImage } from "../types";
import { through2obj } from "../utils";

export interface ISpriteExported extends LayoutExported {
    sprite: Pick<IEncodedImage, "contents" | "type">;
}

export default (renderer: IOptions["renderer"], layout: IOptions["layout"]) => through2obj(
    async (exported: LayoutExported) => {
        const engine = await getEngine(renderer.engine);
        const tiles = _.map(exported.items, ({ x, y, meta }) => ({
            x,
            y,
            offset: layout.padding,
            width: meta.width,
            height: meta.height,
            contents: meta.contents,
        }));
        const sprite = _.pick(
            await engine.create(tiles, _.merge(renderer.options || {}, {
                width: exported.width,
                height: exported.height,
            })),
            ["type", "contents"],
        );
        return _.merge({ sprite }, exported);
    },
);
