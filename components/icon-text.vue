<template>
  <span>
    <ion-icon v-if="position === 'left'" class="inline-block align-middle" :name="icon" />
    <span class="inline-block">{{ text }}</span>
    <ion-icon v-if="position === 'right'" class="inline-block align-middle" :name="icon" />
  </span>
</template>

<script>
export default {
  name: 'IconText',
  props: {
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'left',
    },
  },
};
</script>
