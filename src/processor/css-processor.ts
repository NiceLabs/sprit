import escape from "css.escape";
import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";

const processor: IProcessor = {
    extension: "css",
    async handler(layout, options) {
        const prefix = options.prefix || "icon-";
        const naming = options.naming || _.identity;
        const items = _.map(layout.items, (item) => [
            `.${escape(prefix + naming(item.meta.fileName))} {`,
            `\tbackground-position: ${getBackgroundPosition(layout, item)};`,
            `\tbackground-size: ${getBackgroundSize(layout, item)};`,
            `\twidth: ${item.width}px;`,
            `\theight: ${item.height}px;`,
            "}",
        ]);
        return items
            .map((item) => item.join("\n"))
            .join("\n\n");
    },
};

export default processor;
