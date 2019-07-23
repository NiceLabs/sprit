import _ from "lodash";

interface INode {
    x: number;
    y: number;
    width: number;
    height: number;

    used?: boolean;
    down?: INode;
    right?: INode;
}

export interface IBlock {
    width: number;
    height: number;
    [name: string]: any;
}

export interface IBlockWithPosition extends IBlock {
    x: number;
    y: number;
}

export interface IPacked {
    width: number;
    height: number;
    blocks: IBlockWithPosition[];
}

export class GrowingPacker {
    public static pack(blocks: IBlock[]): IPacked {
        const packer = new GrowingPacker();
        const newBlocks = packer.fit(blocks);
        return {
            width: newBlocks.reduce((size, { x, width }) => Math.max(size, x + width), 0),
            height: newBlocks.reduce((size, { y, height }) => Math.max(size, y + height), 0),
            blocks: newBlocks,
        };
    }

    public static smallestPack(blocks: IBlock[]): IPacked {
        type Compareable = (a: IBlock, b: IBlock) => number;
        const based: Record<string, Compareable> = {
            width: (a, b) => b.width - a.width,
            height: (a, b) => b.height - a.height,
            area: (a, b) => (b.height * b.width) - (a.height * a.width),
            max: (a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height),
            min: (a, b) => Math.min(b.width, b.height) - Math.min(a.width, a.height),
        };
        const makeSort = (...criterias: Compareable[]): Compareable => (a, b) => {
            for (const criteria of criterias) {
                const difference = criteria(a, b);
                if (difference !== 0) {
                    return difference;
                }
            }
            return 0;
        };
        const methods = [
            // hegiht first
            makeSort(based.height, based.width),
            // width first
            makeSort(based.width, based.height),
            // area first
            makeSort(based.area, based.height, based.width),
            // maxside
            makeSort(based.max, based.min, based.height, based.width),
        ];
        const packeds = methods.map((method) => {
            const clonedBlocks = Array.from(blocks);
            clonedBlocks.sort(method);
            return GrowingPacker.pack(clonedBlocks);
        });
        packeds.sort((a, b) => (a.height * a.width) - (b.height * b.width));
        return packeds[0];
    }

    private root: INode;

    public fit(blocks: IBlock[]): IBlockWithPosition[] {
        this.root = {
            x: 0,
            y: 0,
            width: blocks.length ? blocks[0].width : 0,
            height: blocks.length ? blocks[0].height : 0,
        };

        const newBlocks: IBlockWithPosition[] = [];
        for (const block of blocks) {
            const node = this.findNode(this.root, block.width, block.height);
            const fit = node
                ? this.splitNode(node, block.width, block.height)
                : this.growNode(block.width, block.height);
            const position = { x: fit.x, y: fit.y };
            newBlocks.push(Object.assign(position, block));
        }
        return newBlocks;
    }

    private findNode(root: INode, width: number, height: number): INode | null {
        if (root.used) {
            return this.findNode(root.right, width, height) || this.findNode(root.down, width, height);
        } else if (width <= root.width && height <= root.height) {
            return root;
        }
        return null;
    }

    private splitNode(node: INode, width: number, height: number): INode | null {
        node.used = true;
        node.down = {
            x: node.x,
            y: node.y + height,
            width: node.width,
            height: node.height - height,
        };
        node.right = {
            x: node.x + width,
            y: node.y,
            width: node.width - width,
            height,
        };
        return node;
    }

    private growNode(width: number, height: number): INode | null {
        const canGrowDown = width <= this.root.width;
        const canGrowRight = height <= this.root.height;
        // attempt to keep square-ish by growing right when height is much greater than width
        const shouldGrowRight = canGrowRight && (this.root.height >= this.root.width + width);
        // attempt to keep square-ish by growing down  when width  is much greater than height
        const shouldGrowDown = canGrowDown && (this.root.width >= this.root.height + height);
        if (shouldGrowRight || canGrowRight) {
            return this.growRight(width, height);
        }
        if (shouldGrowDown || canGrowDown) {
            return this.growDown(width, height);
        }
        // need to ensure sensible root starting size to avoid this happening
        return null;
    }

    private growRight(width: number, height: number): INode | null {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width + width,
            height: this.root.height,
            down: this.root,
            right: { x: this.root.width, y: 0, width, height: this.root.height },
        };
        const node = this.findNode(this.root, width, height);
        if (node) {
            return this.splitNode(node, width, height);
        }
        return null;
    }

    private growDown(width: number, height: number): INode | null {
        this.root = {
            used: true,
            x: 0,
            y: 0,
            width: this.root.width,
            height: this.root.height + height,
            down: { x: 0, y: this.root.height, width: this.root.width, height },
            right: this.root,
        };
        const node = this.findNode(this.root, width, height);
        if (node) {
            return this.splitNode(node, width, height);
        }
        return null;
    }
}
