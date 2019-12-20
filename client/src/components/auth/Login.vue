<template lang="html">
  <div class="login card">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          placeholder="Your email address"
          type="email"
          class="form-control"
          name="email"
          v-model="email"
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          placeholder="Your password"
          type="password"
          class="form-control"
          v-model="password"
        >
      </div>
      <p class="text-danger text-center" v-if="msg">{{msg}}</p>
      <input
        type="submit"
        class="btn btn-primary btn-block"
        value="Login"
      >
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        this.msg = null
      } else {
       this.msg = "You must enter e-mail and password."
      }

      try {
        const body = {
          email: this.email,
          password: this.password
        }

        // Fallback config
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        const res = await axios.post(
          "http://localhost:5000/api/auth",
          body,
          config
        )
        const {token} = await res.data
        localStorage.setItem("token", token)
        // console.log("TOKEN", token)
        this.$router.push({name: "Page", params: {token}})
        location.reload()
      } catch (e) {
        // console.log(e.message)
        return e.message;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.login {
  max-width: 400px;
  margin: 60px auto;
  padding: 2rem;
}
</style>
