const sequencerService = require('../../../services/sequencer');

function getSequences () {
    return sequencerService.getSequences();
}

module.exports = {
    getSequences
};
