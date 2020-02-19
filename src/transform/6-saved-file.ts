import File from "vinyl";
import { IProcessorExported } from "../types";
import { through2obj } from "./utils";

export default () => through2obj<IProcessorExported>(async function ({ metadata, sprite }) {
    this.push(new File({
        path: metadata.path,
        contents: metadata.contents,
    }));
    this.push(new File({
        path: sprite.path,
        contents: sprite.contents,
    }));
});
