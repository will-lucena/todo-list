<script setup lang="ts">
import { currentUser } from '@/api'
import { signOut } from '@/api/auth'
import FormAddFriend from '@/components/atoms/FormAddFriend.vue'
import FormCreateTaskGroup from '@/components/atoms/FormCreateTaskGroup.vue'
import { routeNames } from '@/router/routes'
import { ref } from 'vue'
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

function onClickAddContact() {
  showAddContactForm.value = !showAddContactForm.value
}

function onClickCreateGroup() {
  showGroupCreationForm.value = !showGroupCreationForm.value
}

async function onClickSignOut() {
  await signOut()
  router.push(routeNames.LOGIN.path)
}
</script>

<template>
  <aside>
    <img :src="profileImage" referrerpolicy="no-referrer" @click="emit('close')" />
    <h2>{{ userName }}</h2>

    <ul>
      <li @click="onClickAddContact">
        Adicionar contato

        <FormAddFriend
          v-if="showAddContactForm"
          @cancel="showAddContactForm = !showAddContactForm"
          @success="showAddContactForm = !showAddContactForm"
        />
      </li>
      <li @click="onClickCreateGroup">
        Criar grupo

        <FormCreateTaskGroup
          v-if="showGroupCreationForm"
          @cancel="showGroupCreationForm = !showGroupCreationForm"
          @success="showGroupCreationForm = !showGroupCreationForm"
        />
      </li>
      <li @click="onClickSignOut">Desconectar</li>
    </ul>
  </aside>
</template>
