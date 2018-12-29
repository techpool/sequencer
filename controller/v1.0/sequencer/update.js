const sequencerService = require('../../../services/sequencer');

function getNextSequence (uuid) {
    return sequencerService.getNextSequence(uuid);
}

module.exports = {
    getNextSequence
};
