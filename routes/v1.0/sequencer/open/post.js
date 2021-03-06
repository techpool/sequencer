const
    express = require('express');

const sequencer = require('../../../../controller/v1.0/sequencer');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { sequencerType, pipeLineType, sequenceArgs } = req.body;
    try {
        const sequencerData = sequencer.create.initializeSequence(sequencerType, pipeLineType, sequenceArgs || []);
        res.json({
            'status': 'SUCCESS',
            'data': {
                ...sequencerData
            }
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
