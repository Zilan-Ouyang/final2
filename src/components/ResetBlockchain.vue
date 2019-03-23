<template>
  <div>
    <p>
      <small>Current Difficulty Level : {{ currentDifficulty }}</small>
    </p>

    <b-container v-if="showDifficulty">
      <b-button-toolbar class="mx-auto" style="width:200px;">
        <b-button-group size="sm">
          <b-button v-on:click="incrementDifficulty">+</b-button>
          <b-button v-on:click="decrementDifficulty">-</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-container>
    <b-button @click.prevent="resetBlock" variant="outline-primary"
      >Reset</b-button
    >
  </div>
</template>

<script>
export default {
  name: "ResetBlockchain",
  data() {
    return {
      blockdata: "",
      difficulty: 3
    };
  },
  computed: {
    currentDifficulty() {
      return this.$store.state.difficulty;
    }
  },
  methods: {
    resetBlock(event) {
      this.$store.commit("reset_Block", event.target.value);
      this.$store.commit("setDifficulty", this.difficulty);
    },

    incrementDifficulty() {
      this.difficulty++;
    },
    decrementDifficulty() {
      this.difficulty--;
    }
  }
};
</script>

<style></style>
