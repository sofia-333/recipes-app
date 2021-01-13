<template>
  <div class="container">
    <b-form @submit="onSubmit">
      <b-jumbotron class="blue" header="Create New Recipe">
        <b-form-input
          class="input"
          v-model="newRecipe.title"
          placeholder="Title"
        ></b-form-input>
        <b-form-input
          class="input"
          v-model="newRecipe.time"
          placeholder="Time to prepare"
        ></b-form-input>

        <b-form-textarea
          class="input"
          id="textarea"
          v-model="newRecipe.description"
          placeholder="Enter description..."
          rows="10"
          max-rows="6"
        ></b-form-textarea>

        <b-form-file class="input mt-3" v-model="file" plain></b-form-file>
        <b-button class="button" @click="goBack">Back</b-button>
        <b-button class="button submit" type="submit">Add Recipe</b-button>
      </b-jumbotron>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateRecipe",
  data() {
    return {
      file: null,
      newRecipe: {
        id: null,
        title: "",
        time: "",
        image: null,
        description: "",
      },
    };
  },
  computed: mapGetters(["getRecipeNum"]),
  methods: {
    ...mapActions(["addRecipe", "increaseRecipeNum"]),
    onSubmit(event) {
      event.preventDefault();
      this.increaseRecipeNum();
      this.newRecipe.id = this.getRecipeNum;
      this.imageToBase64(this.file); //converts image to base64 and writes it in newRecipe.image
      this.addRecipe(this.newRecipe);
      alert("New Recipe Added");
    },
    goBack() {
      this.$router.go(-1);
    },
    imageToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.newRecipe.image = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
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