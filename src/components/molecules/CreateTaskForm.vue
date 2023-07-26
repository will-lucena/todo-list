<script setup lang="ts">
import { TodoListItem } from '@/models'
import { ref } from 'vue'
import Button from '../atoms/Button.vue'

const emit = defineEmits<{
  (e: 'handleCreatedItem', item: TodoListItem): void
}>()

let newTaskTitle = ref('')

function onClickCreate() {
  const task = new TodoListItem(newTaskTitle.value, undefined, 0)
  emit('handleCreatedItem', task)
  newTaskTitle.value = ''
}
</script>

<template>
  <form class="input__container">
    <input type="text" v-model="newTaskTitle" placeholder="Digitar tarefa" />
    <Button type="submit" @submit="onClickCreate">Criar tarefa</Button>
  </form>
</template>

<style lang="scss" scoped>
.input__container {
  position: fixed;
  bottom: 0;
  width: 100%;

  max-width: 1140px;
  margin: 0 auto;

  background-color: var(--surface-container);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

input[type='text'],
[type='email'],
select,
textarea {
  background: none;
  border: none;
  border-bottom: solid 2px var(--outline);
  color: var(--on-surface);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

input[type='text']:focus,
[type='email']:focus,
textarea:focus {
  outline: none;
  padding: 0 0 0.875rem 0;
}

@media (min-width: 500px) {
  .input__container {
    flex-direction: column;
  }
}
</style>
