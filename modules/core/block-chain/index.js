const Block = require("../block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesisBlock()];
  }

  // This function adds a block to to the block chain
  addBlock(data) {
    
    const lastBlock = this.chain[this.chain.length - 1];

    // Create new block
    const block = Block.mineBlock(lastBlock, data);

    // add the newly created block to the chain
    this.chain.push(block);

    return block;
  }

  // Validate the chain
   isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const lastBlock = chain[i - 1];
      
      if (
        currentBlock.previousHash !== lastBlock.hash ||
        currentBlock.hash !== Block.blockHash(currentBlock)
      ) {
          return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <=this.chain.length) {
      console.log('Received chain is not longer than the current chain')
      return
    } else if (!this.isValidChain(newChain)) {
      console.log('New chain is not a valid chain')
      return
    }
    console.log(`Replaced the chain with the new chain which has length of ${newChain.length}`)
    this.chain = newChain
  }
}

module.exports = Blockchain
