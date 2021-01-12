<template>
    <b-navbar class="header" toggleable="lg" type="dark" variant="dark">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item ><router-link to="/">Home</router-link>|</b-nav-item>
          <b-nav-item > <router-link to="/recipes">Recipes</router-link></b-nav-item>
        </b-navbar-nav>
      
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  color: #fff;
  text-align: center;
  padding: 10px;
}
.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
</style>