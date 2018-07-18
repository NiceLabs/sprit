import { LayoutExported } from "layout";
import _ from "lodash";
import { IProcessor } from ".";

class JSONProcessor implements IProcessor {
    public extension(): string { return "json"; }

    public async handler(layout: LayoutExported): Promise<string> {
        const data = {
            width: layout.width,
            height: layout.height,
            items: _.map(layout.items, (item) => _.merge(
                { name: item.meta.name },
                _.pick(item, ["x", "y", "width", "height"]),
            )),
        };
        return JSON.stringify(data, null, 2);
    }
}

export default new JSONProcessor();
