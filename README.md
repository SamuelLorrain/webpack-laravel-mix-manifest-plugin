# Laravel Mix Manifest plugin

To goal of this plugin is to generate a mix-manifest.json
without using Laravel's mix.

It doesn't use webpack inner manifest files, but generate the hash
of the file manually after the webpack compiler.

So, it could be simpler to add to the mix-manifest.json, files
that don't belong in the webpack compilation, which can be
the case in heterogenous environements (typically when laravel's mix
is not enough).

# Installation

```bash
npm install webpack-laravel-mix-manifest-plugin --save-dev
```

# Usage

```js
const GenerateMixManifest = require('webpack-laravel-mix-manifest-plugin');

const mixManifestPluginConfig = {
    inputs: ['dist.js', 'dist-2.js'],  // a string or an array of files to be shown in the manifest
    trim: 'to trim',                   // optional, if you want to trim a part of filename in output
    manifestFile: 'manifest.json',     // optional, the name of the mix manifest file. By default 'mix-manifest.json'
}


// webpack config
{
    plugins: [
        new GenerateMixManifest(mixManifestPluginConfig),
    ]
}
```
