<script setup lang="ts">
import { currentUser, getCollection } from '@/api'
import TodoItemList from '@/components/molecules/TodoItemList.vue'
import type { TodoListItem, onChangeItemPayload } from '@/models'
import { computed, onMounted, reactive } from 'vue'
const props = defineProps<{
  taskGroupId: string | number
}>()

let data: Array<TodoListItem> = reactive([])

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

const todoItems = computed(() => {
  return data.filter((el) => !el.completed)
})

const completedItems = computed(() => {
  return data.filter((el) => el.completed)
})

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.email!).then((res) => {
      console.log(res)
      const filteredRes = res.filter((el) => {
        return el.taskGroupId == props.taskGroupId
      })
      data.push(...filteredRes)
    })
  }
})
</script>

<template>
  <div class="container">
    <TodoItemList :items="todoItems" list-title="Todo" @on-change="onChangeItem"></TodoItemList>
    <TodoItemList
      :items="completedItems"
      list-title="Done"
      @on-change="onChangeItem"
    ></TodoItemList>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 2rem 1rem;
  background: var(--color-background);
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
