const express = require('express');
const logger = require('morgan');

const router = express.Router();

router.use(logger('dev'));

module.exports = router;
