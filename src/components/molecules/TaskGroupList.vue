<script setup lang="ts">
import type { TaskGroup } from '@/models/TaskGroup'

defineProps<{
  items: Array<TaskGroup>
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
    <li v-for="(item, index) in items" :name="item.name" :key="index" @click="onClick(index)">
      <label :for="item.name">{{ item.name }}</label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
