<template>
  <div>
    <child-component :greeting="greeting"></child-component>
  </div>
</template>

<script>
import ChildComponent from "./X-ChildComponent.vue";

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      greeting: "Aloha"
    };
  }
};
</script>