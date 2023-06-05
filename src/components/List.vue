<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <v-list lines="one">
    <v-list-item v-for="item in items" :key="item.key">
      <v-checkbox :v-model="item.completed" :label="item.label" class="done"></v-checkbox>
    </v-list-item>
  </v-list>
  <v-checkbox label="Checkbox"></v-checkbox>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
