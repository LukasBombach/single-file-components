<template>
  <div>hello world</div>
</template>

<script>
export default {
  props: ["foo", "bar"],
  data: () => {
    return {
      baz: "baz"
    };
  }
};
</script>

<style>
div {
  color: red;
}
</style>

