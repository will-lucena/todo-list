<script setup lang="ts">
import { addToCollection, currentUser, getCollection } from '@/api'
import ModalCreateTask from '@/components/atoms/ModalCreateTask.vue'
import Header from '@/components/molecules/Header.vue'
import List from '@/components/molecules/List.vue'
import type { onChangeItemPayload } from '@/models'
import { TodoListItem } from '@/models'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, reactive, ref } from 'vue'

let data: Array<TodoListItem> = reactive([])
let newTaskTitle = ref('')
let showModalCreateTask = ref(false)

const userStore = useUserStore()

function onChangeItem(payload: onChangeItemPayload) {
  data[payload.index].completed = payload.value
  Object.assign(data[payload.index], { completed: payload.value })
}

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value)
  addToCollection(task)
}

const detailedTaskButtonLabel = computed(() => {
  return showModalCreateTask.value ? 'Fechar' : 'Criar tarefa compartilhada'
})

onMounted(() => {
  if (currentUser) {
    getCollection(currentUser.email!).then((res) => {
      data.push(...res)
    })
  }
})
</script>

<template>
  <Header></Header>

  <List :items="data" @on-change="onChangeItem"></List>

  <div>
    <input type="text" v-model="newTaskTitle" />
    <button @click="onClickCreate">Criar tarefa</button>
  </div>

  <footer>
    <button @click="showModalCreateTask = !showModalCreateTask">
      {{ detailedTaskButtonLabel }}
    </button>
  </footer>

  <ModalCreateTask
    v-if="showModalCreateTask"
    :friends="userStore.user.getFriends()"
    :available-groups="userStore.user.getTaskGroups()"
  />

  <RouterView></RouterView>
</template>
