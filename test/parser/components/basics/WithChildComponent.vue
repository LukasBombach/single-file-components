<template>
<div>
  <child-component></child-component>
</div>
</template>

<script>
import ChildComponent from "./ChildComponent.vue";

export default {
  components: {
    ChildComponent
  }
};
</script>