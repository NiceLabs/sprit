import path from "path";
import File from "vinyl";
import { through2obj } from "../utils";
import { IProcessExported } from "./processor";

export default (filename: string, targetPath: string) => through2obj(
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
