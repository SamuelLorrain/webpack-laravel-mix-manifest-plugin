class GenerateMixManifest {
    constructor(obj) {
        this.inputs = obj.inputs;
        this.trim = obj.trimFromInput || '';
        this.manifestFile = obj.manifest || 'mix-manifest.json';
        this.glob = promisify(glob);
    }
    getFiles() {
        if (!this.inputs) {
            throw new Error('GenerateMixManifest: must have a inputs key in his object parameter');
        }
        if (typeof this.inputs !== 'string' && !Array.isArray(this.inputs)) {
            throw new Error('GenerateMixManifest: inputs key must be a string or an array of strings');
        }
        if (typeof this.inputs === 'string') {
            this.inputs = [this.inputs];
        }
        return new Promise(async (resolve,reject) => {
            let files = [];
            for (const i of this.inputs) {
                try {
                    let newFiles = await this.glob(i)
                    files.push(...newFiles);
                } catch (e) {
                    reject(e);
                }
            }
            resolve(files);
        })
    }

    generateFileHash(filePath) {
        return new Promise((resolve,reject) => {
            const hash = crypto.createHash('sha1');
            const rs = fs.createReadStream(filePath);
            rs.on('error', reject);
            rs.on('data', chunk => hash.update(chunk));
            rs.on('end', () => resolve(hash.digest('hex')));
        })
    }

    generateMixJson(fileList) {
        return new Promise(async (resolve, reject) => {
            let mixFile = {}
            for(const i of fileList) {
                const hash = await this.generateFileHash(i);
                const f = i.replace(this.trim, '');
                mixFile[f] = f + '?id=' + hash;
            }
            resolve(mixFile);
        });
    }

    apply(compiler) {
        compiler.hooks.done.tap(
            'GenerateMixManifest',
            async (stats) => {
                const files  = await this.getFiles();
                const mixFile = await this.generateMixJson(files);
                fs.writeFile(
                    this.manifestFile,
                    JSON.stringify(mixFile, null, 2),
                    { flag: 'w+'},
                    (err) => {
                        if(err) {
                            console.log(err);
                        }
                    }
                );
            }
        )
    }
}
