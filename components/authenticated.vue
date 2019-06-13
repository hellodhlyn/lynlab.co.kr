<template>
  <div class="authenticated">
    <div v-if="authenticated">
      <slot />
    </div>
    <div v-else-if="loaded" id="error" class="container">
      <div>
        <h1>403</h1>
        <p>Permission required</p>

        <nuxt-link :to="{ name: 'redirects-auth' }">
          <button>Login</button>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <p>Authorizing...</p>
    </div>
  </div>
</template>

<script>
import { query } from './lynlab-api';

export default {
  data() {
    return {
      loaded: false,
      authenticated: false,
    };
  },
  created() {
    if (parseInt(this.$storage.getLocalStorage('auth.expireAt'), 10) < (new Date()).getTime()) {
      return;
    }

    const accessToken = this.$storage.getLocalStorage('auth.accessToken');
    if (accessToken) {
      query('me { isAdmin }', accessToken).then((data) => {
        if (data.me.isAdmin) {
          this.authenticated = true;
        }
        this.loaded = true;
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
