<script setup lang="ts">
import { currentUser } from '@/api'

import SideDrawerProfile from '@/components/molecules/SideDrawerProfile.vue'
import { TaskGroup } from '@/models/TaskGroup'
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
    <Transition name="slide-fade">
      <SideDrawerProfile
        v-if="showProfileMenu"
        :profile-image="profileImage"
        @close="showProfileMenu = !showProfileMenu"
      />
    </Transition>

    <main class="header__background">
      <img
        :src="profileImage"
        @click="onClickProfile"
        referrerpolicy="no-referrer"
        class="avatar"
      />
    </main>
    <ul class="tabs">
      <li
        @click="
          onClickNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID })
        "
      >
        Tarefas
      </li>
      <li @click="onClickNavigate(routeNames.TASK_GROUPS.name, null)">Grupos</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header__background {
  background-color: var(--color-background);
  padding: 1rem;
}

.main {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
}

.avatar {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.5s linear;
}

.slide-fade-leave-active {
  transition: all 0.5s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-300px);
}
</style>
