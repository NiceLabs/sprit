import _ from "lodash";
import vfs from "vinyl-fs";
import { defaultOptions, IOptions } from "./options";

import tile from "./transform/1-tile";
import scale from "./transform/2-scale";
import layout from "./transform/3-layout";
import sprite from "./transform/4-sprite";
import processor from "./transform/5-processor";

export const src = (options: IOptions) => {
    options = _.defaultsDeep(options, defaultOptions);
    return vfs.src(options.src, { cwd: options.context })
        .pipe(tile())
        .pipe(scale(options.renderer))
        .pipe(layout(options.layout))
        .pipe(sprite(options.renderer, options.layout))
        .pipe(processor(options.output));
};

export const create = (options: IOptions) => src(options)
    .pipe(vfs.dest((file) => file.base));
