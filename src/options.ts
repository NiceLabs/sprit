import _ from "lodash";
import { IEngine } from "./engine";
import { IProcessor } from "./processor";
import { ITile } from "./transforms/tile";

export interface IOptions {
    src?: string | string[];
    filename?: string;
    renderer?: {
        Engine?(): Promise<IEngine>;
        Scale?(tile: ITile): number
    };
    layout?: {
        padding?: number;
    };
    output?: {
        targetPath?: string;
        Processor?(): Promise<IProcessor>;
    };
}

export const defaultsOptions: IOptions = {
    filename: "sprite",
    renderer: {
        Engine: async () => (await import("./engine/jimp-engine")).default,
        Scale: _.constant(1),
    },
    layout: { padding: 0 },
    output: {
        Processor: async () => (await import("./processor/json-processor")).default,
        targetPath: process.cwd(),
    },
};
