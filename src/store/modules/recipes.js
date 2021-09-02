// import Vue from 'vue'

const state = {
  recipeNum: 4,
  currentRecipe: null,
  timeSum: null,
  recipes: [
    // {
    //   id: 0,
    //   title: "Butter Chicken",
    //   image: require('@/assets/images/Butter-Chicken.jpg'),
    //   time: '30 min',
    //   description:
    //     `    Heat half the butter and a couple spoons of oil in a pot.
    //     Once hot add all the whole spices and let them sizzle, then immediately add the diced onion and sauté until translucent  and soft.
    //     Add the ginger-garlic paste and fry for 1-2 minutes.
    //     Add the chilli peppers, 1 can tomato puree and all the ground spices and sugar. stir and cover and cook for about 20 minutes stirring occasionally. basically let all the flavors meld together and cook down until you start seeing a little oil or butter separating from the mixture.
    //     Add the soaked cashews with the water and about a cup or so of chicken stock or water. Boil with a cover for another 15 mins.
    //     Turn off heat and let the mixture cool enough to be able to blend it into a smooth sauce/ or if you have an immersion blender just blend in the pot directly.
    //     Once blended smooth return the sauce to the pot and bring to a boil, adjust consistency with water/stock.
    //     Dice the grilled chicken pieces and add it to the curry with all the chicken juices and blackened bits.
    //     Stir in the remaining butter and crush dried fenugreek leaves over the top. Cover & simmer for 10-15 mins.
    //     Turn heat to low and add heavy cream to finish the dish. heat through, but don't boil.
    //     Turn off heat and garnish with chopped cilantro.`
    // },
    // {
    //   id: 1,
    //   title: "Palak Paneer",
    //   image: require('@/assets/images/Palak-Paneer.jpg'),
    //   time: '40 min',
    //   description:
    //     `Add a teaspoon oil in a pan and add the sliced green chilies and spinach leaves. Cook the leaves until just wilted, but avoid overcooking to retain its vibrant green color. Set aside to cool.
    //     Once cooled blend the spinach and green chilies to a smooth puree.
    //     To make the gravy- heat oil in a pan and add the whole spices. as soon as they begin to splutter add the onions and sauté on medium high heat until they turn translucent.
    //     Add the ginger garlic paste and fry until the raw smell goes away.
    //     Add the tomatoes and season with salt. cook the tomatoes down until they turn mushy.
    //     The add the kasuri methi and spice powders and fry the mixture until it starts releasing oil.
    //     Pour in half a cup of water and stir until the mixture thickens.
    //     Lower the heat and add the spinach puree. mix well until it comes to a gentle simmer.
    //     (optional) Pan fry the paneer cubes with 1-2 tsp oil for 2-3 mins until golden on each side in a separate pan. Add the paneer cubes to the spinach mixture and turn off the heat.
    //     Add the cashew paste mixed with the cream and stir it in for added creaminess. Reserve some for garnish.`
    // },
    // {
    //   id: 2,
    //   title: "Bombay Sandwich",
    //   image: require('@/assets/images/Bombay-Sandwich.jpeg'),
    //   time: '20 min',
    //   description:
    //     `
    //     - Prepare the green chutney by blending/ pulsing all the ingredients listed above in a food processor or blender until it resembles something like a fine pesto.
    //     - To assemble the sandwiches: Start with 2 slices of soft white bread and spread a layer of butter (margarine for vegan version) on both sides of each slice.
    //     - Generously spread the green chutney on one side of each slice.
    //     - Then layer one of the bread with sliced potatoes, sprinkle with salt (or chat masala), then arrange the sliced tomatoes, cucumbers, peppers and top with grated cheese (optional- leave out for vegan version) and top with the second slice of bread
    //     - Toast in Panini press or similarly until the sandwich is is golden brown and get grill marks. Cut and serve with side ketchup and extra chutney and if desired.
    // `
    // },
    // {
    //   id: 3,
    //   title: "Bombay Sandwich",
    //   image: require('@/assets/images/Bombay-Sandwich.jpeg'),
    //   time: '20 min',
    //   description:
    //     `
    //     - Prepare the green chutney by blending/ pulsing all the ingredients listed above in a food processor or blender until it resembles something like a fine pesto.
    //     - To assemble the saCounterndwiches: Start with 2 slices of soft white bread and spread a layer of butter (margarine for vegan version) on both sides of each slice.
    //     - Generously spread the green chutney on one side of each slice.
    //     - Then layer one of the bread with sliced potatoes, sprinkle with salt (or chat masala), then arrange the sliced tomatoes, cucumbers, peppers and top with grated cheese (optional- leave out for vegan version) and top with the second slice of bread
    //     - Toast in Panini press or similarly until the sandwich is is golden brown and get grill marks. Cut and serve with side ketchup and extra chutney and if desired.
    // `
    // },
    // {
    //   id: 4,
    //   title: "Bombay Sandwich",
    //   image: require('@/assets/images/Bombay-Sandwich.jpeg'),
    //   time: '20 min',
    //   description:
    //     `
    //     - Prepare the green chutney by blending/ pulsing all the ingredients listed above in a food processor or blender until it resembles something like a fine pesto.
    //     - To assemble the sandwiches: Start with 2 slices of soft white bread and spread a layer of butter (margarine for vegan version) on both sides of each slice.
    //     - Generously spread the green chutney on one side of each slice.
    //     - Then layer one of the bread with sliced potatoes, sprinkle with salt (or chat masala), then arrange the sliced tomatoes, cucumbers, peppers and top with grated cheese (optional- leave out for vegan version) and top with the second slice of bread
    //     - Toast in Panini press or similarly until the sandwich is is golden brown and get grill marks. Cut and serve with side ketchup and extra chutney and if desired.
    // `
    // },

  ]
};

const actions = {
  getRecipes({commit}, search) {
    const getMethod = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'GET',
    }
    let url = `http://localhost:8000/api/recipes/`
    if(search) {
      url = `http://localhost:8000/api/recipes/?title=${search}`
    }
    fetch(url, getMethod)
      .then(data => {
        return data.json()
      })
      .then(res => {
        commit('setRecipes', res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  addRecipe({commit}, newRecipe) {
    const postMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newRecipe)
    }
    fetch(`http://localhost:8000/api/recipes/`, postMethod)
      .then(data => {
        return data.json()
      })
      .then(res => {
        commit('add', res)
      })
      .catch(err => {
        console.log(err)
      })
    commit('add', newRecipe)
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
  calculate({commit}, ids) {
    const postMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(ids)
    }
    fetch(`http://localhost:8000/api/recipes/calculate/`, postMethod)
      .then(data => {
        return data.json()
      })
      .then(res => {
        commit('setTime', res)
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
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
  }
};


export default {
  state,
  actions,
  mutations
}
