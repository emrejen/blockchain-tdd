import { Block } from './block';

export class Blockchain {
  constructor() {
    this.blocks = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(Date.now(), {}, '');
  }

  addBlock(block) {
    const previous = this.getLastBlock();
    block.previousHash = previous.hash;
    block.hash = block.hashMe();
    this.blocks.push(block);
  }

  isValidChain() {
    for (let i = 1; i < this.blocks.length; ++i) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      if (currentBlock.previousHash !== previousBlock.hash) return false;
      if (currentBlock.hash !== currentBlock.hashMe()) return false;
    }
    return true;
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }
}
