const sequencerService = require('../../../services/sequencer');

function initializeSequence (sequencerType, pipeLineType, sequencerArgs) {
    return sequencerService.createNewSequence(sequencerType, pipeLineType, sequencerArgs);
}

module.exports = {
    initializeSequence
};
