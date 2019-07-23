import _ from "lodash";
import { Loader } from "./options";
import { IBlock, IPacked } from "./transform/GrowingPacker";

export const useLoader = async <T>(loader: Loader<T>) => {
    const loaded: any = await loader();
    return (
        loaded.default as T ||
        loaded as T
    );
};

export const getBackgroundPosition = (packed: IPacked, block: IBlock) => {
    // see http://www.jingjingke.com/c/28134.html
    const values = [
        block.x / (packed.width - block.width),
        block.y / (packed.height - block.height),
    ];
    return values.map(toPercent).join(" ");
};

export const getBackgroundSize = (packed: IPacked, block: IBlock) => {
    // see http://www.jingjingke.com/c/28134.html
    const values = [
        packed.width / block.width,
        packed.height / block.height,
    ];
    return values.map(toPercent).join(" ");
};

const toPercent = (value: number) => `${Number((value * 100).toFixed(6))}%`;
