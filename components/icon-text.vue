<template>
  <ion-item>
    <ion-icon :name="icon" />
    <span>{{ text }}</span>
  </ion-item>
</template>

<style lang="scss" scoped>
ion-item {
  ion-icon, span {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>

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
  },
};
</script>
