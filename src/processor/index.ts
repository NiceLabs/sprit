import { Loader } from "../options";
import { IProcessor, ITile } from "../types";
import { useLoader } from "../utils";

const preset = {
    css: () => import("./css-processor"),
    scss: () => import("./scss-processor"),
    less: () => import("./less-processor"),
    json: () => import("./json-processor"),
};

export type IProcessorLoader = Loader<IProcessor> | keyof typeof preset;

export interface IProcessorOptions {
    prefix?: string;
    omitFields?: string | string[];
    naming?(tile: ITile): string;

    [name: string]: any;
}

export const getProcessor = async (loader: IProcessorLoader) => {
    if (typeof loader === "string") {
        return useLoader(preset[loader]);
    }
    return useLoader(loader);
};
