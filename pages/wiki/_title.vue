<script>
export default {
  async fetch({ redirect, params }) {
    redirect(301, `/snippet/${encodeURI(params.title)}?redirect=true`);
  },
};
</script>
