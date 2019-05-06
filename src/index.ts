import _ from "lodash";
import vfs from "vinyl-fs";
import { defaultsOptions, IOptions } from "./options";

import layout from "./transform/layout";
import processor from "./transform/processor";
import savedFile from "./transform/saved-file";
import scale from "./transform/scale";
import sprite from "./transform/sprite";
import tile from "./transform/tile";

export const src = (options: IOptions) => {
    options = _.defaultsDeep(options, defaultsOptions);
    return vfs.src(options.src)
        .pipe(tile())
        .pipe(scale(options.renderer))
        .pipe(layout(options.layout))
        .pipe(sprite(options.renderer, options.layout))
        .pipe(processor(options.output))
        .pipe(savedFile(options.filename, options.output.targetPath));
};

export const create = (options: IOptions) => src(options)
    .pipe(vfs.dest((file) => file.base));
