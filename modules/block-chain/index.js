const Block = require('../block')

class Blockchain {
    constructor() {
        this.chain = [Block.genesisBlock()];
    }

    // This function adds a block to to the block chain
    addBlock(data) {
        const lastIndex = this.chain.length - 1;
        const lastBlock = this.chain[lastIndex];  

        // Create new block
        const block = Block.mineBlock(lastBlock, data);

        // add the newly created block to the chain
        this.chain.push(block);

        return block; 
    }
}


module.exports = Blockchain; 