<template>
  <Select :class="inputClass" v-model="selectedOption" @change="$emit('input', selectedOption)" :placeholder="placeholder">
    <Option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</Option>
  </Select>
</template>
<script>

export default({
  props: {
    inputClass: String,
    options: {
      type: Array,
      default: () => [],
    },
    value: [String, Number],
    placeholder: String
  },
  data() {
    return {
      selectedOption: this.value,
    };
  },
})
</script>

<style scoped>
</style>
