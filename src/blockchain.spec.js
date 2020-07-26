import { Blockchain } from './blockchain';
import { Block } from './block';

export const withAmountOf = (amount = 10) => ({ amount });

describe('Blockchain test suite', () => {
  const VALID = true;
  const NOT_VALID = !VALID;
  const DIFFICULTY = 2;
  let clbCoin;
  beforeEach(() => (clbCoin = new Blockchain(DIFFICULTY)));

  it('should be able to instantiate', () => {
    expect(() => {
      const blockchain = new Blockchain();
      expect(blockchain).toBeInstanceOf(Blockchain);
    }).not.toThrow();
  });

  it('should have a single genesis block on creation', () => {
    expect(clbCoin.blocks.length).toEqual(1);
    expect(clbCoin.blocks[0]).toBeInstanceOf(Block);
  });

  it('should be able to add a new block', () => {
    const block = new Block(Date.now(), withAmountOf(), '');
    clbCoin.addBlock(block);
    expect(clbCoin.blocks.length).toEqual(2);
  });

  it('should be able  to get the last block', () => {
    const block = new Block(Date.now(), withAmountOf());
    clbCoin.addBlock(block);
    expect(clbCoin.getLastBlock()).toEqual(block);
  });

  it('each new block should point to the previous one', () => {
    const block1 = new Block('Date.now', withAmountOf());
    const block2 = new Block(Date.now(), withAmountOf());
    clbCoin.addBlock(block1);
    clbCoin.addBlock(block2);
    expect(clbCoin.getLastBlock().previousHash).toEqual(block1.hash);
  });

  it('should  be able to validate the integrity of the chain', () => {
    clbCoin.addBlock(new Block(Date.now(), withAmountOf(9)));
    clbCoin.addBlock(new Block(Date.now(), withAmountOf(1)));
    expect(clbCoin.isValidChain()).toBe(VALID);
  });

  it('should fail if blocks were tampered with', () => {
    const block1 = new Block('Date.now', withAmountOf());
    const block2 = new Block(Date.now(), withAmountOf());
    clbCoin.addBlock(block1);
    clbCoin.addBlock(block2);
    const last = clbCoin.getLastBlock();
    last.payload = withAmountOf(1000);
    clbCoin.blocks[clbCoin.blocks.length - 1] = last;
    expect(clbCoin.isValidChain()).toBe(NOT_VALID);
  });
});
