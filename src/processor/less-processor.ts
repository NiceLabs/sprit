import generator from 'css-generator';
import _ from 'lodash';
import { IProcessor } from '../types';
import { getBackgroundPosition, getBackgroundSize } from '../utils';

const processor: IProcessor = {
  extension: 'less',
  async handler(layout, options) {
    const prefix = options.prefix ?? '.sprite-';
    const naming = options.naming;
    const omitFields = _.map(_.castArray(options.omitFields), String);
    const rules = generator.create();
    _.forEach(layout.items, (block) => {
      const fields = {
        'background-position': getBackgroundPosition(layout, block),
        'background-size': getBackgroundSize(layout, block),
        'width': `${block.width}px`,
        'height': `${block.height}px`,
      };
      rules.addRule(
        `${prefix}${naming(block.item)}()`,
        _.omit(fields, omitFields),
      );
    });
    return rules.getOutput();
  },
};

export default processor;
