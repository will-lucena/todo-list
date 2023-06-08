<script setup lang="ts">
import { currentUser } from '@/api'
import { addFriend } from '@/api/collections'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

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
</script>

<template>
  <v-layout class="main">
    <v-navigation-drawer temporary v-model="showProfileMenu">
      <v-list-item :prepend-avatar="profileImage" :title="userName"></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-plus"
          title="Adicionar contato"
          value="add-contact"
          @click="onClickAddContact"
        ></v-list-item>
      </v-list>

      <v-sheet v-if="showAddContactForm" class="mx-auto px-4">
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <v-text-field v-model="emailToAdd" :rules="rules" label="Email"></v-text-field>

          <div class="d-flex flex-row flex-wrap">
            <v-btn :loading="loading" type="submit" block class="mt-2" text="Adicionar"></v-btn>
            <v-btn :loading="loading" type="reset" block class="mt-2" text="Cancelar"></v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-navigation-drawer>

    <v-main class="header__background">
      <v-avatar color="surface-variant" size="48" @click.stop="onClickProfile">
        <v-img :width="300" aspect-ratio="16/9" cover :src="profileImage!"></v-img>
      </v-avatar>
    </v-main>
    <v-tabs v-model="tab" color="deep-purple-accent-4" fixed-tabs>
      <v-tab :value="0">Tarefas</v-tab>
      <v-tab :value="1">Grupos</v-tab>
    </v-tabs>
  </v-layout>
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
