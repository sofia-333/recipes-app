<template>
  <div class="container">
    <b-form @submit="onUpdate">
      <b-jumbotron class="blue" header="Update Recipe">
        <img :src="updatedRecipe.image" class="displayed-image" alt="Image"/>
        <b-form-input
          class="input"
          v-model="updatedRecipe.title"
          placeholder="Title"
        ></b-form-input>
        <b-form-input
          type="number"
          class="input"
          v-model="updatedRecipe.time_to_prepare"
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
        <p>You can update picture from here:</p>
        <!-- <div><input type="file"></div> -->
        <b-form-file
          @change="fileChange"
          class="input mt-3"
          v-model="file"
          plain
        ></b-form-file>
        <b-button class="button" @click="goBack">Back</b-button>
        <b-button class="button submit" type="submit">Update</b-button>
      </b-jumbotron>
    </b-form>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    name: "UpdateRecipe",
    data() {
      return {
        file: null,
        fileChanged: false,
        current: null,
        updatedRecipe: {
          id: null,
          title: "",
          time_to_prepare: "",
          description: "",
          image: null,
        },
      };
    },
    created: function () {
      this.current = this.getCurrentRecipe();
    },
    computed: {
      ...mapState({
        allRecipes: state => state.recipes.recipes //state.recipes is a js file and state.recipes.recipes is an array itself
      }),
    },
    watch: {
      'current.id'() {
        this.updatedRecipe.id = this.current.id;
      },
      'current.title'() {
        this.updatedRecipe.title = this.current.title;
      },
      'current.time_to_prepare'() {
        this.updatedRecipe.time_to_prepare = this.current.time_to_prepare;
      },
      'current.description'() {
        this.updatedRecipe.description = this.current.description;
      },
    },
    methods: {
      ...mapActions(["getRecipes", 'updateRecipe']),
      async onUpdate(event) {
        // await this.getRecipes();
        event.preventDefault();
        // if (this.fileChanged) {
        //   this.imageToBase64(this.file); //converts image to base64 and writes it in updatedRecipe.image
        // }
        await this.getRecipes();
        await this.updateRecipe(this.updatedRecipe)
        await this.getRecipes();
        this.goBack();
      },
      goBack() {
        this.$router.go(-1);
      },
      fileChange() {
        this.fileChanged = true;
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
    async beforeMount() {
      await this.getRecipes();
    }
  };
</script>

<style scoped>
  .container {
    padding: 30px;
    margin-top: 30px;
    background-color: #333;
  }

  .left {
    text-align: left;
    margin: 15px;
  }

  .input {
    margin: 15px;
  }

  .button {
    margin: 5px;
  }

  .displayed-image {
    width: 300px;
    text-align: left;
  }

  .submit {
    background-color: rgb(68, 102, 255);
  }
</style>