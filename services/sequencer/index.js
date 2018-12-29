const generator = require('../../lib/generator');
const uuidUtil = require('../../utils/uuid');
const {
    factorialSeq,
    fibonacciSeq,
    partialSumSeq,
    primeSeq,
    rangeSeq
} = require('../../lib/sequencer');

const sequences = [];

function createNewSequence (sequenceType, pipelineType, sequenceArgs) {
    const newUuid = uuidUtil.generateUuid();
    let sequencer;
    switch (sequenceType) {
        case 'FACTORIAL':
            sequencer = factorialSeq;
            break;
        case 'FIBONACCI':
            sequencer = fibonacciSeq;
            break;
        case 'PARTIAL_SUM':
            sequencer = partialSumSeq;
            break;
        case 'PRIME':
            sequencer = primeSeq;
            break;
        case 'RANGE':
            sequencer = rangeSeq;
            break;
        default:
    }

    const generatorObj = generator(sequencer, ...sequenceArgs);
    const newSequencer = {
        type: sequenceType,
        generatorObj: generatorObj,
        uuid: newUuid
    };
    sequences.push(newSequencer);
    return newSequencer;
}

function getNextSequence (uuid) {
    const sequencer = sequences.find(eachSequence => eachSequence.uuid === uuid);
    return sequencer.generatorObj.next();
}

module.exports = {
    createNewSequence,
    getNextSequence
};
