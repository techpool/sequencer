const generator = require('../../lib/generator');
const pipeSeq = require('../../lib/pipeSeq');
const uuidUtil = require('../../utils/uuid');
const {
    accumulator,
    isEven
} = require('../../lib/pipelines');
const {
    factorialSeq,
    fibonacciSeq,
    partialSumSeq,
    primeSeq,
    rangeSeq
} = require('../../lib/sequencer');

const sequences = [];

function createNewSequence (sequenceType, pipeLineType, sequenceArgs) {
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

    let generatorObj;
    switch (pipeLineType) {
        case 'ACCUMULATOR':
            generatorObj = generator(pipeSeq.apply(this, [sequencer, ...sequenceArgs])
                .pipeline(accumulator)
                .invoke());
            break;
        case 'IS_EVEN':
            generatorObj = generator(pipeSeq.apply(this, [sequencer, ...sequenceArgs])
                .pipeline(isEven)
                .invoke());
            break;
        default:
            generatorObj = generator(sequencer.bind(this, ...sequenceArgs));
    }

    const newSequencer = {
        type: sequenceType,
        generatorObj: generatorObj,
        uuid: newUuid,
        pipeLineType
    };
    sequences.push(newSequencer);
    return newSequencer;
}

function getNextSequence (uuid) {
    const sequencer = sequences.find(eachSequence => eachSequence.uuid === uuid);
    return sequencer.generatorObj.next();
}

function getSequences () {
    return sequences;
}

module.exports = {
    createNewSequence,
    getNextSequence,
    getSequences
};
