<template>
  <div class="home">
    <Header />
    <div class="container">
      <img src="@/assets/images/food.jpeg" alt="Food Image" />
      <h1 class="centered" @click="goToRecipes">See All Recipes Here</h1>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  methods: {
    goToRecipes() {
      this.$router.push({ path: "/recipes" });
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  align-content: center;
  justify-content: center;
  color: white;
}
img {
  margin-top: 40px;
  width: 1200px;
}
.centered {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  font-size: 42px;
  padding: 20px;
  border-radius: 20px;
  border: solid white 3px;
  cursor: pointer;
  color: white;
}
</style>