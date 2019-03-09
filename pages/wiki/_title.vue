<script>
export default {
  async fetch({ redirect, params }) {
    redirect(301, `/snippet/${params.title}?redirect=true`);
  },
};
</script>
