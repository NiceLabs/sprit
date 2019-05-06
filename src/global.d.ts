declare module "layout" {
    type algorithmNames = (
        "top-down" | "left-right" |
        "diagonal" | "alt-diagonal" |
        "binary-tree"
    )

    export const algorithms: Record<algorithmNames, Algorithm>

    export class Algorithm {
        sort(items: LayoutItem[]): LayoutItem[]

        placeItems(items: LayoutItem[]): LayoutItem[]
    }

    export class PackingSmith {
        constructor(algorithm: Algorithm, options?: Options)

        addItem(item: LayoutItem): void

        getItems(): LayoutItem[]

        normalizeCoordinates(): void

        getStats(): LayoutStats

        processItems(): LayoutItem[]

        exportItems(): LayoutItem[]

        export(): LayoutExported;
    }

    export interface LayoutItem {
        width: number
        height: number

        meta?: any

        x?: number
        y?: number
    }

    export interface LayoutStats {
        minX: number
        minY: number
        maxX: number
        maxY: number
    }

    export interface LayoutExported {
        width: number
        height: number

        items: LayoutItem[]
    }

    interface Options {
        sort?: boolean
    }
}

declare module "css.escape" {
    function escape(input: string): string;
    export = escape;
}
