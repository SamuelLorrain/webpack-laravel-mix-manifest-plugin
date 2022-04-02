# Mix manifest plugin

To goal of this plugin is to generate a mix-manifest.json
without using Laravel's mix.

It doesn't use webpack inner manifest files, but generate the hash
of the file manually after the webpack compiler.

So, it could be simpler to add to the mix-manifest.json, files
that don't belong in the webpack compilation, which can be
the case in heterogenous environements (typically when laravel's mix
is not enough).

# Usage

```js
var GenerateMixManifest = require('generate-mix-manifest');

mixManifestPluginConfig = {
    inputs: [],      // a string or an array of files to be shown in the manifest
    trim: 'to trim', // optional, if you want to trim a part of filename in output
    manifestFile: ,  // optional, the name of the mix manifest file. By default 'mix-manifest.json'
}


{
    plugins: [
        new GenerateMixManifest(mixManifestPluginConfig);
    ]
}
```
