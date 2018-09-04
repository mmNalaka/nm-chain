const Blockchain = require('../block-chain');
const Block = require('../block');

describe('Blockchain', ()=> {

    let bc;

    beforeEach(() => {
        bc = new Blockchain();
    }); 

    it('start with the genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesisBlock());
    });
});