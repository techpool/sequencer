function pipeSeq (sequencer, ...args) {
    let pipeline;
    return {
        pipeline: function (pipe) {
            pipeline = pipe;
            return this;
        },
        invoke: function () {
            const boundFunction = sequencer.bind(this, ...args);
            boundFunction.pipe = pipeline;
            return boundFunction;
        }
    };
}

module.exports = pipeSeq;
