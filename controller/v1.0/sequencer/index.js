module.exports = require('require-all')({
    dirname: __dirname,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true
});
