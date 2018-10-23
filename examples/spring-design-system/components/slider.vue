<template>
  <ul>
    <li v-for="image in images" v-bind:key="image.id">
      <img :src="image.url" alt="image.alt">
    </li>
  </ul>
</template>

<script target="vue">
export default {
  props: {
    images: {
      type: Array,
      default: []
    }
  }
};
</script>

<scriptASD target="react">
export default class Slider extends React.Component {

}
</script>

<storybook>
//...
</storybook>

<style lang="scss">
</style>
