<template lang="html">
  <div class="make-blog card">
    <h3 class="text-center text-primary">Make a blog</h3>
    <form @submit.prevent="makeBlog">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          placeholder="Your title"
          type="text"
          class="form-control"
          name="title"
          v-model="title"
        >
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          placeholder="Your content"
          type="text"
          class="form-control"
          name="content"
          v-model="content"
        ></textarea>
      </div>
      <p class="text-danger text-center" v-if="msg">{{msg}}</p>
      <div class="form-group">
        <label for="proc">Work on it immediately</label>
        <input type="checkbox" name="proc" v-model="proc" :checked="!true" id="process">
      </div>
      <input
        type="submit"
        class="btn btn-primary btn-block"
        value="Add"
      >
    </form>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: "MakeBlog",
  data() {
    return {
      title: '',
      content: '',
      proc: 1,
      msg: ''
    }
  },
  methods: {
    async makeBlog() {
      if (this.title && this.content) {
        this.msg = null
      } else {
       this.msg = "You must enter e-mail and password."
      }

      if (document.getElementById("process").checked) {
        this.proc = 2
      } else {
        this.proc = 1
      }

      const body = {
        title: this.title,
        content: this.content,
        process: this.proc
      }

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/blogs",
        body,
        config
      )

      this.title = ''
      this.content = ''
      this.proc = ''

      this.$router.push({name: "Page"})
    }
  }
}
</script>

<style lang="css" scoped>
.make-blog {
  max-width: 400px;
  margin: 60px auto;
  padding: 2rem;
}
</style>
