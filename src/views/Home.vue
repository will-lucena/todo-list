<script setup lang="ts">
import { addToCollection } from '@/api'
import ModalCreateTask from '@/components/atoms/ModalCreateTask.vue'
import Header from '@/components/molecules/Header.vue'
import { TodoListItem } from '@/models'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

let newTaskTitle = ref('')
let showModalCreateTask = ref(false)
const router = useRouter()

const userStore = useUserStore()

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value, undefined, 0)
  addToCollection(task)
}

function onNavigate(page: string, params: any) {
  router.push({ name: page, params })
}

const detailedTaskButtonLabel = computed(() => {
  return showModalCreateTask.value ? 'Fechar' : 'Criar tarefa compartilhada'
})
</script>

<template>
  <Header @navigate="onNavigate"></Header>

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
