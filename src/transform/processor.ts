import { IOptions } from "../options";
import { getProcessor } from "../processor";
import { through2obj } from "../utils";
import { ISpriteExported } from "./sprite";

export interface IProcessExported {
    contents: Buffer;
    extension: string;
    sprite: ISpriteExported["sprite"];
}

export default (output: IOptions["output"]) => through2obj(
    async function (layout: ISpriteExported) {
        const processor = await getProcessor(output.processor);
        const contents = await processor.handler(layout, output.options || {});
        this.push({
            contents: Buffer.from(contents, "utf-8"),
            extension: processor.extension(),
            sprite: layout.sprite,
        });
    },
);
