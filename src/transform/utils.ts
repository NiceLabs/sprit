import { Transform } from 'stream';
import through2 from 'through2';
import { callbackify } from 'util';

type TransformHandler<T, R> = (
  this: Transform,
  chunk: T,
  encoding: string,
) => Promise<R>;
type FlushCallback = (this: Transform) => Promise<void>;

export const through2obj = <T = any, R = any>(
  transform?: TransformHandler<T, R>,
  flush?: FlushCallback,
): Transform =>
  through2.obj(
    function (chunk, encoding, callback) {
      if (transform === undefined) {
        callback();
      } else {
        callbackify<any, any, string>(transform.bind(this))(
          chunk,
          encoding,
          callback,
        );
      }
    },
    function (callback) {
      if (flush === undefined) {
        callback();
      } else {
        callbackify(flush.bind(this))(callback);
      }
    },
  );
