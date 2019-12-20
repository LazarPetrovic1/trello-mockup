<template lang="html">
  <div class="container">
    <h1 v-if="user" class="text-center mt-3">Welcome, {{user.name}}</h1>
    <div class="card down animated bounceInDown">
      <div class="card-body">
        <h1 class="card-title text-center">View blogs</h1>
        <div class="card-text">
          <router-link class="btn btn-primary btn-block btn-lg" :to="{ name: 'Blogs' }">
            Go &rarr;
          </router-link>
          <router-link class="btn btn-primary btn-block btn-lg" :to="{ name: 'MakeBlog' }">
            Make one
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import setAuthToken from '@/utils/setAuthToken'

export default {
  name: "Page",
  data() {
    return {
      user: null
    }
  },
  created() {
    const getUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth")
        this.user = await res.data
      } catch (e) {
        return e.message;
      }
    }

    getUser()
  }
}
</script>

<style lang="css" scoped>
.down {
  margin-top: calc(100vh/2 - 40px - 130px - 48px);
}
</style>
