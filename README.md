# react-intl-flatten-webpack-plugin

Small webpack plugin designed to take a set of json files that look like:

```json
{
  "translation-id" : {
    "defaultMessage" : "I am a message",
    "description"    : "I am a description that helps translators"
  }
}
```

and convert them to this:

```json
{
  "translation-id" : "I am a message"
}
```

Meant to be used in sequence with `react-intl-aggregate-webpack-plugin`.

## Installation

```sh
$ npm install react-intl-flatten-webpack-plugin
```

## Usage

In your webpack config file:

```javascript
var ReactIntlFlattenPlugin = require('react-intl-flatten-webpack-plugin');
var I18N_DIR               = './some/i18n/directory/';
var PUBLIC_DIR             = './some/public/directory/';
...
var config = {
  ...
  output: {
    path: PUBLIC_DIR
  },
  ...
  loaders: {
    ...
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json'
    }
  }
  ...
  plugins: [
    ...
    new ReactIntlFlattenPlugin({
      aggregatePattern: I18N_DIR + '*.json',
      langOutputDir: 'lang'
    })
  ]
}
...
module.exports = config;
```

## options

- **`aggregatePattern`**: The glob pattern used to retrieve the aggregate files for processing. Defaults to: `../../i18n/aggregate/*.json`

- **`langOutputDir`**: The target location where the plugin will output a `.json` file of the same basename corresponding to each aggregate file processed. This is a subdirectory of the output.path defined in your webpack config. For example, if `langOutputDir` is set to `i18n` and `output.path` is set to `/public/`, then the files will be output to `/public/i18n` Defaults to: `i18n`.

