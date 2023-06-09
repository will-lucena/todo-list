<script setup lang="ts">
import { addToCollection } from '@/api'
import { TodoListItem } from '@/models'
import { ref } from 'vue'

defineProps<{
  friends: Array<string>
  availableGroups: Array<string>
}>()

let title = ref('')
let sharedWith = ref(Array<string>())
let selectedGroup = ref('')

function submit() {
  const item = new TodoListItem(title.value, [...sharedWith.value], selectedGroup.value)
  addToCollection(item)
}
</script>

<template>
  <div>
    <form @submit.prevent="submit" class="form">
      <section class="form__field">
        <label for="title">Tarefa</label>
        <input type="text" v-model="title" name="title" />
      </section>

      <section class="form__field">
        <label for="sharedWith">Compartilhar com</label>
        <select v-model="sharedWith" name="sharedWith" multiple>
          <option v-for="email in friends" :value="email" :key="email">
            {{ email }}
          </option>
        </select>
      </section>

      <section class="form__field">
        <label for="group">Grupo</label>
        <select v-model="selectedGroup" name="group">
          <option v-for="group in availableGroups" :value="group" :key="group">
            {{ group }}
          </option>
        </select>
      </section>
      <button type="submit">Criar tarefa</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__field {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
