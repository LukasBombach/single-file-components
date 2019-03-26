<template>
  <div>
    Child Component Follows:
    <ChildComponent></ChildComponent>
  </div>
</template>

<script>
import ChildComponent from "/Users/lbombach/Projekte/single-file-components/test/fixtures/components/X-ChildComponent.vue";

export default {
  components: {
    ChildComponent
  }
};
</script>