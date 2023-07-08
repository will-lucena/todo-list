<template>
  <div v-if="offlineReady || needRefresh" class="flex flex-wrap" role="alert">
    <div class="app-message">
      <span> {{ appMessage }} </span>
      <button v-if="!needRefresh" @click="updateServiceWorker()" class="button">Recarregar</button>
      <button @click="close" class="button">Ok</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed } from 'vue'
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
async function close() {
  offlineReady.value = false
  needRefresh.value = false
}

const appMessage = computed(() => {
  return offlineReady
    ? 'Aplicativo pronto pra funcionar offline'
    : 'Novo conteúdo disponível, recarregue para atualizar'
})
</script>

<style scoped>
.app-message {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: 100%;
  padding: 2rem 1rem;
  flex-wrap: wrap;
  float: 1;
  background-color: var(--color-background);
}
</style>
