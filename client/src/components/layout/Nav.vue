<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <router-link :to="{ name: 'Page' }" class="navbar-brand">Blogs</router-link>
     <button
       class="navbar-toggler"
       type="button"
       data-toggle="collapse"
       data-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent"
       aria-expanded="false"
       aria-label="Toggle navigation"
     >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!token">
          <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="token">
          <span @click="signout" class="nav-link point">Sign out</span>
        </li>
        <li class="nav-item" v-if="!token">
          <router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="token">
          <router-link class="nav-link" :to="{name: 'Page'}">Home</router-link>
        </li>
        <li class="nav-item" v-if="token">
          <router-link class="nav-link" :to="{name: 'Blogs'}">Blogs</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    signout() {
      localStorage.removeItem("token")
      this.$router.push({name: "Login"})
      location.reload()
    }
  },
  computed: {
    token() {
      return localStorage.getItem("token")
    }
  }
}
</script>

<style scoped>
.point {
  cursor: pointer;
}
</style>
