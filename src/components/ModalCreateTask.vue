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
    <form @submit.prevent="submit">
      <input type="text" v-model="title" />
      <select v-model="sharedWith" multiple>
        <option v-for="email in friends" :value="email" :key="email">
          {{ email }}
        </option>
      </select>
      <select v-model="selectedGroup">
        <option v-for="group in availableGroups" :value="group" :key="group">
          {{ group }}
        </option>
      </select>
      <button type="submit">Criar tarefa</button>
    </form>
  </div>
</template>
