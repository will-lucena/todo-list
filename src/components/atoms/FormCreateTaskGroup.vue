<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'cancel'): void
}>()

let loading = ref(false)
let name = ref('')

async function submit() {
  loading.value = true
  await useUserStore().addGroup(name.value)
  name.value = ''
  loading.value = false
  emit('success')
}

function onClickCancel() {
  name.value = ''
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="name">Nome do grupo</label>
    <input type="text" v-model="name" name="name" />

    <div>
      <button type="submit">Adicionar</button>
      <button type="reset" @click="onClickCancel">Cancelar</button>
    </div>
  </form>
</template>
