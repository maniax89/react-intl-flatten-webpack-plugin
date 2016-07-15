import * as fs from 'fs';
import * as path from 'path';
import {sync as globSync} from 'glob';

function ReactIntlFlattenPlugin(pluginOptions) {
  this.pluginOptions = pluginOptions;
}

ReactIntlFlattenPlugin.prototype.apply = function (compiler) {
  let aggregatePattern = this.pluginOptions.aggregatePattern ||
                          '../../i18n/aggregate/*.json';
  let langOutputDir    = this.pluginOptions.langOutputDir ||
                          'i18n';

  compiler.plugin('emit', function (compilation, callback) {
    const AGGREGATE_PATTERN = path.resolve(__dirname, aggregatePattern);

    console.log('Retrieving aggregate files matching: ' + AGGREGATE_PATTERN);
    globSync(AGGREGATE_PATTERN)
      .forEach((filename) => {
        let descriptors = JSON.parse(fs.readFileSync(filename, 'utf8'));
        let basename    = path.basename(filename);
        let collection  = {};
        Object.keys(descriptors).forEach((id) => {
          collection[id] = descriptors[id]['defaultMessage'];
        });
        let flattenedTranslations = JSON.stringify(collection, null, 0);
        //add file to compilation
        compilation.assets[path.join(langOutputDir, basename)] = {
          source: function() {
            return flattenedTranslations;
          },
          size: function() {
            return flattenedTranslations.length;
          }
        };
      });
    console.log('Flattening translations JSON complete!');
    callback();
  });
};

module.exports = ReactIntlFlattenPlugin;
