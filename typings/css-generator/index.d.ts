declare module "css-generator" {
    class Generator {
        addRule(selector: string, declarationList: any): void;
        getOutput(): string;
    }

    export function create(): Generator;
}
