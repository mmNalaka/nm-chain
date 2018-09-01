const SHA256 = require("crypto-js/sha256");

class Block {

    constructor(index, timeStamp, data, previousHash, hash) {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    // Genesis block is the fist block of the chain
    static genesisBlock() {
        return new this(0, '2018-09-01', [], '', 'nma-chain-2018-gen-hash')
    }

    // this function creates a new block based on passed data
    static mineBlock(previousBlock, data) {
        const index = previousBlock.index + 1;
        const time =  Date.now();
        const lashHash = previousBlock.previousHash;
        const hash = this.generateHash(index, time, lashHash, data);

        return new this(index, time, lashHash, hash, data);
    }

    // Generates a new hash
    static generateHash(hashIndex, timeStamp, lastHash, data) {
        return SHA256(hashIndex, timeStamp, lastHash, JSON.stringify(data)).toString();
    }
}

module.exports = Block
