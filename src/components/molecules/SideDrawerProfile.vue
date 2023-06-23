<script setup lang="ts">
import { currentUser } from '@/api'
import { signOut } from '@/api/auth'
import FormAddFriend from '@/components/atoms/FormAddFriend.vue'
import FormCreateTaskGroup from '@/components/atoms/FormCreateTaskGroup.vue'
import { routeNames } from '@/router/routes'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits<{
  (e: 'close'): void
}>()

defineProps<{
  profileImage: string
}>()

let showAddContactForm = ref(false)
let showGroupCreationForm = ref(false)
const userName = ref(currentUser?.displayName || '')

const hasSubitemOpen = computed(() => {
  return !showAddContactForm.value && !showGroupCreationForm.value
})

function onClickAddContact() {
  toggleContactForm()
}

function toggleContactForm() {
  showAddContactForm.value = !showAddContactForm.value
}

function onClickCreateGroup() {
  showGroupCreationForm.value = !showGroupCreationForm.value
}

function toggleGroupForm() {
  showGroupCreationForm.value = !showGroupCreationForm.value
}

function onClickOutside() {
  emit('close')
}

async function onClickSignOut() {
  await signOut()
  router.push(routeNames.LOGIN.path)
}
</script>

<template>
  <div>
    <div class="side-drawer__container" @click="onClickOutside"></div>
    <aside class="side-drawer">
      <img
        :src="profileImage"
        referrerpolicy="no-referrer"
        @click="onClickOutside"
        class="avatar"
      />
      <h2>{{ userName }}</h2>

      <ul class="list">
        <li v-show="!showGroupCreationForm" class="list__item" @click="onClickAddContact">
          Adicionar contato
        </li>

        <li v-if="showAddContactForm">
          <FormAddFriend @cancel="toggleContactForm" @success="toggleContactForm" />
        </li>

        <li v-show="!showAddContactForm" class="list__item" @click="onClickCreateGroup">
          Criar grupo
        </li>

        <li v-if="showGroupCreationForm">
          <FormCreateTaskGroup @cancel="toggleGroupForm" @success="toggleGroupForm" />
        </li>
        <li v-show="hasSubitemOpen" class="list__item" @click="onClickSignOut">Desconectar</li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.side-drawer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  min-width: 200px;
  max-width: 300px;
  padding: 1rem;

  background-color: var(--color-background);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
}

.avatar {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    padding: 0.5rem;
  }
}
</style>
