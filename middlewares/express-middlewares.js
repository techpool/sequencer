const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;
