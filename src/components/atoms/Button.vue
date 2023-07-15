<script setup lang="ts">
const props = defineProps({
  label: {
    type: String
  },
  buttonType: {
    type: String as () => 'submit' | 'reset' | 'button' | undefined,
    default: 'button',
    validator(value: string) {
      return ['submit', 'reset', 'button', undefined].includes(value)
    }
  },
  slim: Boolean
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'submit'): void
  (e: 'reset'): void
}>()

function onClick(event: Event) {
  event.preventDefault()
  if (props.buttonType === 'submit') {
    emit('submit')
    return
  }

  emit('click')
}
</script>

<template>
  <button
    :type="buttonType"
    @click="onClick"
    class="button"
    :class="{
      'button--slim': slim
    }"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  background: none;
  border: solid 2px var(--inverse-secondary);
  color: var(--inverse-secondary);
  cursor: pointer;
  display: inline-block;
  font-family: 'Helvetica', Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
  outline: none;
  padding: 8px 16px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.button--slim {
  padding: 4px 8px;
  border: none;
  border-bottom: solid 2px var(--inverse-secondary);
}

.button:hover {
  background: var(--inverse-tertiary);
  color: var(--inverse-primary);
}
</style>