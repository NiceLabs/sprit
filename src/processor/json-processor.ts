import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";

const processor: IProcessor = {
    extension() {
        return "json";
    },
    async handler(layout) {
        const data = {
            width: layout.width,
            height: layout.height,
            items: _.map(layout.items, (item) => ({
                name: item.meta.fileName,
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
