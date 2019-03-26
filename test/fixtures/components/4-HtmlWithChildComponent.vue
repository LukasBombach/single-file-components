<template>
  <div>
    Child Component Follows:
    <ChildComponent></ChildComponent>
  </div>
</template>

<script>
import ChildComponent from "./X-ChildComponent.vue";

export default {
  components: {
    ChildComponent
  }
};
</script>