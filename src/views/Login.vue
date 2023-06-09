<script setup lang="ts">
import { signIn } from '@/api'
import { routeNames } from '@/router/routes'
import { useRouter } from 'vue-router'
const router = useRouter()

function onClickSignIn() {
  signIn().then(() => {
    router.push(routeNames.HOME.path)
  })
}
</script>

<template>
  <div class="about">
    <button @click="onClickSignIn">Login</button>
  </div>
</template>
