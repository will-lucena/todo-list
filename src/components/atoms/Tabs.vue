<script setup lang="ts">
import { getConfig } from '@/api'

import { TaskGroup } from '@/models/TaskGroup'
import { routeNames } from '@/router/routes'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  forceTab: number
}>()

watch(
  () => props.forceTab,
  (newValue) => {
    tab.value = newValue
  }
)

const emit = defineEmits<{
  (e: 'navigate', page: string, params: any, tab: number): void
}>()

const tab = ref(0)

const showTaskGroups = computed(() => {
  return getConfig('taskGroups')
})

function isActive(index: number) {
  return index === tab.value
}

function onClickNavigate(event: string, params: any, index: number) {
  tab.value = index
  emit('navigate', event, params, index)
}
</script>

<template>
  <ul class="tabs">
    <li
      class="tab"
      @click="
        onClickNavigate(routeNames.TASKS.name, { taskGroupId: TaskGroup.PERSONAL_GROUP_ID }, 0)
      "
      :class="{ 'tab--active': isActive(0) }"
    >
      Tarefas
    </li>
    <li
      v-if="showTaskGroups"
      class="tab"
      @click="onClickNavigate(routeNames.TASK_GROUPS.name, null, 1)"
      :class="{ 'tab--active': isActive(1) }"
    >
      Grupos
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: center;
  padding: 0;
}

.tab {
  background-color: var(--surface-container);
  list-style: none;
  flex: 1;
  text-align: center;
  padding: 0.5rem;

  cursor: pointer;

  &--active {
    border-bottom: 1px solid var(--surface-variant);
    border-top: 1px solid var(--surface-variant);
    color: var(--on-surface);
  }
}
</style>
