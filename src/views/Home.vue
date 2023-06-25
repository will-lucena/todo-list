<script setup lang="ts">
import { addToCollection } from '@/api'
import ModalCreateTask from '@/components/atoms/ModalCreateTask.vue'
import Header from '@/components/molecules/Header.vue'
import { TodoListItem } from '@/models'
import { TaskGroup } from '@/models/TaskGroup'
import { routeNames } from '@/router/routes'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

let newTaskTitle = ref('')
let showModalCreateTask = ref(false)
let forceTab = ref(0)
const router = useRouter()

const userStore = useUserStore()

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value, undefined, 0)
  addToCollection(task)
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
  onNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID }, 0)
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

  <div class="input__container">
    <input type="text" v-model="newTaskTitle" placeholder="Digitar tarefa" />
    <button @click="onClickCreate">Criar tarefa</button>
  </div>

  <footer>
    <button @click="showModalCreateTask = !showModalCreateTask">
      {{ detailedTaskButtonLabel }}
    </button>
  </footer>
</template>

<style lang="scss" scoped>
.input__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

input[type='text'],
[type='email'],
select,
textarea {
  background: none;
  border: none;
  border-bottom: solid 2px #474544;
  color: var(--color-background-inverse);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  padding: 0 0 0.875rem 0;
  // text-transform: uppercase;
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
  padding: 0 0 0.875em 0;
}
</style>
