<script lang="ts">
  import { getClerkStore } from '$lib/clerk-svelte';
  import DocsLink from '$lib/components/DocsLink/DocsLink.svelte';
  import Card from '$lib/components/Card/Card.svelte';

  const clerk = getClerkStore();
</script>

<h1>Clerk + Cerbos Demo App</h1>
<p class="description">
  Example SvelteKit app using Clerk for authentication and Cerbos for authorization.
</p>

<div class="cards">
  {#if $clerk?.user}
    <Card on:click={() => $clerk?.openUserProfile()} title="Manage your Clerk user profile">
      <img slot="icon" src="/icons/layout.svg" alt="" />
      <p class="card-content">
        Interact with the user button, user profile, and more to preview what your users will see
      </p>
      <img slot="action" src="/icons/arrow-right.svg" alt="" />
    </Card>
  {:else}
    <Card href="/sign-up" title="Log in/Sign up for an account" loading={!$clerk}>
      <img slot="icon" src="/icons/user-plus.svg" alt="" />
      <p class="card-content">
        Login to your account or sign up for a new account maanged by Clerk.dev. This will provide
        your identity which will be used by Cerbos for authorization.
      </p>
      <img slot="action" src="/icons/arrow-right.svg" alt="" />
    </Card>
  {/if}
</div>

<div style="width: 800px" />
<!-- <SignedIn>
  <CerbosPolicy />
  <CerbosDemo />
</SignedIn> -->

<div class="links">
  <DocsLink
    href="https://docs.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=sveltekit_starter"
    >Read Clerk documentation
  </DocsLink>
  <DocsLink href="https://docs.cerbos.dev">Read Cerbos documentation</DocsLink>
  <DocsLink href="https://sveltekit.org/docs">Read sveltekit documentation</DocsLink>
</div>

<style lang="scss">
  h1 {
    margin: 0;
    font-size: 1.75rem;
    line-height: 35px;
    text-align: center;
  }

  .description {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: #808080;
    text-align: center;
  }

  .links {
    display: flex;
    flex-direction: column;
    height: 3.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .cards {
    margin: 2rem;
  }

  .card-content {
    margin: 0;
    font-size: 1rem;
    line-height: 1.25;
    color: #808080;
  }

  @media screen and (min-width: 768px) {
    h1 {
      line-height: 50px;
      font-size: 2.5rem;
    }

    .description {
      font-size: 1.25rem;
    }

    .links {
      padding-left: 28px;
      flex-direction: row;
      height: inherit;
    }

    .cards {
      margin: 4rem 0;
    }
  }
</style>
