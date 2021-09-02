<template>
  <div class="recipes">
    <Header/>
    <b-form-input
      debounce="500"
      class="search"
      v-model="searched"
      placeholder="Type dish name..."
      @change="searchRecipe"
    ></b-form-input>
    <div class="d-flex justify-content-between flex-col m-3 mt-5">
      <span @click="addRecipe" class="add">
        <b-icon id="addIcon" icon="plus-circle-fill"></b-icon>
        <p>New</p>
      </span>
      <span @click="calculateTime" class="calculate float-right">
        <p>Calculate Time</p>
        <b-icon id="calculateIcon" icon="clock-fill"></b-icon>
      </span>
    </div>
    <h1 class="mb-5">Your Recipes</h1>
    <div class="grid-list">
      <div v-for="recipe in allRecipes" :key="recipe.id">
        <b-form-checkbox :id="`checkbox-${recipe.id}`" :checked="selectedRecipes.has(recipe)"
                         @change="onSelect($event, recipe)" class="float-left"></b-form-checkbox>
        <b-card :title="recipe.title" :img-src="recipe.image" img-alt="Image" style="max-width: 20rem" class="mb-2">
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
  import {mapState, mapActions} from "vuex";

  export default {
    name: "RecipesList",
    components: {
      Header,
    },
    data() {
      return {
        searched: null,
        selectedRecipes: new Set()
      };
    },
    computed: {
      ...mapState({
        allRecipes: state => state.recipes.recipes, //state.recipes is a js file and state.recipes.recipes is an array itself
        timeSum: state => state.recipes.timeSum
      }),
    },
    methods: {
      ...mapActions(['getRecipes', 'calculate']),
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
        this.getRecipes(this.searched);
        this.selectedRecipes = new Set()
      },
      onSelect(checked, item) {
        if (checked) {
          this.selectedRecipes.add(item)
        } else {
          this.selectedRecipes.delete(item)
        }
      },
      async calculateTime() {
        if (this.selectedRecipes.size === 0) {
          alert('Please Select Items to Calculate Time to Prepare')
        } else {
          const recipes = [...this.selectedRecipes]
          await this.calculate(recipes.map(r => r.id))
          alert(`Time to prepare selected recipes is ${this.timeSum} minutes`);
        }
      }
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

  #addIcon, #calculateIcon {
    font-size: 2rem;
    cursor: pointer;
  }

  .grid-list {
    margin: 0 10%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2px;
  }

  .add, .calculate {
    display: flex;
    flex-direction: row;
    margin: 0 4%;
    cursor: pointer;
    /* position: absolute; */
  }

  .add p, .calculate p {
    margin-top: 1px;
    font-size: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .icon-view,
  .icon-edit {
    font-size: 35px;
    padding: 5px;
    border: solid #333 2px;
    border-radius: 5px;
    /*cursor: pointer;*/
    margin: 4px;
  }

  .icon-view :hover,
  .icon-edit :hover,
  #addIcon :hover,
  #calculateIcon :hover {
    color: grey;
    border-color: grey;
    cursor: pointer;
  }
</style>