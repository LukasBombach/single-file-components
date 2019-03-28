<template>
  <div>
    <ChildComponent :greeting="greeting"></ChildComponent>
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