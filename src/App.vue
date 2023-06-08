<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { currentUser, getFriends } from './api'
const router = useRouter()

import { routeNames } from '@/router/routes'
import { User } from './models'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(async () => {
  if (!currentUser) {
    router.push(routeNames.LOGIN.path)
  } else {
    const friends = await getFriends(currentUser.email!)
    const user = new User(
      currentUser.uid,
      currentUser.email!,
      currentUser.displayName,
      currentUser.photoURL,
      friends
    )
    userStore.updateUser(user)
    router.push(routeNames.HOME.path)
  }
})
</script>

<template>
  <RouterView />
</template>
