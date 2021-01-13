<template>
  <div class="container">
    <h1>Update Recipe</h1>
    <b-button class="button" @click="goBack">Back</b-button>
  </div>
</template>

<script>
export default {
  name: "UpdateRecipe",
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace(`/recipes/${this.$route.params.id}`);
    },
  },
};
</script>

<style scoped>
</style>