<template>
<div>
  <child-component :someProp="someVariable"></child-component>
</div>
</template>

<script>
import ChildComponent from "./ChildComponent.vue";

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      someVariable: "some value"
    }
  }
};
</script>