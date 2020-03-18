declare module "css.escape" {
    function escape(input: string): string;
    export = escape;
}

declare module "bin-pack" {
    function pack<T>(blocks: pack.Item<T>[], options: pack.Options): pack.Result

    namespace pack{
        interface Item<T> {
            width: number
            height: number

            meta?: T

            x?: number
            y?: number
        }

        interface Result {
            width: number
            height: number
        }

        interface Packed<T> extends Result {
            items: Item<T>[]
        }

        interface Options {
            inPlace: boolean
        }
    }

    export = pack;
}
