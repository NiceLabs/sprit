declare module "css-generator" {
    class Generator {
        addRule(selector: string, declarationList: object): void;
        getOutput(): string;
    }

    export function create(): Generator;
}

