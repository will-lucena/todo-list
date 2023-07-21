<script setup lang="ts">
import { TodoListItem } from '@/models'
import { computed } from 'vue'
import Button from '../atoms/Button.vue'

const props = defineProps<{
  items: Array<TodoListItem>
  listTitle: string
  actionButtonLabel?: string
}>()

const emit = defineEmits<{
  (e: 'actionClick'): void
  (e: 'changeItem', index: number, value: boolean): void
}>()

const itemsCount = computed(() => {
  return `(${props.items.length})`
})

const showActionButton = computed(() => {
  return props.items.length > 0 && !!props.actionButtonLabel
})

function onChange(value: any, index: number) {
  emit('changeItem', index, value.target?.checked || false)
}
</script>

<template>
  <ul class="list">
    <header class="list__header">
      <h2 class="header__title">{{ listTitle }}</h2>
      <div class="list__header header__action_block">
        <Button v-if="showActionButton" @click="emit('actionClick')" slim>
          {{ actionButtonLabel }}
        </Button>
        <h2 class="header__counter">{{ itemsCount }}</h2>
      </div>
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
    border-top: 1px dashed var(--on-surface);
    padding: 0.5rem 0;
  }
}

input[type='checkbox'] {
  position: relative;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--outline);
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
    left: 4px;
    width: 6px;
    height: 10px;
    border-style: solid;
    border-color: var(--outline);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: var(--on-surface);
    border-color: var(--outline);
    background: var(--surface);
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
  font-size: 1rem;
  padding: 0 0.25rem 0;
  user-select: none;

  &::before {
    position: absolute;
    content: attr(data-content);
    color: var(--surface-highest);
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: var(--on-surface-variant);
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}

.header {
  &__title {
    position: relative;
    margin: 0;
    padding: 10px 0;
    font-size: 1.5rem;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: -10px;
      width: 5px;
      background-color: var(--outline);
    }

    &::after {
      display: block;
      float: right;
      font-weight: normal;
    }
  }

  &__counter {
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  &__action_block {
    gap: 1rem;
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
