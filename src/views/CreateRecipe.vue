<template>
  <div class="container">
    <b-form @submit="onSubmit">
      <b-jumbotron class="blue" header="Create New Recipe">
        <b-form-input class="input" v-model="newRecipe.title" placeholder="Title" ></b-form-input>
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

        <b-form-file class="input mt-3" v-model="newRecipe.image" plain></b-form-file>
        <b-button class="button" @click="goBack">Back</b-button>
        <b-button class="button submit" type="submit" >Submit</b-button>
      </b-jumbotron>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "CreateRecipe",
  data() {
    return { newRecipe : {
      title: "",
      time: "",
      image: null,
      description: "",
    }};
  },
  methods: {
    ...mapActions(['addRecipe']),
    onSubmit(event) {
      event.preventDefault();
      console.log(this.newRecipe.image);
      this.addRecipe(this.newRecipe);
      //alert("New Recipe Added");
    },
    goBack() {
      this.$router.replace("/recipes");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  margin-top: 30px;
  background-color:#333;
}

.input { 
  margin: 15px;
}
.button {
  margin: 5px;
}
.submit {
 background-color:rgb(68, 102, 255);;
}

</style>