<script setup lang="ts">
defineProps<{
  items: Array<string>
}>()

const emit = defineEmits<{
  (e: 'selectGroup', index: number): void
}>()

function onClick(index: number) {
  emit('selectGroup', index)
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" @click="onClick(index)">
      <label :for="item">{{ item }}</label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
