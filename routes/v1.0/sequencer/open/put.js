const
    express = require('express');

const sequencer = require('../../../../controller/v1.0/sequencer');

const router = express.Router();

router.put('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const sequenceData = sequencer.update.getNextSequence(uuid);
        res.json({
            'status': 'SUCCESS',
            'data': sequenceData
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
