<template>
  <div>
    <Navbar></Navbar>
    <Wrapper>
      <img src="../assets/hasbulla.png" alt="">
      <input id="search" type="text" v-model="search" placeholder="Search by blogs title...">
      <Blog v-for="p in blogPosts" :id="p.id" :title="p.title" :body="p.body" :userId="p.userId" :key="p.id"></Blog>
    </Wrapper>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Wrapper from '../components/Wrapper.vue'
import Blog from '../components/Blog.vue'

export default {
  components: {
    Navbar,
    Footer,
    Blog,
    Wrapper
  },
  data () {
    return {
      search: '',
    }
  },
  methods: {
    ...mapActions(['getPosts']),
  },
  computed: {
    ...mapGetters(['posts', 'authors', 'searchPosts', 'filterAuthorsByUserId']),
    blogPosts() {
      return this.searchPosts(this.posts, this.search);
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
  #search {
    width: 65%;
    outline: none;
    height: 1.5rem;
    border-radius: 0.25rem;
    margin: 1.5rem auto;
    padding: 1rem 0.5rem;
  }
</style>
