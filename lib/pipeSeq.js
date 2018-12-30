function pipeSeq (sequencer, ...args) {
    return {
        pipeline: function (pipe) {
            this.pipe = pipe;
            return this;
        },
        invoke: function () {
            return sequencer.bind(this, ...args);
        }
    };
}

module.exports = pipeSeq;
