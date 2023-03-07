<template>
  <div>
    <router-link :to="{ name: 'blogDetail', params:  {id: id}  }"><h3>{{title}}</h3></router-link>
    <p>{{body}}</p>
    <router-link class="author" :to="{ name: 'authorBlogs', params:  {id: userId}  }"><h5>By {{ currentAuthor[0].name }}</h5></router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isAuthorEmpty: true,
    }
  },
  props: ['title', 'body', 'id', 'userId'],
  computed: {
    ...mapGetters(['filterAuthorsByUserId']),
    currentAuthor() {
      return this.filterAuthorsByUserId(this.userId);
    }
  }
}
</script>

<style scoped>
  div {
    border: 1px solid #2c3e50;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  a {
    text-decoration: none;
    color: #F0F0F0;
  }
  h3 {
    text-transform: capitalize;
    font-size: 1.2rem;
    text-align: left;
    margin-bottom: 0.25rem;
  }
  h5 {
    color: #845f40;
    text-transform: capitalize;
    font-size: 0.9rem;
    text-align: right;
    margin-top: 0.5rem;
  }
  p {
    font-size: 0.9rem;
    text-align: left;
    color:#d0d3d6 ;
  }
</style>
