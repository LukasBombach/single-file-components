<template>
  <div>
    Child Component Follows:
    <child-component></child-component>
  </div>
</template>

<script>
const { importVueAsComponent } = require("../../utils/importVueAndReact");

const ChildComponent = importVueAsComponent("./X-ChildComponent.vue");

module.exports = {
  components: {
    ChildComponent
  }
};
</script>