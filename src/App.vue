<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { currentUser } from './api'
const router = useRouter()

import { routeNames } from '@/router/routes'

onMounted(() => {
  console.log(currentUser)
  if (!currentUser) {
    router.push(routeNames.LOGIN.path)
  } else {
    router.push(routeNames.HOME.path)
  }
})
</script>

<template>
  <RouterView />
</template>
