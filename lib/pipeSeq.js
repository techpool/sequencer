function pipeSeq (sequencer, ...args) {
    return {
        pipeline: (pipe) => {
            this.pipe = pipe;
            return {
                invoke: () => {
                    return sequencer.bind(this, ...args);
                }
            };
        }
    };
}

module.exports = pipeSeq;
