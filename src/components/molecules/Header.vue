<script setup lang="ts">
import { currentUser } from '@/api'

import SideDrawerProfile from '@/components/molecules/SideDrawerProfile.vue'
import { ref } from 'vue'

const profileImage = ref(currentUser?.photoURL || '')
let showProfileMenu = ref(false)

const tab = ref(0)

function onClickProfile() {
  showProfileMenu.value = !showProfileMenu.value
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
      <li>Tarefas</li>
      <li>Grupos</li>
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
