<template>
  <div class="nav">
    <router-link to="/" class="logo">
      Hasbullog
    </router-link>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <select id="authorsList" @change="pushRoute">
          <option value="" disabled selected hidden>Find Your Author</option>
          <option v-for="a in authors" :value="a.id" :key="a.id">{{a.name}}</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: 0,
    }
  },
  methods: {
    ...mapActions(['getAuthors']),
    pushRoute() {
      let select = document.getElementById('authorsList');
      this.id = select.value;
      this.$router.push({ name: 'authorBlogs', params: { id: this.id } });
    }
  },
  computed: {
    ...mapGetters(['authors']),
  },
  mounted() {
    this.getAuthors();
  },
  updated() {
    if (this.$route.path.includes('author')) {
      let select = document.getElementById('authorsList');
      select.value = this.$route.params.id;
    }
  }
}
</script>

<style scoped>
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #2c3e50;
    padding: 1rem 3rem;
    text-align: left;
  }
  .nav ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    gap: 2rem;
  }
  .nav ul li a {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  a.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #845f39;
  }
  select {
    font-size: 1rem;
    border: none;
    background-color: transparent;
    color: white;
    font-weight: bold;
    text-decoration: none;
    outline: none;
  }
  select option {
    color: black;
  }
</style>
