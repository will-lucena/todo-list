<script setup lang="ts">
import { currentUser, getCollection } from '@/api'
import List from '@/components/molecules/List.vue'
import type { TodoListItem, onChangeItemPayload } from '@/models'
import { onMounted, reactive } from 'vue'

let data: Array<TodoListItem> = reactive([])

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.email!).then((res) => {
      data.push(...res)
    })
  }
})
</script>

<template>
  <List :items="data" @on-change="onChangeItem"></List>
</template>
