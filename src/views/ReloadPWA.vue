<template>
  <div v-if="offlineReady || needRefresh">
    <div class="app-message">
      <span> {{ appMessage }} </span>
      <button @click="close" class="button">Ok</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed } from 'vue'
const { offlineReady, needRefresh } = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, intervalMS)
  }
})
async function close() {
  offlineReady.value = false
  needRefresh.value = false
}
const intervalMS = 60 * 60 * 1000

const appMessage = computed(() => {
  return offlineReady
    ? 'Aplicativo pronto pra funcionar offline'
    : 'Novo conteúdo disponível, recarregue para atualizar'
})
</script>

<style scoped>
.app-message {
  position: relative;
  top: 30px;
  left: 0;
  width: 75%;

  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 2rem 1rem;
  flex-wrap: wrap;
  z-index: 5;
  background-color: var(--color-black);

  border-radius: 8px;
}
</style>
