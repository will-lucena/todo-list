<script setup lang="ts">
import { getConfig } from '@/api'
import ModalCreateTask from '@/components/atoms/ModalCreateTask.vue'
import Header from '@/components/molecules/Header.vue'
import { TodoListItem } from '@/models'
import { TaskGroup } from '@/models/TaskGroup'
import { routeNames } from '@/router/routes'
import { useTodoItemsStore } from '@/stores/todoItems'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

let newTaskTitle = ref('')
let showModalCreateTask = ref(false)
let forceTab = ref(0)
const router = useRouter()

const userStore = useUserStore()
const todoItemsStore = useTodoItemsStore()

const showCreateSharedTask = computed(() => {
  return getConfig('createSharedTask')
})

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value, undefined, 0)
  todoItemsStore.addItem(task)
  newTaskTitle.value = ''
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

function setTheme() {
  var storedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)
}

onMounted(() => {
  setTheme()

  setTimeout(() => {
    onNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID }, 0)
  }, 1000)
})
</script>

<template>
  <Header @navigate="onNavigate" :forceTab="forceTab"></Header>

  <ModalCreateTask
    v-if="showModalCreateTask"
    :friends="userStore.user.getFriends()"
    :available-groups="userStore.user.getTaskGroups()"
  />

  <RouterView @navigateToTask="onNavigateToTask"></RouterView>

  <form @submit.prevent="onClickCreate" class="input__container">
    <input type="text" v-model="newTaskTitle" placeholder="Digitar tarefa" />
    <button type="submit" class="button">Criar tarefa</button>
  </form>

  <footer>
    <button v-if="showCreateSharedTask" @click="showModalCreateTask = !showModalCreateTask">
      {{ detailedTaskButtonLabel }}
    </button>
  </footer>
</template>

<style lang="scss" scoped>
.input__container {
  position: fixed;
  bottom: 0;
  width: 100%;

  max-width: 1140px;
  margin: 0 auto;

  background-color: var(--quaternary);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

input[type='text'],
[type='email'],
select,
textarea {
  margin-bottom: 1rem;
  padding: 0 0 0.875rem 0;
  background: none;
  border: none;
  border-bottom: solid 2px var(--inverse-secondary);
  color: var(--inverse-quaternary);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

input[type='text']:focus,
[type='email']:focus,
textarea:focus {
  outline: none;
  padding: 0 0 0.875rem 0;
}

@media (min-width: 500px) {
  .input__container {
    flex-direction: column;
  }
}
</style>
