<script setup lang="ts">
import { signIn } from '@/api'
import { routeNames } from '@/router/routes'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()

function onClickSignIn() {
  signIn().then((res) => {
    userStore.updateUser(res)
    router.push(routeNames.HOME.path)
  })
}
</script>

<template>
  <div class="about">
    <button @click="onClickSignIn">Login</button>
  </div>
</template>
