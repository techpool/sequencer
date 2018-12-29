const express = require('express');
const router = express.Router();

const routes = require('require-all')({
    dirname: __dirname,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true
});

function authMiddleware (req, res, next) {
    if (!req.user) {
        res.json({
            status: 'UNAUTHENTICATED',
            data: null
        }).status(401);
    } else {
        next();
    }
}

for (const eachRoute in routes) {
    if (eachRoute === 'index') {
        continue;
    }
    if (routes.hasOwnProperty(eachRoute)) {
        const basePath = eachRoute;

        const openRoutes = routes[eachRoute]['open'];
        const authenticatedRoutes = routes[eachRoute]['authenticated'];

        for (const eachHttpMethod in openRoutes) {
            if (openRoutes.hasOwnProperty(eachHttpMethod)) {
                router.use(`/${basePath}`, openRoutes[eachHttpMethod]);
            }
        }

        for (const eachHttpMethod in authenticatedRoutes) {
            if (authenticatedRoutes.hasOwnProperty(eachHttpMethod)) {
                router.use(`/${basePath}`, authMiddleware, authenticatedRoutes[eachHttpMethod]);
            }
        }
    }
}

module.exports = router;
