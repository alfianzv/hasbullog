import axios from "axios";

export const state = {
    posts: [],
    post: {},
    authors: [],
    author: {},
    error: null,
}

export const getters = {
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
    filterPostsByAuthorId: (state) => (id) => {
        return state.posts.filter(post => post.userId == id);
    },
    searchPosts: () => (posts, search) => {
        return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    },
    error: (state) => {
        return state.error;
    }
}

  export const mutations = {
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
    updateError: (state, payload) => {
      state.error = payload;
    }
  }
  
  export const actions = {
    async getPosts({ commit }) {
      await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      ).then(res => {
        commit("updatePosts", res.data);
      }).catch(error => {
        console.log(error.message)
        commit("updateError", error.message)
      })
    },
    async getPost({ commit }, id) {
      await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + id
      ).then(res => {
        commit("updatePost", res.data);
        commit("dummyBody", res.data.body); 
      }).catch(error => {
        console.log(error.message)
        commit("updateError", error.message)
      })
    },
    async getAuthors({ commit }) {
      await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      ).then(res => {
        commit("updateAuthors", res.data);
      }).catch(error => {
        console.log(error.message)
        commit("updateError", error.message)
      })
    },
    async getAuthor({ commit }, id) {
      await axios.get(
        "https://jsonplaceholder.typicode.com/users/" + id
      ).then(res => {
        commit("updateAuthor", res.data);
      }).catch(error => {
        console.log(error.message)
        commit("updateError", error.message)
      })
    },
}
  
export default {
    state,
    getters,
    mutations,
    actions
}