import crypto from 'crypto';
import { Block, hashPattern } from './block';
import { withAmountOf } from './blockchain.spec';

describe('Block test suite', () => {
  it('should be able to instantiate', () => {
    expect(() => {
      const block = new Block();
      expect(block).toBeInstanceOf(Block);
    }).not.toThrow();
  });

  it('should retain given arguments', () => {
    const timestamp = Date.now();
    const payload = withAmountOf(0);
    const previousHash = 'xxxx-xxx';
    const block = new Block(timestamp, payload, previousHash);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.payload).toEqual(payload);
    expect(block.previousHash).toEqual(previousHash);
  });

  it('should be able to calculate the correct hash', () => {
    const timestamp = Date.now();
    const payload = withAmountOf(0);
    const previousHash = 'xxxx-xxx';
    const nonce = 0;
    const block = new Block(timestamp, payload, previousHash);
    const hash = crypto
      .createHash('sha256')
      .update(hashPattern(timestamp, payload, previousHash, nonce))
      .digest('hex');
    expect(block.hash).toEqual(hash);
  });

  it('should create a unique hash per block', () => {
    const block0 = new Block(Date.now(), withAmountOf(0));
    const block1 = new Block(Date.now(), withAmountOf(10));
    expect(block0.hash).not.toEqual(block1.hash);
  });

  it('should be able to mine a new block with a difficulty', () => {
    const block = new Block();
    const difficulty = 2;
    const prefix = Array(difficulty + 1).join('0');
    block.mineBlock(difficulty);
    expect(block.hash.substring(0, difficulty)).toEqual(prefix);
  });
});
