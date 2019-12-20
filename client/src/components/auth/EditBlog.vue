<template lang="html">
  <div class="card edit-blog">
    <h3 class="text-center text-primary">Edit a blog</h3>
    <form @submit.prevent="editBlog" v-if="blogToEdit">
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
        <input v-if="blogToEdit.process === 1" type="checkbox" name="proc" v-model="proc" id="process">
        <input v-else checked type="checkbox" name="proc" v-model="proc" id="process">
      </div>
      <input
        type="submit"
        class="btn btn-primary btn-block"
        value="Edit"
      >
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EditBlog",
  data() {
    return {
      blogToEdit: null,
      title: '',
      content: '',
      proc: '',
      msg: ''
    }
  },
  created() {
    const getBlog = async () => {
      const res = await axios.get(`http://localhost:5000/api/blogs/${this.$route.params.id}`)
      this.blogToEdit = await res.data
      this.title = this.blogToEdit.title
      this.content = this.blogToEdit.content
      this.proc = this.blogToEdit.proc
      await console.log(this.blogToEdit);
    }
    getBlog()
  },
  methods: {
    async editBlog() {
      let processVar;

      if (this.proc) {
        processVar = 2
      } else {
        processVar = 1
      }

      const updatedBlog = {
        title: this.title,
        content: this.content,
        process: processVar
      }

      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        const res = await axios.put(`http://localhost:5000/api/blogs/${this.$route.params.id}`, updatedBlog, config)
        await console.log(res.data);
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="css" scoped>
.edit-blog {
  max-width: 400px;
  margin: 60px auto;
  padding: 2rem;
}
</style>
