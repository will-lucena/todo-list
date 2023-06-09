<template>
  <Header @sign-out="onSignOut"></Header>

  <List :items="data" @on-change="onChangeItem"></List>

  <div>
    <input type="text" v-model="newTaskTitle" />
    <button @click="onClickCreate">create</button>
  </div>

  <ModalCreateTask
    :friends="userStore.user.getFriends()"
    :available-groups="userStore.user.getTaskGroups()"
  />

  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { addToCollection, currentUser, getCollection } from '@/api'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import ModalCreateTask from '@/components/ModalCreateTask.vue'
import type { onChangeItemPayload } from '@/models'
import { TodoListItem } from '@/models'
import { routeNames } from '@/router/routes'
import { useUserStore } from '@/stores/user'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let data: Array<TodoListItem> = reactive([])
let newTaskTitle = ref('')

const userStore = useUserStore()

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value)
  addToCollection(task)
}

function onSignOut() {
  router.push(routeNames.LOGIN.path)
}

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.email!).then((res) => {
      data.push(...res)
    })
  }
})
</script>
