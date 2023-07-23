<script setup lang="ts">
import { currentUser } from '@/api'

import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'expand-profile'): void
  (e: 'logout'): void
  (e: 'switch-theme'): void
}>()

const profileImage = ref(currentUser?.photoURL || '')

function onClickProfile() {
  emit('expand-profile')
}

async function onClickLogout() {
  emit('logout')
}

function switchTheme() {
  emit('switch-theme')
}
</script>

<template>
  <header class="header__background">
    <img :src="profileImage" @click="onClickProfile" referrerpolicy="no-referrer" class="avatar" />

    <h1 class="header__title">Todo App</h1>

    <section class="header__actions">
      <font-awesome-icon
        icon="fa-solid fa-circle-half-stroke"
        size="2xl"
        class="action-icon"
        @click="switchTheme"
      />

      <font-awesome-icon
        icon="fa-solid fa-arrow-right-from-bracket"
        size="2xl"
        class="action-icon"
        @click="onClickLogout"
      />
    </section>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__background {
    background-color: var(--surface-container);
    padding: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--on-surface);
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
}

.action-icon {
  cursor: pointer;

  &:hover {
    color: var(--on-surface-variant);
  }
}

.avatar {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
</style>
