<script setup lang="ts">
import { currentUser } from '@/api/firebaseApi'
import { Api, APIs } from '@/models/Api'
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()

import { User } from '@/models'
import { routeNames } from '@/router/routes'
import { useUserStore } from '@/stores/user'

import ReloadPWA from '@/views/ReloadPWA.vue'

const userStore = useUserStore()

onMounted(async () => {
  Api.setInstance(APIs.LOCALSTORAGE)

  if (!currentUser) {
    router.push(routeNames.LOGIN.path)
  } else {
    Api.setInstance(APIs.FIREBASE)
    const friends = await Api.getInstance().getFriends(currentUser.email!)
    const taskGroups = await Api.getInstance().getTaskGroups(currentUser.email!)
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
  <RouterView />
  <ReloadPWA class="pwa" />
</template>

<style lang="scss" scoped>
.pwa {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
</style>
