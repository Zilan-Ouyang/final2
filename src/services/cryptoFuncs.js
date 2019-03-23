import { ethers } from "ethers";

export default class Crypto {
  hashBlock(bl) {
    let stringifiedBl = JSON.stringify(bl);
    let hexifiedBl = this.toHex(stringifiedBl);
    return ethers.utils.keccak256("0x" + hexifiedBl);
  }
  toHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }
  calculateNonce(bl) {
    let jsonBl = JSON.parse(JSON.stringify(bl));
    let difficulty = this.$store.state.difficulty;
    let nonce = 0;
    let hash = this.hashBlock(jsonBl);
    while (
      hash.substring(2, 2 + difficulty) !== Array(difficulty + 1).join("0")
    ) {
      nonce++;
      hash = this.hashBlock(jsonBl);
      jsonBl["nonce"] = nonce;
    }
    return nonce;
  }
  createBlock(previousHash, blockdata, index) {
    let aBlock = {
      timestamp: new Date(),
      data: blockdata,
      previousHash: previousHash,
      index: index
    };
    let nonce = this.calculateNonce(aBlock);
    aBlock["nonce"] = nonce;
    let hash = this.hashBlock(aBlock);
    aBlock["hash"] = hash;
    return aBlock;
  }

  verifyBlock(block) {
    var blockWithoutHash = {
      timestamp: block.timestamp,
      data: block.data,
      previousHash: block.previousHash,
      index: block.index,
      nonce: block.nonce
    };

    var hash = this.hashBlock(blockWithoutHash);
    return hash === block.hash;
  }
}
