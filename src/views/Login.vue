<script setup lang="ts">
import { createAccount, login } from '@/api'
import { routeNames } from '@/router/routes'
import { useRouter } from 'vue-router'
const router = useRouter()

function onClickLogin() {
  login().then(() => {
    router.push(routeNames.HOME.path)
  })
}

function onClickSignin() {
  createAccount().then(() => {
    router.push(routeNames.HOME.path)
  })
}
</script>

<template>
  <div class="about">
    <button @click="onClickLogin">Login</button>
    <button @click="onClickSignin">SignIn</button>
  </div>
</template>
