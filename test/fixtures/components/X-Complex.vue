<template>
  <div>
    <h1>{{ greeting }} to our {{ num }} members</h1>
    <ul>
      <li v-for="name in names" :key="name">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: "Hello"
    };
  },
  props: {
    names: {
      type: Array,
      required: true
    }
  },
  computed: {
    num() {
      return this.names.length;
    }
  }
};
</script>