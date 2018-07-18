import { LayoutExported } from "layout";
import _ from "lodash";
import { Transform } from "stream";
import { IOptions } from "../options";
import { through2obj } from "./utils";

export interface ISpriteExported extends LayoutExported {
    sprite: { type: string, contents: Buffer };
}

const renderSprite = async (
    renderer: IOptions["renderer"],
    offset: number,
    layout: LayoutExported,
) => {
    const tiles = _.map(
        layout.items,
        ({ x, y, meta }) => _.merge(
            { x, y, offset },
            _.pick(meta, ["width", "height", "contents"]),
        ),
    );
    const engine = await renderer.Engine();
    return engine.create(tiles, {
        width: layout.width,
        height: layout.height,
    });
};

export default (
    renderer: IOptions["renderer"],
    offset: number,
): Transform => through2obj(async (layout: LayoutExported) => {
    const sprite = await renderSprite(renderer, offset, layout);
    return _.merge({ sprite: _.pick(sprite, ["type", "contents"]) }, layout);
});
