import path from "path";
import { Transform } from "stream";
import File from "vinyl";
import { IProcessExported } from "./process";
import { through2obj } from "./utils";

export default (filename: string, targetPath: string): Transform => through2obj(
    async function (chunk: IProcessExported) {
        this.push(new File({
            base: targetPath,
            path: path.join(targetPath, `${filename}.${chunk.extension}`),
            contents: chunk.contents,
        }));
        this.push(new File({
            base: targetPath,
            path: path.join(targetPath, `${filename}.${chunk.sprite.type}`),
            contents: chunk.sprite.contents,
        }));
    },
);
