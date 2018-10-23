<template>
  <h1>{{text}}</h1>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
h1 {
  font-size: 22rem;
}
</style>
