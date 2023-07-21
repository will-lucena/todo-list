<script setup lang="ts">
import { currentUser } from '@/api'
import TodoItemList from '@/components/molecules/TodoItemList.vue'
import { TodoListItem } from '@/models'
import { useTodoItemsStore } from '@/stores/todoItems'
import { computed, onMounted } from 'vue'
const props = defineProps<{
  taskGroupId: string | number
}>()

const todoItemsStore = useTodoItemsStore()

const todoItems = computed(() => {
  return todoItemsStore.storedItems.filter((el) => !el.completed)
})

const completedItems = computed(() => {
  return todoItemsStore.storedItems.filter((el) => el.completed)
})

function onClickClearCompleted() {
  todoItemsStore.deleteBatch(completedItems.value)
}

function onClickCompleteAllTasks() {
  todoItemsStore.completeBatch(todoItems.value)
}

function onChangeTodoItem(index: number, value: boolean) {
  onChangeItem(todoItems.value, index, value)
}
function onChangeCompletedItem(index: number, value: boolean) {
  onChangeItem(completedItems.value, index, value)
}
function onChangeItem(source: Array<TodoListItem>, index: number, value: boolean) {
  const sourceIndex = todoItemsStore.storedItems.findIndex((el) => el.key === source[index].key)
  todoItemsStore.updateItem(sourceIndex, value)
}

onMounted(() => {
  if (currentUser) {
    todoItemsStore.loadItems(currentUser.email!, Number(props.taskGroupId))
  }
})
</script>

<template>
  <div class="container">
    <TodoItemList
      class="list"
      action-button-label="Concluir tarefas"
      :items="todoItems"
      list-title="Todo"
      @action-click="onClickCompleteAllTasks"
      @change-item="onChangeTodoItem"
    />
    <TodoItemList
      class="list"
      action-button-label="Limpar concluidas"
      :items="completedItems"
      list-title="Done"
      @action-click="onClickClearCompleted"
      @change-item="onChangeCompletedItem"
    />
    <!-- <TodoItemList :items="todoItems" list-title="Todo" @action-click="onClickCompleteAllTasks" />
    <TodoItemList :items="completedItems" list-title="Done" @action-click="onClickClearCompleted" /> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 2rem 1rem;
  background: var(--surface-container);
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
}

@media (min-width: 500px) {
  .container {
    gap: 3rem;
    flex-direction: row;
  }
}
</style>
