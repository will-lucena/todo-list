<script setup lang="ts">
import { addToCollection } from '@/api'
import type { onChangeItemPayload, TodoListItem } from '@/models'

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
  <v-list lines="one">
    <v-list-item v-for="(item, index) in items" :key="item.key">
      <v-checkbox
        :model-value="item.completed"
        :label="item.label"
        :class="{ done: item.completed }"
        @change="onChange($event, index)"
      ></v-checkbox>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
