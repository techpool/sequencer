const
    express = require('express');

const sequencer = require('../../../../controller/v1.0/sequencer');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const sequences = sequencer.read.getSequences();
        console.log(sequences);
        res.json({
            'status': 'SUCCESS',
            'data': sequences
        });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({
            'status': 'ERROR',
            'data': e
        });
    }
});

module.exports = router;
