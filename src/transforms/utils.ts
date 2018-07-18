import _ from "lodash";
import { Transform, TransformCallback } from "stream";
import through2 from "through2";
import { callbackify } from "util";

type TransformHandler = (this: Transform, chunk: any) => Promise<any> | Promise<void>;
type FlushCallback = (this: Transform) => Promise<void>;

export function through2obj(transform?: TransformHandler, flush?: FlushCallback): Transform {
    const transformHandler = function (this: Transform, chunk: any, enc: string, callback: TransformCallback) {
        const binded: TransformHandler = _.bind(transform, this);
        callbackify(binded)(chunk, callback);
    };
    const flushCallback = function (this: Transform, callback: () => void) {
        const binded: FlushCallback = _.bind(flush, this);
        callbackify(binded)(callback);
    };
    return through2.obj(
        _.isFunction(transform) ? transformHandler : undefined,
        _.isFunction(flush) ? flushCallback : undefined,
    );
}
