<script>
export default {
  created() {
    this.$localStorage.set('auth.access_token', this.$route.query.access_token);
    this.$localStorage.set('auth.refresh_token', this.$route.query.refresh_token);
    this.$router.push({ name: 'blog' });
  },
};
</script>
