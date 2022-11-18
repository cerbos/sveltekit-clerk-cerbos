<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  export let disabled = false;
</script>

<h2>Demo: Guarded Routes</h2>
<p>
  For this demo set a <b>role</b> on your Clerk user above and attempt to access the routes below.
  The
  <code>admin</code> role has access to all routes, while the <code>user</code> role only has access
  to the user route.
</p>
<div class="cards">
  <Card href="/documents/1" title="A Route the Admin user role can access" {disabled}>
    <img slot="icon" src="/icons/lock.svg" alt="" />
    <p>
      This route is <b>only</b> accessible by users with the <code>admin</code> role.
    </p>
    <img slot="action" src="/icons/arrow-right.svg" alt="" />
  </Card>

  <Card href="/documents/2" title="A Route the user who owns the resource can access" {disabled}>
    <img slot="icon" src="/icons/external-link.svg" alt="" />
    <p>
      This route is "guarded" by the <code>id</code> of the user matching the <code>author</code>
      property of the <b>document</b> resource.
    </p>
    <img slot="action" src="/icons/arrow-right.svg" alt="" />
  </Card>
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  code {
    padding: 0.1em 0.4em;
    background-color: #f2f2f2;
  }
</style>
