<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: 100vh;
    width: 70%;
    margin: 2rem auto;
  }
</style>
