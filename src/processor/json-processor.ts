import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";
import { basename, extname } from "path";

const processor: IProcessor = {
    extension: "json",
    async handler(layout, options) {
        const naming = options.naming || ((name: string) => basename(name, extname(name)));
        const data = {
            width: layout.width,
            height: layout.height,
            blocks: _.map(layout.items, (item) => ({
                name: naming(item.meta.fileName),
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
                backgroundPosition: getBackgroundPosition(layout, item),
                backgroundSize: getBackgroundSize(layout, item),
            })),
        };
        return JSON.stringify(data, null, 2);
    },
};

export default processor;
