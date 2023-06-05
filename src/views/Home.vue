<template>
  <Header></Header>

  <List :items="data"></List>

  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { currentUser, getCollection } from '@/api'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import type { TodoListItem } from '@/models'
import { onMounted, reactive } from 'vue'

let data = reactive(new Array<TodoListItem>())

onMounted(() => {
  if (currentUser) {
    console.log(currentUser)
    getCollection(currentUser.uid).then((res) => {
      console.log(res)
      data.push(...res)
    })
  }
})
</script>
