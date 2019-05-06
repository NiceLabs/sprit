import { LayoutExported, LayoutItem } from "layout";
import _ from "lodash";
import { Transform } from "stream";
import through2 from "through2";
import { callbackify } from "util";
import { IOptions, Loader } from "./options";

type TransformHandler = (this: Transform, chunk: any) => Promise<any>;
type FlushCallback = (this: Transform) => Promise<void>;

export const through2obj = (transform?: TransformHandler, flush?: FlushCallback) => through2.obj(
    function (chunk, enc, callback) {
        if (transform === undefined) {
            callback();
            return;
        }
        callbackify<any, any>(transform.bind(this))(chunk, callback);
    },
    function (callback) {
        if (flush === undefined) {
            callback();
            return;
        }
        callbackify(flush.bind(this) as FlushCallback)(callback);
    },
);

export const useLoader = async <T>(loader: Loader<T>) => {
    const loaded: any = await loader();
    return (
        loaded.default as T ||
        loaded as T
    );
};

export const getBackgroundPosition = (exported: LayoutExported, item: LayoutItem) => {
    // see http://www.jingjingke.com/c/28134.html
    const values = [
        item.x / (exported.width - item.width),
        item.y / (exported.height - item.height),
    ];
    return values.map(toPercent).join(" ");
};

export const getBackgroundSize = (exported: LayoutExported, item: LayoutItem) => {
    // see http://www.jingjingke.com/c/28134.html
    const values = [
        exported.width / item.width,
        exported.height / item.height,
    ];
    return values.map(toPercent).join(" ");
};

const toPercent = (value: number) => `${Number((value * 100).toFixed(6))}%`;
