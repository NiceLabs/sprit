import escape from "css.escape";
import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";
import { basename } from "path";

const processor: IProcessor = {
    extension: "css",
    async handler(layout, options) {
        const prefix = options.prefix || ".";
        const naming = options.naming || basename;
        const rules = _.map(layout.blocks, (item) => [
            `${prefix + escape(naming(item.meta.fileName))} {`,
            `\tbackground-position: ${getBackgroundPosition(layout, item)};`,
            `\tbackground-size: ${getBackgroundSize(layout, item)};`,
            `\twidth: ${item.width}px;`,
            `\theight: ${item.height}px;`,
            "}",
        ]);
        return rules
            .map((item) => item.join("\n"))
            .join("\n\n");
    },
};

export default processor;
