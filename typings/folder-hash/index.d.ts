declare module "folder-hash" {
    export type Callback = (err: any, result: HashedFolder) => void;

    export function hashElement(name: string, callback: Callback): void;
    export function hashElement(name: string, options: Options, callback: Callback): void;
    export function hashElement(name: string, dir: string, options: Options, callback: Callback): void;
    export function hashElement(name: string, options?: Options): Promise<HashedFolder>;
    export function hashElement(name: string, dir: string, options?: Options): Promise<HashedFolder>;

    export interface FileFilter {
        exclude?: string[],
        include?: string[],
        matchBasename?: boolean,
        matchPath?: boolean,
        ignoreBasename?: boolean,
        ignoreRootName?: boolean
    }

    export interface Options {
        algo?: string,
        encoding?: "base64" | "hex" | "binary",
        files?: FileFilter,
        folders?: FileFilter
    }

    export interface HashedFolder {
        name: string;
        children?: Array<HashedFile | HashedFolder>;
    }

    export interface HashedFile {
        name: string;
        hash: string;
    }
}