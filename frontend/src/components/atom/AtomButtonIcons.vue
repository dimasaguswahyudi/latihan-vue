<template>
  <button :class="inputClass" :type="type" @click="$emit('click')">
      <font-awesome-icon
        :icon="icons"
        style="color: #ffffff"
      />
  </button>
</template>

<script>
export default {
props: {
  icons: String,
  type: String,
  inputClass: String,
}
};
</script>

<style scoped>
</style>