<template>
  <div class="recipes">
    <Header />
    <b-form-input
      class="search"
      v-model="searched"
      placeholder="Type dish name..."
    ></b-form-input>
    <div class="add">
      <b-icon @click="addRecipe" id="addIcon" icon="plus-circle-fill"></b-icon>
      <p>New</p>
    </div>
    <h1>Your Recipes</h1>
    <div class="grid-list">
      <div v-for="recipe in displayedRecipes()" :key="recipe.id">
        <b-card
          :title="recipe.title"
          :img-src="recipe.image"
          img-alt="Image"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-icon
            class="icon-view"
            icon="eye-fill"
            @click="viewRecipe(recipe)"
          ></b-icon>
          <b-icon
            class="icon-edit"
            icon="pencil-fill"
            @click="editRecipe(recipe)"
          ></b-icon>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "RecipesList",
  components: {
    Header,
  },
  data() {
    return {
      searched: "",
    };
  },
  computed: {
    ...mapState({
      allRecipes: state => state.recipes.recipes //state.recipes is a js file and state.recipes.recipes is an array itself
    }),
  },
  methods: {
    ...mapActions(['getRecipes']),
    addRecipe() {
      this.$router.push({path: `recipes/create`});
    },
    viewRecipe(recipe) {
      this.$router.push({path: `recipes/${recipe.id}`});
    },
    editRecipe(recipe) {
      this.$router.push({path: `recipes/${recipe.id}/update`});
    },
    searchRecipe() {
      return this.allRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().indexOf(this.searched.toLowerCase()) !== -1
      );
    },
    displayedRecipes() {
      if (this.searched === "") {
        return this.allRecipes;
      } else return this.searchRecipe();
    },
  },
  async beforeMount() {
    await this.getRecipes();
  }
}
</script>

<style scoped>
.search {
  width: 60%;
  margin: 14px 19%;
}

#addIcon {
  font-size: 2rem;
  cursor: pointer;
}
.grid-list {
  margin: 0 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
}
.add {
  display: flex;
  flex-direction: row;
  margin: 0 4%;
  /* position: absolute; */
}
.add p {
  margin-top: 1px;
  font-size: 20px;
  margin-left: 5px;
}
.icon-view,
.icon-edit {
  font-size: 35px;
  padding: 5px;
  border: solid #333 2px;
  border-radius: 5px;
  cursor: pointer;
  margin: 4px;
}
.icon-view :hover,
.icon-edit :hover {
  color: grey;
  border-color: grey;
}
</style>