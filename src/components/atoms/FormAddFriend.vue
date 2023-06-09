<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

let loading = ref(false)
let email = ref('')

// const rules = [
//   (value: any) => {
//     if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
//       return true
//     }
//     return 'Email obrigatório'
//   }
// ]

async function submit() {
  loading.value = true
  await useUserStore().addFriend(email.value)
  email.value = ''
  loading.value = false
  emit('success')
}

function onClickCancel() {
  email.value = ''
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="email">Email</label>
    <input type="text" v-model="email" name="email" />

    <div>
      <button type="submit">Adicionar</button>
      <button type="reset" @click="onClickCancel">Cancelar</button>
    </div>
  </form>
</template>
