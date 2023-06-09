<script setup lang="ts">
import { addToCollection } from '@/api'
import type { onChangeItemPayload } from '@/models'
import { TodoListItem } from '@/models'

const props = defineProps<{
  items: Array<TodoListItem>
}>()

const emit = defineEmits<{
  (e: 'onChange', payload: onChangeItemPayload): void
}>()

function onChange(value: any, index: number) {
  addToCollection(Object.assign(props.items[index], { completed: value.target?.checked || false }))
  emit('onChange', { index, value: value.target?.checked })
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.key">
      <input
        type="checkbox"
        :name="item.key"
        :checked="item.completed"
        :class="{ done: item.completed }"
        @change="onChange($event, index)"
      />
      <label :for="item.key">{{ item.label }}</label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
