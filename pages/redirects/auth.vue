<template>
  <div class="container">
    <p>Redirecting...</p>
  </div>
</template>

<script>
import { query } from '../../components/lynlab-api';

export default {
  created() {
    if (!this.$route.query.accessToken) {
      window.location = 'https://auth.lynlab.co.kr/web/signin?appId=623a8d80-5cdb-4040-9467-0def7d5f5551&redirectUrl=https://lynlab.co.kr/redirects/auth';
    } else {
      this.$storage.setLocalStorage('auth.accessToken', this.$route.query.accessToken);
      this.$storage.setLocalStorage('auth.refreshToken', this.$route.query.refreshToken);
      this.$storage.setLocalStorage('auth.expireAt', this.$route.query.expireAt);

      query('me { isAdmin }', this.$route.query.accessToken).then((data) => {
        if (data.me.isAdmin) {
          this.$storage.setLocalStorage('auth.isAdmin', 'true');
        }
      });

      this.$router.push({ name: 'blog' });
    }
  },
};
</script>
