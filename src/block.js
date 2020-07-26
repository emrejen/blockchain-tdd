import crypto from 'crypto';

export const hashPattern = (timestamp, payload, previousHash, nonce) =>
  `${timestamp}-${JSON.stringify(payload)}-${previousHash}-${nonce}`;

export class Block {
  constructor(timestamp = Date.now(), payload = {}, previousHash = '') {
    this.timestamp = timestamp;
    this.payload = payload;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.hashMe();
  }

  hashMe() {
    const { timestamp, payload, previousHash, nonce } = this;
    return crypto
      .createHash('sha256')
      .update(hashPattern(timestamp, payload, previousHash, nonce))
      .digest('hex');
  }

  mineBlock(difficulty) {
    const prefix = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== prefix) {
      ++this.nonce;
      this.hash = this.hashMe();
    }
  }
}
