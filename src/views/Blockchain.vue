<template>
  <div class="home">
    <img alt="Vue logo" width="20%" src="../assets/logo.png" />
    <HelloWorld msg="Blockchain" />
    <br />
    <ResetBlockchain />
    <br />
    <Block v-for="(block, index) in blockchain"
      :block="block"
      :index="index"
      :key="index"
    />
    <br /><br />
    <AddBlock />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Block from "@/components/Block.vue";
import AddBlock from "@/components/AddBlock.vue";
import ResetBlockchain from "@/components/ResetBlockchain.vue";
export default {
  name: "home",
  computed: {
    blockchain() {
      return this.$store.state.blockchain;
    }
  },
  components: {
    HelloWorld,
    Block,
    AddBlock,
    ResetBlockchain
  }
};
</script>
