<script setup lang="ts">
import { getConfig } from '@/api/firebaseApi'
import Button from '@/components/atoms/Button.vue'
import ModalCreateTask from '@/components/atoms/ModalCreateTask.vue'
import CreateTaskForm from '@/components/molecules/CreateTaskForm.vue'
import HeaderGroup from '@/components/molecules/HeaderGroup.vue'
import { TodoListItem } from '@/models'
import { TaskGroup } from '@/models/TaskGroup'
import { routeNames } from '@/router/routes'
import { useTodoItemsStore } from '@/stores/todoItems'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

let showModalCreateTask = ref(false)
let forceTab = ref(0)
const router = useRouter()

const userStore = useUserStore()
const todoItemsStore = useTodoItemsStore()

const showCreateSharedTask = computed(() => {
  return getConfig('createSharedTask')
})

function onClickCreate(item: TodoListItem) {
  todoItemsStore.addItem(item)
}

function onNavigate(page: string, params: any, tab: number) {
  forceTab.value = tab
  router.push({ name: page, params })
}

function onNavigateToTask() {
  forceTab.value = 0
}

const detailedTaskButtonLabel = computed(() => {
  return showModalCreateTask.value ? 'Fechar' : 'Criar tarefa compartilhada'
})

onMounted(() => {
  setTimeout(() => {
    onNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID }, 0)
  }, 1000)
})
</script>

<template>
  <HeaderGroup @navigate="onNavigate" :forceTab="forceTab" />

  <ModalCreateTask
    v-if="showModalCreateTask"
    :friends="userStore.user.getFriends()"
    :available-groups="userStore.user.getTaskGroups()"
  />

  <RouterView @navigateToTask="onNavigateToTask"></RouterView>

  <CreateTaskForm @handle-created-item="onClickCreate" />

  <footer>
    <Button v-if="showCreateSharedTask" @click="showModalCreateTask = !showModalCreateTask">
      {{ detailedTaskButtonLabel }}
    </Button>
  </footer>
</template>
