<template>
  <label for="form-label" :class="inputClass">{{ labelText }}</label>
</template>

<script>
export default {
  props: {
    labelText: String,
    inputClass: String,
  }
};
</script>

<style scoped>
</style>