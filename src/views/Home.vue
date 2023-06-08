<template>
  <Header></Header>

  <List :items="data" @on-change="onChangeItem"></List>

  <div>
    <input type="text" v-model="newTaskTitle" />
    <button @click="onClickCreate">create</button>
  </div>

  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { addToCollection, currentUser, getCollection } from '@/api'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import type { onChangeItemPayload } from '@/models'
import { TodoListItem } from '@/models'
import { onMounted, reactive, ref } from 'vue'

let data: Array<TodoListItem> = reactive([])
let newTaskTitle = ref('')

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

function onClickCreate() {
  console.log(newTaskTitle.value)
  const task = new TodoListItem(newTaskTitle.value)
  addToCollection(task)
}

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.email!).then((res) => {
      data.push(...res)
    })
  }
})
</script>
