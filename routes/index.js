const express = require('express');
const router = express.Router();

const versions = require('require-all')({
    dirname: __dirname,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true
});

for (const eachVersion in versions) {
    if (eachVersion === 'index') {
        continue;
    }
    if (versions.hasOwnProperty(eachVersion)) {
        const basePath = eachVersion;
        router.use(`/${basePath}`, versions[eachVersion].index);
    }
}

module.exports = router;
