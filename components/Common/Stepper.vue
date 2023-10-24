<template>
  <div class="wrapper option-1 option-1-1">
    <ol class="c-stepper">
      <li v-for="(step, index) in steps" class="c-stepper__item cursor-pointer"
        :class="{ 'active-cicle': index <= valueIndex, 'active-spacing': index + 1 <= valueIndex }"
        @click="handleChangeStep(step)">
        <h3 class="c-stepper__title">{{ `${$t("step")} ${index + 1}` }}</h3>
        <p class="c-stepper__desc">{{ step.title }}</p>
      </li>
    </ol>
  </div>
</template>
<script setup>
const props = defineProps({
  steps: {
    type: Array,
    default: () => ([])
  },
  modelValue: {
    type: Object,
  },
  allowNext: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:model-value'])
const handleChangeStep = (step) => {
  if (props.allowNext) {
    emit('update:model-value', step)
  }
}
const valueIndex = computed(() => props.steps.findIndex(item => item.key === props.modelValue.key))
</script>
<style>
:root {
  --circle-size: clamp(1.5rem, 5vw, 3rem);
  --spacing: clamp(0.25rem, 2vw, 0.5rem);
}

.c-stepper {
  display: flex;
}

.c-stepper__item {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;

  &:before {
    --size: 3rem;
    content: "";
    display: block;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
    background-color: #A0A0A0;
    opacity: 0.5;
    margin: 0 auto 1rem;
  }

  &:not(:last-child) {
    &:after {
      content: "";
      position: relative;
      top: calc(var(--circle-size) / 2);
      width: calc(100% - var(--circle-size) - calc(var(--spacing) * 2));
      left: calc(50% + calc(var(--circle-size) / 2 + var(--spacing)));
      height: 2px;
      background-color: #e0e0e0;
      order: -1;
    }
  }
}

.c-stepper__item.active-cicle {
  &:before {
    --size: 3rem;
    content: "";
    display: block;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
    background-color: #ed8936;
    opacity: 0.5;
    margin: 0 auto 1rem;
  }
}

.c-stepper__item.active-spacing {
  &:not(:last-child) {
    &:after {
      content: "";
      position: relative;
      top: calc(var(--circle-size) / 2);
      width: calc(100% - var(--circle-size) - calc(var(--spacing) * 2));
      left: calc(50% + calc(var(--circle-size) / 2 + var(--spacing)));
      height: 2px;
      background-color: rgba(237, 137, 54, 0.5);
      order: -1;
    }
  }
}

.c-stepper__title {
  font-weight: bold;
  font-size: clamp(1rem, 4vw, 1.25rem);
  margin-bottom: 0.5rem;
}

.c-stepper__desc {
  color: grey;
  font-size: clamp(0.85rem, 2vw, 1rem);
  padding-left: var(--spacing);
  padding-right: var(--spacing);
}

/*** Non-demo CSS ***/

.wrapper {
  max-width: 1000px;
  margin: 2rem auto 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 1rem;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>