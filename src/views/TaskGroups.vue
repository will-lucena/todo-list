<script setup lang="ts">
import TaskGroupList from '@/components/molecules/TaskGroupList.vue'
import { routeNames } from '@/router/routes'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const taskGroups = ref(userStore.user.getTaskGroups())

function onSelectTaskGroup(index: number) {
  router.push({
    name: routeNames.TASKS.name,
    params: {
      taskGroupId: index
    }
  })
}
</script>

<template>
  <TaskGroupList :items="taskGroups" @select-group="onSelectTaskGroup" />
</template>
