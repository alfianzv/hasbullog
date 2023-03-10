import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    posts: [],
    post: {},
    authors: [],
    author: {},
  },
  getters: {
    posts: (state) => {
      return state.posts;
    },
    post: (state) => {
      return state.post;
    },
    authors: (state) => {
      return state.authors;
    },
    author: (state) => {
      return state.author;
    },
    filterAuthorsByUserId: (state) => (id) => {
      if (id > state.authors.length) return null
      return state.authors[id - 1];
    },
    searchPosts: () => (posts, search) => {
      return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    },
    filterPostsByAuthorId: (state) => (id) => {
      return state.posts.filter(post => post.userId == id);
    },
  },
  mutations: {
    updatePosts: (state, payload) => {
      state.posts = payload;
    },
    updatePost: (state, payload) => {
      state.post = payload;
    },
    updateAuthor: (state, payload) => {
      state.author = payload;
    },
    updateAuthors: (state, payload) => {
      state.authors = payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
    clearPost: (state) => {
      state.post = {};
    },
    clearAuthor: (state) => {
      state.author = {};
    },
    dummyBody: (state, payload) => {
      for (let i = 0; i < 10; i++) {
        state.post.body += payload;
      }
    },
  },
  actions: {
    async getPosts({ commit }) {
      try {
        await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        ).then(res => {
          commit("updatePosts", res.data);
        })
      } catch (error) {
        //insert error handling
      }
    },
    async getPost({ commit }, id) {
      try {
        await axios.get(
          "https://jsonplaceholder.typicode.com/posts/" + id
        ).then(res => {
          commit("updatePost", res.data);
          commit("dummyBody", res.data.body);
        })
      } catch (error) {
        //insert error handling
      }
    },
    async getAuthors({ commit }) {
      try {
        await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        ).then(res => {
          commit("updateAuthors", res.data);
        })
      } catch (error) {
        //insert error handling
      }
    },
    async getAuthor({ commit }, id) {
      try {
        await axios.get(
          "https://jsonplaceholder.typicode.com/users/" + id
        ).then(res => {
          commit("updateAuthor", res.data);
        })
      } catch (error) {
        //insert error handling
      }
    },
  }
});
