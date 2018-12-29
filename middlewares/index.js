const middlewareFiles = require('require-all')(__dirname);

const middlewares = [];
for (const eachMiddleware in middlewareFiles) {
    if (eachMiddleware === 'index') {
        continue;
    }
    if (middlewareFiles.hasOwnProperty(eachMiddleware)) {
        middlewares.push(middlewareFiles[eachMiddleware]);
    }
}

module.exports = middlewares;
