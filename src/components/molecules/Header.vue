<script setup lang="ts">
import { currentUser } from '@/api'

import SideDrawerProfile from '@/components/molecules/SideDrawerProfile.vue'
import { routeNames } from '@/router/routes'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'navigate', page: string, params: any): void
}>()

const profileImage = ref(currentUser?.photoURL || '')
let showProfileMenu = ref(false)

const tab = ref(0)

function onClickProfile() {
  showProfileMenu.value = !showProfileMenu.value
}

function onClickNavigate(event: string, params: any) {
  emit('navigate', event, params)
}
</script>

<template>
  <div class="main">
    <SideDrawerProfile
      v-if="showProfileMenu"
      :profile-image="profileImage"
      @close="showProfileMenu = !showProfileMenu"
    />

    <main class="header__background">
      <img :src="profileImage" @click="onClickProfile" referrerpolicy="no-referrer" />
    </main>
    <ul class="tabs">
      <li @click="onClickNavigate(routeNames.TASKS.name, { taskGroupId: 0 })">Tarefas</li>
      <li @click="onClickNavigate(routeNames.TASK_GROUPS.name, null)">Grupos</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header__background {
  background-color: var(--color-background);
  padding: 1rem 2rem;
}

.main {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
}
</style>
