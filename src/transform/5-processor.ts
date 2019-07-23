import _ from "lodash";
import path from "path";
import { IOptions } from "../options";
import { getProcessor } from "../processor";
import { ISpriteExported } from "../types";
import { through2obj } from "./utils";

export default (output: IOptions["output"]) => {
    const makePath = (ext: string) => path.format({
        base: output.targetPath,
        name: output.fileName,
        ext,
    });
    return through2obj(async function (layout: ISpriteExported) {
        const processor = await getProcessor(output.processor);
        this.push({
            sprite: makeFile(
                makePath(layout.sprite.type),
                layout.sprite.contents,
                layout.sprite.type,
            ),
            metadata: makeFile(
                makePath(processor.extension),
                await processor.handler(layout, _.merge(output.options, {
                    path: `${output.fileName}.${layout.sprite.type}`,
                })),
                processor.extension,
            ),
        });
    });
};

const makeFile = (target: string, contents: string | Buffer, extension: string) => {
    if (typeof contents === "string") {
        contents = Buffer.from(contents, "utf-8");
    }
    return { path: target, contents, extension };
};
