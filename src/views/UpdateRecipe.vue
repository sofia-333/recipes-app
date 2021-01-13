<template>
  <div class="container">
    <b-form @submit="onUpdate">
      <b-jumbotron class="blue" header="Create New Recipe">
        <b-form-input
          class="input"
          v-model="updatedRecipe.title"
          placeholder="Title"
        ></b-form-input>
        <b-form-input
          class="input"
          v-model="updatedRecipe.time"
          placeholder="Time to prepare"
        ></b-form-input>

        <b-form-textarea
          class="input"
          id="textarea"
          v-model="updatedRecipe.description"
          placeholder="Enter description..."
          rows="10"
          max-rows="6"
        ></b-form-textarea>

        <b-form-file class="input mt-3" v-model="file" plain></b-form-file>
        <b-button class="button" @click="goBack">Back</b-button>
        <b-button class="button submit" type="submit">Update</b-button>
      </b-jumbotron>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UpdateRecipe",
  data() {
    return {
      file: null,
      updatedRecipe: {
        id: null,
        title: "this.getCurrentRecipe().title",
        time: "this.getCurrentRecipe.time",
        image: null,
        description: "this.getCurrentRecipe.descripiton",
      },
    };
  },
  computed: mapGetters(["allRecipes"]),
  methods: {
    ...mapActions(["updateRecipe"]),
    onUpdate() {
      event.preventDefault();
      this.updatedRecipe.id = this.getCurrentRecipe().id;
      this.imageToBase64(this.file); //converts image to base64 and writes it in updatedRecipe.image
      this.updateRecipe(this.updatedRecipe);
      alert("Recipe Updated");
    },
    goBack() {
      this.$router.go(-1);
    },
    imageToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updatedRecipe.image = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    getCurrentRecipe() {
      return this.allRecipes.find(
        (recipe) => recipe.id === parseInt(this.$route.params.id)
      );
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  margin-top: 30px;
  background-color: #333;
}

.input {
  margin: 15px;
}
.button {
  margin: 5px;
}
.submit {
  background-color: rgb(68, 102, 255);
}
</style>