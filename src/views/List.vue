<script setup lang="ts">
import { currentUser, getCollection } from '@/api'
import TodoItemList from '@/components/molecules/TodoItemList.vue'
import type { TodoListItem, onChangeItemPayload } from '@/models'
import { onMounted, reactive } from 'vue'
const props = defineProps<{
  taskGroupId: string | number
}>()

let data: Array<TodoListItem> = reactive([])

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

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
  <TodoItemList :items="data" @on-change="onChangeItem"></TodoItemList>
</template>
