import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";

const processor: IProcessor = {
    extension: "json",
    async handler(layout, options) {
        const naming = options.naming;
        const data = {
            width: layout.width,
            height: layout.height,
            blocks: _.map(layout.items, (item) => ({
                name: naming(item.meta),
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
