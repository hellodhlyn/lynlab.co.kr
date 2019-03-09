<template>
  <div id="error">
    <div>
      <h1>{{ statusCode }}</h1>
      <p>{{ message }}</p>

      <nuxt-link :to="{ name: 'blog' }">
        <button>Back to home</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      statusCode: (this.error && this.error.statusCode) || 500,
      message: this.error.message || 'Something\'s wrong...',
    };
  },
};
</script>

<style lang="scss">
#error {
  display: flex;
  height: calc(70vh);
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  text-align: center;

  h1 {
    font-size: 600%;
    margin: 0;
  }

  p {
    margin-top: 0px;
    font-size: 150%;
  }
}
</style>
