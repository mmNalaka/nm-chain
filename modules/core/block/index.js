const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timeStamp, data, previousHash, hash) {
    this.index = index
    this.timeStamp = timeStamp
    this.data = data
    this.previousHash = previousHash
    this.hash = hash
  }

  // Genesis block is the fist block of the chain
  static genesisBlock() {
    return new this(0, "2018-09-01", [], "", "nma-chain-2018-gen-hash")
  }

  // this function creates a new block based on passed data
  static mineBlock(previousBlock, data) {
    const index = previousBlock.index + 1
    const time = Date.now()
    const lastHash = previousBlock.hash
    const hash = this.generateHash(index, time, lastHash, data)

    return new this(index, time, data, lastHash, hash)
  }

  // Generates a new hash
  static generateHash(index, timeStamp, lastHash, data) {
    return SHA256(
      index + timeStamp + lastHash + JSON.stringify(data)
    ).toString()
  }

  static blockHash({ index, timeStamp, data, previousHash }) {
    return this.generateHash(index, timeStamp, previousHash, data)
  }
}

module.exports = Block
