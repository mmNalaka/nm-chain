const Block = require('../block')

describe('Block', () => {

    let data, lastBlock, newBlock;
    
    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesisBlock();
        newBlock = Block.mineBlock(lastBlock, data);
    })

    it('sets the `data` to match the input', ()=> {
        // test code
        expect(newBlock.data).toEqual(data)
    });

    it('sets the `hastHash` to match the hash of the last block', ()=> {
        // test code
        expect(newBlock.previousHash).toEqual(lastBlock.hash)
    });
})