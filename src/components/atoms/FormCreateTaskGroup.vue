<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import Button from './Button.vue'

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
  <form @submit.prevent="submit" class="form">
    <label for="email" class="input">
      <input type="text" v-model="name" name="name" class="input__field" placeholder=" " />
      <span class="input__label">Nome do grupo</span>
    </label>

    <div class="form__actions">
      <Button type="submit">Adicionar</Button>
      <Button type="reset" @click="onClickCancel">Cancelar</Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  margin-left: 1rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}

.input {
  position: relative;

  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * 0.5);
    margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * 0.5);
    background: pink;
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    background: var(--color-background);
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }

  &__field {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 3px solid currentColor;
    padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
    color: currentColor;
    background: transparent;
    border-radius: var(--size-radius);

    &:focus,
    &:not(:placeholder-shown) {
      & + .input__label {
        transform: translate(0.25rem, -65%) scale(0.8);
        color: var(--color-accent);
      }
    }
  }
}
</style>
