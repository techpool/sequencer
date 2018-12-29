const
    express = require('express');

const sequencer = require('../../../../controller/v1.0/sequencer');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { sequencerType, pipeLineType } = req.body;
    try {
        sequencer.initializeSequence(sequencerType, pipeLineType);
        res.json({
            'status': 'SUCCESS',
            'data': {
                sequencerType,
                pipeLineType
            }
        });
        return;
    } catch (e) {
        res.status(500).json({
            'status': 'ERROR',
            'data': e
        });
    }
});

module.exports = router;
