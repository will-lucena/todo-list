<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { currentUser, getFriends } from './api'
const router = useRouter()

import { routeNames } from '@/router/routes'
import { getTaskGroups } from './api/collections'
import { User } from './models'
import { useUserStore } from './stores/user'
import ReloadPWA from './views/ReloadPWA.vue'

const userStore = useUserStore()

onMounted(async () => {
  if (!currentUser) {
    router.push(routeNames.LOGIN.path)
  } else {
    const friends = await getFriends(currentUser.email!)
    const taskGroups = await getTaskGroups(currentUser.email!)
    const user = new User(
      currentUser.uid,
      currentUser.email!,
      currentUser.displayName,
      currentUser.photoURL,
      friends,
      taskGroups
    )
    userStore.updateUser(user)
    router.push(routeNames.HOME.path)
  }
})
</script>

<template>
  <ReloadPWA />
  <RouterView />
</template>
