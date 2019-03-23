<template>
  <div>
    <!-- <div v-for="block in blockchain" v-bind:key="block.index"> -->
      <b-container class="bv-example-row">
        <b-card bg-variant="dark" text-variant="white" class="text-left">
          <b-input-group prepend="DATA" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              v-model="data"
              name="data"
              type="text"
              v-on:input="textChange(block)"
              placeholder=""
            />
          </b-input-group>
          <div class="mt-2">Previous Hash: {{ block.previousHash }}</div>
          <b-card-text class="text-left">
            Hash:
            <span class="bg-secondary text-light">{{ block.hash }}</span>
          </b-card-text>
          <h1>
            <div v-if="block.index == 0">Genesis Block</div>
            <div v-else>Block #{{ block.index }}</div>
          </h1>
          <b-row>
            <b-col
              >on <span>{{ block.timestamp }}</span></b-col
            >
            <b-col
              >nonce <span>{{ block.nonce }}</span></b-col
            >
            <b-col><b-button>Revalidate</b-button></b-col>
          </b-row>
        </b-card>
      </b-container>
      <br /><br />
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: { index: Number, block: Object },
  name: "Block",
  data(){
    return {
      blockdata: ""
    }
  },
  methods: {
    textChange() {
      const payload = {
        time: new Date.now(),
        blockdata: this.blockdata,
        index: this.index
      };
      this.$store.commit("recalculateBlock", payload);
    },
    isValidBlock(block){
      return this.$store.getters.isValidBlock(block)
    }
  },
  computed: {
    data: {
      get() {
        return this.$store.getters.getBlockDataByIndex(this.index);
      },
      set(value) {
        let payload = { index: this.index, newData: value };
        this.$store.dispatch("reCalculateBlock", payload);
      }
    },
    blocks() {
      return this.$store.getters.getBlock;
    },
    blockchain() {
      return this.$store.state.blockchain;
    }
  }
};
</script>

<style></style>
