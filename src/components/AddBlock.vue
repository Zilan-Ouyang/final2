<template>
  <div>
    <b-container class="bv-example-row">
      <b-card bg-variant="dark" text-variant="white" class="text-left">
        <b-input-group prepend="DATA" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input
            v-model="blockdata"
            name="data"
            type="text"
            placeholder="Enter the data"
          />
        </b-input-group>
        <br>
        <b-button @click.prevent="addBlock">Add Block</b-button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  name: "AddBlock",
  data() {
    return {
      blockdata: ""
    };
  },
  methods: {
    addBlock() {
      let previousHash = "";
      let index = 0;
      let blockchain = this.$store.state.blockchain;
      if (blockchain.length != 0) {
        let previousBlock = blockchain[blockchain.length - 1];
        previousHash = previousBlock.hash;
        index = previousBlock.index + 1;
      }

      let newBlock = this.createBlock(previousHash, this.blockdata, index);
      blockchain.push(newBlock);
    },
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
    },
    calculateNonce(bl) {
      let jsonBl = JSON.parse(JSON.stringify(bl));
      let difficulty = 3;
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
    },
    toHex(str) {
      var result = "";
      for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
      }
      return result;
    },
    hashBlock(bl) {
      let stringifiedBl = JSON.stringify(bl);
      let hexifiedBl = this.toHex(stringifiedBl);
      return ethers.utils.keccak256("0x" + hexifiedBl);
    }
  }
};
</script>

<style></style>
