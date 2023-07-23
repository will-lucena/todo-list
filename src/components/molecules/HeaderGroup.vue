<script setup lang="ts">
import { signOut } from '@/api/auth'
import Header from '@/components/atoms/Header.vue'
import Tabs from '@/components/atoms/Tabs.vue'
import { routeNames } from '@/router/routes'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  forceTab: number
}>()

const router = useRouter()

watch(
  () => props.forceTab,
  (newValue) => {
    tab.value = newValue
  }
)

const emit = defineEmits<{
  (e: 'navigate', page: string, params: any, tab: number): void
}>()

let showProfileMenu = ref(false)

const tab = ref(0)

function onClickProfile() {
  showProfileMenu.value = !showProfileMenu.value
}

function onClickNavigate(event: string, params: any, index: number) {
  tab.value = index
  emit('navigate', event, params, index)
}

async function onClickLogout() {
  await signOut()
  router.push(routeNames.LOGIN.path)
}

function onSwitchTheme() {
  var currentTheme = document.documentElement.getAttribute('data-theme')
  var targetTheme = 'light'

  if (currentTheme === 'light') {
    targetTheme = 'dark'
  }

  document.documentElement.setAttribute('data-theme', targetTheme)
  localStorage.setItem('theme', targetTheme)
}
</script>

<template>
  <div class="main">
    <!-- <Transition name="slide-fade">
      <SideDrawerProfile
        v-if="showProfileMenu"
        :profile-image="profileImage"
        @close="showProfileMenu = !showProfileMenu"
      />
    </Transition> -->

    <Header
      @expand-profile="onClickProfile"
      @logout="onClickLogout"
      @switch-theme="onSwitchTheme"
    />

    <Tabs @navigate="onClickNavigate" :force-tab="forceTab" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  justify-content: center;
  padding: 0;
}

.tab {
  background-color: var(--surface-container);
  list-style: none;
  flex: 1;
  text-align: center;
  padding: 0.5rem;

  cursor: pointer;

  &--active {
    border-bottom: 1px solid var(--surface-variant);
    border-top: 1px solid var(--surface-variant);
    color: var(--on-surface);
  }
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
