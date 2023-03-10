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
        <span>Authors</span>
        <div class="dropdown">
          <router-link v-for="a in authors" :to="{ name: 'authorBlogs', params:  {id: a.id}  }" :key="a.id">{{a.name}}</router-link>
        </div>
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
  },
  computed: {
    ...mapGetters(['authors']),
  },
  mounted() {
    this.getAuthors();
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
  li span {
    position: relative;
    color: white;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }
  li span:hover + .dropdown{
    visibility: visible;
  }
  .dropdown {
    visibility: hidden;
    position: absolute;
    right: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #2c3e50;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    z-index: 1;
  }

  .dropdown:hover {
    visibility: visible;
  }

  .dropdown a {
    color: white;
    font-weight: lighter;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
</style>
