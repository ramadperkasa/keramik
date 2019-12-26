<template>
  <div></div>
</template>

<script>
import store from "../store/index";
export default {
  computed: {
    alert() {
      return store.getters.getAlert;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>