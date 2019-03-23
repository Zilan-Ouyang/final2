import Vue from "vue";
import Vuex from "vuex";
import Crypto from "../services/cryptoFuncs.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    blockchain: [
      {
        index: 0,
        hash:
          "8e14c9cd77c9e2b9b877773dd1aba8913189c33e9610371ccdacbf7b21dc7d9e",
        previousHash: "0",
        timestamp: "Sat Mar 16 2019 14:29:55 GMT-0400 (Eastern Daylight Time)",
        data: "Welcome to Blockchain Demo 2.0!",
        nonce: "6004"
      }
    ],
    difficulty: 3
  },
  mutations: {
    // change(state, data) {
    //   state.blockchain[0].data = data;
    // },
    reset_Block(state) {
      state.blockchain = [
        {
          index: 0,
          hash:
            "8e14c9cd77c9e2b9b877773dd1aba8913189c33e9610371ccdacbf7b21dc7d9e",
          previousHash: "0",
          timestamp:
            "Sat Mar 16 2019 14:29:55 GMT-0400 (Eastern Daylight Time)",
          data: "Welcome to Blockchain Demo 2.0!",
          nonce: "6004"
        }
      ];
    },
    recalculateBlock(state, payload) {
      let modifyBlock = state.blockchain[payload.index];
      modifyBlock["data"] = payload.blockdata;

      let newHash = Crypto.hashBlock(modifyBlock);
      state.blockchain[payload.index]["hash"] = newHash;
    },
    setDifficulty(state, payload) {
      state.difficulty = payload;
    }
  },
  getters: {
    getBlock(state) {
      for (let i = 0; i < state.blockchain.length; i++) {
        return {
          hash: state.blockchain[i].hash,
          previousHash: state.blockchain[i].previousHash,
          data: state.blockchain[i].data,
          timestamp: state.blockchain[i].timestamp,
          nonce: state.blockchain[i].nonce
        };
      }
    },
    getBlockDataByIndex: state => index => {
      return state.blockchain[index].data;
    },
    blockchain: state => state.blockchain
  }
});
