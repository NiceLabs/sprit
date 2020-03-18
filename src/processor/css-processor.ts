import escape from "css.escape";
import _ from "lodash";
import { IProcessor } from "../types";
import { getBackgroundPosition, getBackgroundSize } from "../utils";
import { basename, extname } from "path";

const processor: IProcessor = {
    extension: "css",
    async handler(layout, options) {
        const prefix = options.prefix || ".";
        const naming = options.naming || ((name: string) => basename(name, extname(name)));
        const rules = _.map(layout.items, (item) => [
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
