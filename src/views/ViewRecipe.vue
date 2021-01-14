<template>
  <div class="container">
    <h1>{{ getCurrentRecipe().title }}</h1>
    <img class="image" :src="getCurrentRecipe().image" />
    <b-list-group>
      <b-list-group-item
        ><b>Name:</b> {{ getCurrentRecipe().title }}</b-list-group-item
      >
      <b-list-group-item
        ><b>Time to prepare:</b>
        {{ getCurrentRecipe().time }}</b-list-group-item
      >
      <b-list-group-item
        ><b>Description:</b><br />
        {{ getCurrentRecipe().description }}</b-list-group-item
      >
    </b-list-group>
    <div class="btn-container">
      <b-icon
        class="icon-trash"
        icon="pencil-fill"
        @click="editRecipe"
      ></b-icon>
      <b-icon
        class="icon-edit"
        icon="trash-fill"
        @click="deleteCurrentRecipe"
      ></b-icon>
      <b-button class="button" @click="goBack">Back</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ViewRecipe",
  computed: mapGetters(["allRecipes"]),
  methods: {
    ...mapActions(["deleteRecipe"]),
    goBack() {
      this.$router.go(-1);
    },
    editRecipe() {
      this.$router.push({ path: `${this.$route.params.id}/update` });
    },
    getCurrentRecipe() {
      return this.allRecipes.find(
        (recipe) => recipe.id === parseInt(this.$route.params.id)
      );
    },
    deleteCurrentRecipe() {
      this.deleteRecipe(this.getCurrentRecipe()).then(this.goBack());
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.image {
  width: 500px;
  margin: 5px;
  border-radius: 20px;
}
.icon-edit,
.icon-trash {
  font-size: 35px;
  padding: 5px;
  border: solid #333 2px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}
.icon-edit :hover,
.icon-trash :hover {
  color: grey;
  border-color: grey;
}
.button {
  margin: 5px;
}
.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>