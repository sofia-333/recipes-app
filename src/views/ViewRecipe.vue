<template>
  <div class="container">
    <h1>{{ current.title }}</h1>
    <!--    <img class="image" :src="current.image" />-->
    <b-list-group>
      <b-list-group-item>
        <b>Name:</b> {{ current.title }}
      </b-list-group-item>
      <b-list-group-item>
        <b>Time to prepare:</b>
        {{ current.time_to_prepare }}
      </b-list-group-item>
      <b-list-group-item>
        <b>Description:</b><br/>
        {{ current.description }}
      </b-list-group-item>
    </b-list-group>
    <div class="btn-container">
      <b-icon
          class="icon-trash"
          icon="pencil-fill"
          @click="editRecipe">
      </b-icon>
      <b-icon
          class="icon-edit"
          icon="trash-fill"
          @click="deleteCurrentRecipe">
      </b-icon>
      <b-button class="button" @click="goBack">Back</b-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ViewRecipe",
  computed: {
    ...mapState({
      current: state => state.recipes.currentRecipe
    })
  },
  watch: {
    '$route.params.id'() {
      this.setCurrentRecipe(parseInt(this.$route.params.id));
    }
  },
  methods: {
    ...mapActions(["setCurrentRecipe", "getRecipes"]),
    goBack() {
      this.$router.go(-1);
    },
    editRecipe() {
      this.$router.push({path: `${this.$route.params.id}/update`});
    },
    async deleteCurrentRecipe() {
      const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(this.current)
      }
      fetch(`http://localhost:8000/api/recipes/${this.current.id}/`, deleteMethod)
          .then(res => res.json())
          .then(res => {
            console.log(res, "deleted")
          })
          .catch(err => {
            console.log(err)
          })
      await this.getRecipes();
      this.goBack();
    },
  },
  beforeMount() {
    this.getRecipes();
    this.setCurrentRecipe(parseInt(this.$route.params.id));
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
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