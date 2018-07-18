import { Transform } from "stream";
import { IOptions } from "../options";
import { ISpriteExported } from "./sprite";
import { through2obj } from "./utils";

export interface IProcessExported {
    contents: Buffer;
    extension: string;
    sprite: ISpriteExported["sprite"];
}

export default (output: IOptions["output"]): Transform => through2obj(
    async function (layout: ISpriteExported) {
        const processor = await output.Processor();
        const contents = await processor.handler(layout);
        this.push({
            contents: Buffer.from(contents, "utf-8"),
            extension: processor.extension(),
            sprite: layout.sprite,
        });
    },
);
