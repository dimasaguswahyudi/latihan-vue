<template>
    <button :class="inputClass" :type="type" @click="$emit('click')">{{ labelButton }}</button>
</template>

<script>
export default {
  props: {
    labelButton: String,
    type: String,
    inputClass: String,
  }
};
</script>

<style scoped>
</style>