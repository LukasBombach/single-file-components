<template>
  <div>
    Child Component Follows:
    <child-component></child-component>
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