<template>
  <input :class="inputClass" :type="type" :value="value"  @input="$emit('input', $event.target.value)" :placeholder="placeholder" :disabled="isDisabled"/>
</template>

<script>
export default {
  props: {
    inputClass: String,
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'number'].includes(value),
    },
    value: [String, Number],
    placeholder: String,
    isDisabled: Boolean,
  }
};
</script>

<style scoped>
</style>