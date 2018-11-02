<template>
<ul>
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</ul>
</template>

<script>
export default {
  data() {
    return {
      data: ["Hello", "World", "How", "are", "you"]
    };
  }
};
</script>