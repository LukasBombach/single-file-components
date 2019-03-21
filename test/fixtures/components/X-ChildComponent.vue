<template>
  <div>
    <p>{{ greeting }} Child Component!</p>
  </div>
</template>

<script>
export default {
  props: {
    greeting: {
      type: String,
      default: "hello",
      required: false
    }
  }
};
</script>