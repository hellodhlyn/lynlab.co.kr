<template>
  <div class="container">
    <p>Redirecting...</p>
  </div>
</template>


<script>
export default {
  created() {
    if (!this.$route.query.access_token) {
      window.location = 'https://auth.lynlab.co.kr/web/signin?redirect_url=https://lynlab.co.kr/redirects/auth';
    } else {
      this.$storage.setLocalStorage('auth.access_token', this.$route.query.access_token);
      this.$storage.setLocalStorage('auth.refresh_token', this.$route.query.refresh_token);
      this.$router.push({ name: 'blog' });
    }
  },
};
</script>
