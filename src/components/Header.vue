<script setup lang="ts">
import { currentUser } from '@/api'
import { signOut } from '@/api/auth'
import { addFriend } from '@/api/collections'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'signOut'): void
}>()

const profileImage = ref(currentUser?.photoURL || '')
const userName = ref(currentUser?.displayName || '')

let showProfileMenu = ref(false)
let showAddContactForm = ref(false)
let emailToAdd = ref('')
const tab = ref(0)

const rules = [
  (value: any) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
      return true
    }
    return 'Email obrigatório'
  }
]
let loading = ref(false)

function onClickProfile() {
  showProfileMenu.value = !showProfileMenu.value
}

function onClickAddContact() {
  showAddContactForm.value = !showAddContactForm.value
}

async function submit() {
  loading.value = true
  await addFriend(emailToAdd.value, useUserStore().user)
  showProfileMenu.value = false
  showAddContactForm.value = false
  emailToAdd.value = ''

  loading.value = false
}

async function onClickSignOut() {
  await signOut()
  emit('signOut')
}
</script>

<template>
  <div class="main">
    <aside v-if="showProfileMenu">
      <img :src="profileImage" />
      <h2>{{ userName }}</h2>

      <ul>
        <li @click="onClickAddContact">Adicionar contato</li>
        <li @click="onClickSignOut">Desconectar</li>
      </ul>

      <form @submit.prevent="submit">
        <label for="email">Email</label>
        <input type="text" v-model="emailToAdd" name="email" />

        <div>
          <button type="submit">Adicionar</button>
          <button type="reset">Cancelar</button>
        </div>
      </form>
    </aside>

    <main class="header__background">
      <img :src="profileImage" @click="onClickProfile" />
    </main>
    <ul>
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
</style>
