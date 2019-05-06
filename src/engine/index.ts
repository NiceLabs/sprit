import { Loader } from "../options";
import { IEngine } from "../types";
import { useLoader } from "../utils";

const preset = {
    jimp: () => import("./jimp-engine"),
    canvas: () => import("./canvas-engine"),
};

export type IEngineLoader = Loader<IEngine> | keyof typeof preset;

export interface IEngineOptions {
    width: number;
    height: number;

    [key: string]: any;
}

export const getEngine = async (loader: IEngineLoader) => {
    if (typeof loader === "string") {
        return useLoader(preset[loader]);
    }
    return useLoader(loader);
};
