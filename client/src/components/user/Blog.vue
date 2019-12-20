<template lang="html">
  <div class="container mt-4">
    <div class="card p-3">
      <h1 v-if="blog" class="text-primary text-center">{{blog.title}}</h1>
      <p v-if="blog" class="text-info text-center">{{blog.content}}</p>
      <small v-if="blog" class="text-right text-secondary d-block mb-3">@ {{blog.date}}</small>
      <div class="d-flex justify-content-between">
        <router-link :to="{name: 'EditBlog'}" class="btn btn-primary">Edit the entry</router-link>
        <button @click="purge" class="btn btn-danger">Delete entry</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Blog",
  data() {
    return {
      blog: null
    }
  },
  created() {
    const getBlog = async () => {
      const res = await axios.get(`http://localhost:5000/api/blogs/${this.$route.params.id}`)
      this.blog = await res.data
    }
    getBlog()
  },
  methods: {
    async purge() {
      await axios.delete(`http://localhost:5000/api/blogs/${this.$route.params.id}`)
      await console.log("Delete successful")
      this.$router.push({name: "Page"})
    }
  }
}
</script>

<style lang="css" scoped>
</style>
