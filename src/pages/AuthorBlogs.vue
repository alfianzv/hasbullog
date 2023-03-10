<template>
  <div>
    <Navbar></Navbar>
    <Wrapper>
      <img src="../assets/hasbulla.png" alt="">
      <input id="search" type="text" v-model="search" placeholder="Search by blogs title...">
      <h1 v-if="author">{{ author.name }} Blogs</h1>
      <h4 v-if="!postsLength">No posts found</h4>
      <Blog v-else v-for="p in posts" :id="p.id" :title="p.title" :body="p.body" :userId="p.userId" :key="p.id" :author="author"></Blog>
    </Wrapper>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Wrapper from '../components/Wrapper.vue'
import Blog from '../components/Blog.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Footer,
    Blog,
    Wrapper
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions(['getPosts']),
  },
  computed: {
    ...mapGetters(['authors', 'searchPosts', 'filterPostsByAuthorId', 'filterAuthorsByUserId']),
    posts() {
      return this.searchPosts(this.filterPostsByAuthorId(this.$route.params.id), this.search);
    },
    postsLength() {
      if (this.posts.length < 1) return null
      return this.posts.length;
    },
    author() {
      return this.filterAuthorsByUserId(this.$route.params.id);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getPosts();
  },
  destroyed() {
    this.$store.commit('clearPosts');
  },
}
</script>

<style scoped>
  img {
    width: 250px;
    border-radius: 50%;
    margin: 0rem auto;
  }
  h1 {
    text-align: left;
    margin-bottom: 1rem;
  }
  #search {
    width: 65%;
    outline: none;
    height: 1.5rem;
    border-radius: 0.25rem;
    margin: 1.5rem auto;
    padding: 1rem 0.5rem;
  }
</style>
