import _ from "lodash";
import { Transform } from "stream";
import through2 from "through2";
import { callbackify } from "util";

type TransformHandler = (this: Transform, chunk: any, encoding: string) => Promise<any>;
type FlushCallback = (this: Transform) => Promise<void>;

export const through2obj = (transform?: TransformHandler, flush?: FlushCallback) => through2.obj(
    function (chunk, encoding, callback) {
        if (transform === undefined) {
            callback();
            return;
        }
        callbackify<any, any, string>(transform.bind(this))(chunk, encoding, callback);
    },
    function (callback) {
        if (flush === undefined) {
            callback();
            return;
        }
        callbackify(flush.bind(this) as FlushCallback)(callback);
    },
);
