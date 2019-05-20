import _ from "lodash";
import vfs from "vinyl-fs";
import { defaultsOptions, IOptions } from "./options";

import tile from "./transform/1-tile";
import scale from "./transform/2-scale";
import layout from "./transform/3-layout";
import sprite from "./transform/4-sprite";
import processor from "./transform/5-processor";
import savedFile from "./transform/6-saved-file";

export const src = (options: IOptions) => {
    options = _.defaultsDeep(options, defaultsOptions);
    return vfs.src(options.src)
        .pipe(tile())
        .pipe(scale(options.renderer))
        .pipe(layout(options.layout))
        .pipe(sprite(options.renderer, options.layout))
        .pipe(processor(options.output))
        .pipe(savedFile());
};

export const create = (options: IOptions) => src(options)
    .pipe(vfs.dest((file) => file.base));
