<script setup lang="ts">
import { currentUser, getConfig } from '@/api'

import { signOut } from '@/api/auth'
import { TaskGroup } from '@/models/TaskGroup'
import { routeNames } from '@/router/routes'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  forceTab: number
}>()

const router = useRouter()

watch(
  () => props.forceTab,
  (newValue) => {
    tab.value = newValue
    console.log(newValue)
  }
)

const emit = defineEmits<{
  (e: 'navigate', page: string, params: any, tab: number): void
}>()

const profileImage = ref(currentUser?.photoURL || '')
let showProfileMenu = ref(false)

const tab = ref(0)

const showTaskGroups = computed(() => {
  return getConfig('taskGroups')
})

function onClickProfile() {
  showProfileMenu.value = !showProfileMenu.value
}

function isActive(index: number) {
  return index === tab.value
}

function onClickNavigate(event: string, params: any, index: number) {
  tab.value = index
  emit('navigate', event, params, index)
}

async function onClickLogout() {
  await signOut()
  router.push(routeNames.LOGIN.path)
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

    <main class="header__background">
      <img
        :src="profileImage"
        @click="onClickProfile"
        referrerpolicy="no-referrer"
        class="avatar"
      />

      <font-awesome-icon
        icon="fa-solid fa-arrow-right-from-bracket"
        size="2xl"
        class="logout-icon"
        @click="onClickLogout"
      />
    </main>
    <ul class="tabs">
      <li
        class="tab"
        @click="
          onClickNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID }, 0)
        "
        :class="{ 'tab--active': isActive(0) }"
      >
        Tarefas
      </li>
      <li
        v-if="showTaskGroups"
        class="tab"
        @click="onClickNavigate(routeNames.TASK_GROUPS.name, null, 1)"
        :class="{ 'tab--active': isActive(1) }"
      >
        Grupos
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header__background {
  background-color: var(--color-background);
  padding: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.logout-icon {
  cursor: pointer;

  &:hover {
    color: var(--color-background-inverse);
  }
}

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
  list-style: none;
  flex: 1;
  text-align: center;
  padding: 0.5rem;

  cursor: pointer;

  &--active {
    border-bottom: 1px solid var(--color-accent);
    color: var(--color-accent);
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
