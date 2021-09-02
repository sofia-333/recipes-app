// import Vue from 'vue'

import axios from "axios";

const state = {
  recipeNum: 4,
  currentRecipe: null,
  timeSum: null,
  recipes: []
};

const actions = {
  async getRecipes({commit}, search) {
    let url = `http://localhost:8000/api/recipes/`
    if (search) {
      url = `http://localhost:8000/api/recipes/?title=${search}`
    }
    await axios.get(url)
      .then(response => commit('setRecipes', response.data))
      .catch(err => console.log(err))
  },

  async addRecipe({commit}, newRecipe) {
    await axios.post(`http://localhost:8000/api/recipes/`, newRecipe)
      .then(res => commit('add', res.data))
      .catch(err => console.log(err))
  },
  // updateRecipe({commit}, updatedRecipe) {
  //   commit('update', updatedRecipe)
  // },
  setCurrentRecipe({commit}, currentId) {
    let current = null;
    current = state.recipes.find((recipe) => recipe.id === currentId);
    if (current == null) alert('Recipe Not Found')
    else commit('setCurrent', current)
  },
  async calculate({commit}, ids) {
    let response = await axios.post(`http://localhost:8000/api/recipes/calculate/`, ids)
    if (JSON.parse(response.data)) {
      commit('setTime', JSON.parse(response.data))
    }
  }
};

const mutations = {
  setRecipes: (state, recipesToSet) => {
    state.recipes = recipesToSet;
  },
  add: (state, newRecipe) => {
    state.recipes.push(newRecipe)
  },
  delete: (state, newRecipesList) => {
    state.recipes = newRecipesList;
  },
  increase: (state) => {
    state.recipeNum++;
  },
  // update: (state, updatedRecipe) => {
  //   const index = state.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
  //   Vue.set(state.recipes, index, updatedRecipe);
  // },
  setCurrent: (state, current) => {
    state.currentRecipe = current;
  },
  setTime: (state, timeSum) => {
    state.timeSum = timeSum
    console.log('set');
  }
};


export default {
  state,
  actions,
  mutations
}
