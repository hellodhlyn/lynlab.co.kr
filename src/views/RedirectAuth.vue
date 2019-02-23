<template>
  <div class="container"><p>Redirecting to login...</p></div>
</template>

<script>
export default {
  created() {
    window.location = 'https://auth.lynlab.co.kr/web/signin?callback_url=https://lynlab.co.kr/callbacks/auth';
  },
};
</script>
