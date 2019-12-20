<template lang="html">
  <div class="m-3">
    <div class="row mt-4">
      <div
        class="col-4 process-col border of"
        id="process-1"
        @drop="drop"
        @dragover="allowDrop"
      >
        <h3 class="border-bottom">To do:</h3>
        <div
          v-for="blog in blogs"
          :key="blog._id"
          :id="blog._id"
          draggable="true"
          @dragstart="drag"
        >
          <section v-if="blog.process === 1" :class="blog.process === 1 ? 'mb-3 p-1 border' : 'disappear'">
            <h4 class="mt-0">{{blog.title}}</h4>
            <p>{{blog.content}}</p>
            <router-link :to="{ name: 'Blog', params: {id: blog._id} }" class="btn btn-primary btn-block mt-2">Go</router-link>
          </section>
        </div>
      </div>
      <div class="col-4 process-col border of" @drop="drop" id="process-2" @dragover="allowDrop">
        <h3 class="border-bottom">In progress:</h3>
        <div
          v-for="blog in blogs"
          :key="blog._id"
          :id="blog._id"
          draggable="true"
          @dragstart="drag"
        >
          <section v-if="blog.process === 2" :class="blog.process === 2 ? 'mb-3 p-1 border' : 'disappear'">
            <h4 class="mt-0">{{blog.title}}</h4>
            <p>{{blog.content}}</p>
            <router-link :to="{ name: 'Blog', params: {id: blog._id} }" class="btn btn-primary btn-block mt-2">Go</router-link>
          </section>
        </div>
      </div>
      <div class="col-4 process-col border of" @drop="drop" id="process-3" @dragover="allowDrop">
        <h3 class="border-bottom">Done:</h3>
        <div
          v-for="blog in blogs"
          :key="blog._id"
          :id="blog._id"
          draggable="true"
          @dragstart="drag"
        >
          <section v-if="blog.process === 3" :class="blog.process === 3 ? 'mb-3 p-1 border' : 'disappear'">
            <h4 class="mt-0">{{blog.title}}</h4>
            <p>{{blog.content}}</p>
            <router-link :to="{ name: 'Blog', params: {id: blog._id} }" class="btn btn-primary btn-block  mt-2">Go</router-link>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import setAuthToken from '@/utils/setAuthToken'

export default {
  name: "Blogs",
  data() {
    return {
      blogs: null,
      grabbed: null,
      process1: null,
      process2: null,
      process3: null
    }
  },
  created() {
    const getBlogs = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get("http://localhost:5000/api/blogs")
        this.blogs = await res.data
        // let col1 = await this.blogs.filter(blog => blog.process === 1)
        // let col2 = await this.blogs.filter(blog => blog.process === 2)
        // let col3 = await this.blogs.filter(blog => blog.process === 3)
        // let newCol1 = [], newCol2 = [], newCol3 = []
        //
        // for (let i = 0; i < col1.length; i++) {
        //   let correctOrder = col1.find(obj => obj.order - 1 === i)
        //   newCol1.push(correctOrder)
        // }
        // for (let i = 0; i < col2.length; i++) {
        //   let correctOrder = col2.find(obj => obj.order - 1 === i)
        //   newCol2.push(correctOrder)
        // }
        // for (let i = 0; i < col3.length; i++) {
        //   let correctOrder = col3.find(obj => obj.order - 1 === i)
        //   newCol3.push(correctOrder)
        // }
        //
        // this.process1 = newCol1
        // this.process2 = newCol2
        // this.process3 = newCol3
        // console.log(newCol1, newCol2, newCol3);
        // console.log(
        //   this.process1,
        //   this.process2,
        //   this.process3
        // );
      } catch (e) {
        return e.message
      }
    }
    getBlogs()
  },
  methods: {
    allowDrop(e) {
      e.preventDefault()
    },
    drag(e) {
      e.dataTransfer.setData("text", e.target.id)
      this.grabbed = this.blogs.filter(blog => blog._id === e.target.id)
    },
    drop(e) {
      e.preventDefault();
      let data = e.dataTransfer.getData("text")
      e.target.appendChild(document.getElementById(data));

      let toUpdate = {
        ...this.grabbed[0]
      }

      switch (e.target.id) {
        case "process-1":
          toUpdate.process = 1
          // toUpdate.order = this.process1.indexOf(this.grabbed[0] + 1)
          break;
        case "process-2":
          toUpdate.process = 2
          // toUpdate.order = this.process2.indexOf(this.grabbed[0] + 1)
          break;
        case "process-3":
          toUpdate.process = 3
          // toUpdate.order = this.process3.indexOf(this.grabbed[0] + 1)
          break;
      }

      console.log(toUpdate);

      const updateProcess = async () => {
        const res = await axios.put(`http://localhost:5000/api/blogs/process/${this.grabbed[0]._id}`, toUpdate)
        await this.$forceUpdate()
      }
      updateProcess()
    }
  }
}
</script>

<style lang="css" scoped>
.process-col {
  padding: 0 2rem 2rem 2rem;
  max-height: 550px;
  overflow: auto;
}

.disappear {
  display: none !important;
}
</style>
