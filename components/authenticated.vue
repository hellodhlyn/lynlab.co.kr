<template>
  <div class="authenticated">
    <div v-if="authenticated">
      <slot />
    </div>
    <div v-else id="error" class="container">
      <div>
        <h1>403</h1>
        <p>Permission required</p>

        <nuxt-link :to="{ name: 'redirects-auth' }">
          <button>Login</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { query } from './lynlab-api';

export default {
  data() {
    return {
      authenticated: false,
    };
  },
  created() {
    const accessToken = this.$storage.getLocalStorage('auth.access_token');
    if (accessToken) {
      query('me { isAdmin }', accessToken).then((data) => {
        if (data.me.isAdmin) {
          this.authenticated = true;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.authenticated #error {
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
