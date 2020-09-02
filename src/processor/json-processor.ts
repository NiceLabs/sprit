import _ from 'lodash';
import { Processor } from '../types';
import { getBackgroundPosition, getBackgroundSize } from '../utils';

const processor: Processor = {
  extension: 'json',
  async handler(layout, options) {
    const naming = options.naming;
    const metadata = options.metadata;
    const omitFields = _.map(_.castArray(options.omitFields), String);
    const data = {
      width: layout.width,
      height: layout.height,
      blocks: _.map(layout.items, (block) => {
        const fields = {
          name: naming(block.item),
          x: block.x,
          y: block.y,
          width: block.width,
          height: block.height,
          backgroundPosition: getBackgroundPosition(layout, block),
          backgroundSize: getBackgroundSize(layout, block),
          metadata: metadata?.(block.item),
        };
        return _.omit(fields, omitFields);
      }),
    };
    return JSON.stringify(data, null, 2);
  },
};

export default processor;
