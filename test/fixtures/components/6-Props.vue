<template>
  <div>
    <p>{{ greeting }} World!</p>
  </div>
</template>

<script>
export default {
  props: {
    greeting: {
      type: String,
      required: true
    }
  }
};
</script>