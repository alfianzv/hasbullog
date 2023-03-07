<template>
  <div>
    <Navbar></Navbar>
    <Wrapper>
      <header>
        <h1>{{ post.title }}</h1>
        <p>Written by: {{ author.name }}</p>
      </header>
      <div>
        <p>{{ post.body }}</p>
      </div>
    </Wrapper>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Wrapper from '../components/Wrapper.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Footer,
    Wrapper
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['getPost', 'getAuthor']),
  },
  computed: {
    ...mapGetters(['post', 'author']),
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getPost(this.$route.params.id);
  },
  watch: {
    post() {
      this.getAuthor(this.post.userId);
    }
  },
  destroyed() {
    this.$store.commit('clearPost');
    this.$store.commit('clearAuthor');
  }
}
</script>

<style scoped>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    color: #e4e4e4;
  }
  header h1 {
    text-align: left;
    text-transform: capitalize;
  }
  header p {
    font-size: 0.8rem;
    text-align: right;
    white-space: nowrap;
  }

  div p {
    text-align: justify;
    color: #e4e4e4;
    line-height: 1.2rem;
  }
</style>
