<script setup lang="ts">
import { createAccount, getConfig, login } from '@/api/firebaseApi/'
import CreateTaskForm from '@/components/molecules/CreateTaskForm.vue'
import List from '@/components/organisms/List.vue'
import { TodoListItem } from '@/models'
import { APIs, Api } from '@/models/Api'
import { routeNames } from '@/router/routes'
import { useTodoItemsStore } from '@/stores/todoItems'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const todoItemsStore = useTodoItemsStore()

function onClickCreate(item: TodoListItem) {
  todoItemsStore.addItem(item)
}

function onClickLogin() {
  Api.setInstance(APIs.FIREBASE)
  login().then(() => {
    todoItemsStore.resetStore()
    router.push(routeNames.HOME.path)
  })
}

function onClickSignin() {
  Api.setInstance(APIs.FIREBASE)
  createAccount().then(() => {
    router.push(routeNames.HOME.path)
  })
}

const allowOfflineUsers = computed(() => {
  return getConfig('localstorageOnly')
})

onMounted(() => {
  Api.setInstance(APIs.LOCALSTORAGE)
  todoItemsStore.loadItems('', 0)
})
</script>

<template>
  <main class="main">
    <h1 class="title">Todo App</h1>
    <div class="login">
      <div class="google-btn" @click="onClickLogin">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text"><b>Login with google</b></p>
      </div>

      <div class="google-btn google-btn--signin" @click="onClickSignin">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text"><b>Sign in with google</b></p>
      </div>
    </div>

    <section v-if="!allowOfflineUsers" class="list__container">
      <List />

      <CreateTaskForm @handle-created-item="onClickCreate" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  width: 100%;
  height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--on-surface);
}

.login {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.google-btn {
  padding-right: 20px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  cursor: pointer;
  .google-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: 'Roboto';
  }

  &--signin {
    background-color: $button-active-blue;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

.list__container {
  width: 100%;
}

@media (min-width: 500px) {
  .login {
    flex-direction: row;
  }
}
</style>
