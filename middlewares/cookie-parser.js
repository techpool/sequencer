const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());

module.exports = router;
