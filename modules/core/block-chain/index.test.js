const Blockchain = require('../block-chain');
const Block = require('../block');

describe('Blockchain', () => {

    let bc1;
    let bc2;

    beforeEach(() => {
        bc1 = new Blockchain();
        bc2 = new Blockchain();
    }); 

    it('start with the genesis block', () => {
        expect(bc1.chain[0]).toEqual(Block.genesisBlock());
    });

    it('adds a new block', () => {
        const data = 'Foo bar'
        bc1.addBlock(data);

        expect(bc1.chain[bc1.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', ()=> {
        const data = 'foobar chain 1'
        bc2.addBlock(data);
        expect(bc1.isValidChain(bc2.chain)).toBe(true);
    })

    it('Invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'Corrupt data';
        expect(bc1.isValidChain(bc2.chain)).toBe(false);
    })

    it('Invalidates a chain with a corrupt block at any position', () => {
        bc2.addBlock('Foo 2');
        bc2.addBlock('Foo 3');
        bc2.chain[2].data = 'Foo not';
        expect(bc1.isValidChain(bc2.chain)).toBe(false);
    })

    it('Replacec the chain with a new valid chain', () => {
        bc2.addBlock('Foo 1')
        bc1.replaceChain(bc2.chain)
        expect(bc1.chain).toEqual(bc2.chain)
    })

    it('Does not replce the chin if the length is greater than the current chain', () => {
        bc1.addBlock('Foo')
        bc1.replaceChain(bc2.chain)
        expect(bc1.chain).not.toEqual(bc2.chain)
    })
});