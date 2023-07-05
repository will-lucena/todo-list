<script setup lang="ts">
import { addToCollection } from '@/api'
import type { onChangeItemPayload } from '@/models'
import { TodoListItem } from '@/models'
import { computed } from 'vue'

const props = defineProps<{
  items: Array<TodoListItem>
  listTitle: string
}>()

const emit = defineEmits<{
  (e: 'onChange', payload: onChangeItemPayload): void
}>()

const itemsCount = computed(() => {
  return `(${props.items.length})`
})

function onChange(value: any, index: number) {
  addToCollection(
    Object.assign(props.items[index], {
      completed: value.target?.checked || false
    })
  )
  emit('onChange', { index, value: value.target?.checked })
}
</script>

<template>
  <ul class="list">
    <header class="list__header">
      <h2 class="header__title">{{ listTitle }}</h2>
      <h2 class="header__counter">{{ itemsCount }}</h2>
    </header>
    <TransitionGroup name="done-undone">
      <li class="list__item" v-for="(item, index) in items" :key="item.key">
        <input
          type="checkbox"
          :id="item.key"
          :checked="item.completed"
          @change="onChange($event, index)"
        />
        <label class="checkbox__label" :data-content="item.label" :for="item.key">
          {{ item.label }}
        </label>
      </li>
    </TransitionGroup>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 10px;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    list-style: none;
    border-top: 1px dashed var(--color-background-inverse);
    padding: 0.5rem 0;
  }
}

input[type='checkbox'] {
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: var(--color-black);
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 5px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: var(--color-white);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: var(--color-white);
    border-color: var(--color-green);
    background: var(--color-green);
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

label {
  position: relative;
  cursor: pointer;
  font-size: 1.5em;
  padding: 0 0.25em 0;
  user-select: none;

  &::before {
    position: absolute;
    content: attr(data-content);
    color: var(--color-light-gray);
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: var(--color-black);
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}

.header {
  &__title {
    position: relative;
    margin: 0;
    padding: 10px 0;
    font-size: 1.2em;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: -10px;
      width: 5px;
      background-color: var(--color-background-inverse);
    }

    &::after {
      display: block;
      float: right;
      font-weight: normal;
    }
  }

  &__counter {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.done-undone-enter-active {
  animation: done 0.5s;
}

.done-undone-leave-active {
  transition: undone 0.3s;
}

@keyframes done {
  0% {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

@keyframes undone {
  0% {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateY(-20px);
  }
  50% {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
