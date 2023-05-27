<template>
  {{ pageText }}

  <ul>
    <li v-for="item in data" :key="item.key">
      <input type="checkbox" :checked="item.completed" />
      <label for="">{{ item.label }}</label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { currentUser, getCollection } from '@/api'
import type { TodoListItem } from '@/models'
import { onMounted, reactive } from 'vue'

let pageText = 'opa amigo'
let data = reactive(new Array<TodoListItem>())

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.uid).then((res) => {
      console.log(res)
      data.push(...res)
    })
  } else {
    pageText = 'deu ruim parceiro'
  }
})
</script>
