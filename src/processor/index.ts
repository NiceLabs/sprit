import { LayoutExported } from "layout";

export interface IProcessor {
    extension(): string;
    handler(layout: LayoutExported): Promise<string>;
}
