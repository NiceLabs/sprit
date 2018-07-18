import _ from "lodash";
import { Transform } from "stream";
import vfs from "vinyl-fs";
import { defaultsOptions, IOptions } from "./options";

import transformLayout from "./transforms/layout";
import transformProcess from "./transforms/process";
import transformScale from "./transforms/scale";
import transformSprite from "./transforms/sprite";
import transformTile from "./transforms/tile";
import transformToVinyl from "./transforms/to-vinyl";

export const src = (options: IOptions): Transform => {
    options = _.defaultsDeep(options, defaultsOptions);
    return vfs.src(options.src)
        .pipe(transformTile())
        .pipe(transformScale(options.renderer.Engine, options.renderer.Scale))
        .pipe(transformLayout(options.layout.padding))
        .pipe(transformSprite(options.renderer, options.layout.padding))
        .pipe(transformProcess(options.output))
        .pipe(transformToVinyl(options.filename, options.output.targetPath));
};

export const create = (options: IOptions) => src(options)
    .pipe(vfs.dest((file) => file.base));
