<script lang="ts">
  import { getClerkStore } from '$lib/clerk-svelte';
  import DocsLink from '$lib/components/DocsLink.svelte';
  import Card from '$lib/components/Card.svelte';
  import CerbosPolicy from '$lib/components/CerbosPolicy.svelte';
  import RoleSelect from '$lib/components/RoleSelect.svelte';
  import APIRequest from '$lib/components/APIRequest.svelte';
  import GuardedRoutes from '$lib/components/GuardedRoutes.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: policySource = data.policySource;
  $: getResourcesApiSource = data.getResourcesApiSource;

  const clerk = getClerkStore();
  $: signedIn = !!$clerk?.user;
</script>

<h1>Cerbos, Clerk and SvelteKit Demo App</h1>
<p class="description">
  Example SvelteKit app using Clerk for authentication and Cerbos for authorization.
</p>

{#if signedIn}
  <section class="role-selection">
    <RoleSelect />
  </section>

  <div class="example-links">
    <Card href="#resource-access" title="Resource Access Demo">
      <img slot="icon" src="/icons/server.svg" alt="" />
    </Card>
    <Card href="#route-guard" title="Route Guard Demo">
      <img slot="icon" src="/icons/lock.svg" alt="" />
    </Card>
  </div>
{:else}
  <section class="login">
    <Card title="Log in/Sign up for an account" href="/sign-up" loading={!$clerk}>
      <img slot="icon" src="/icons/user-plus.svg" alt="" />
      <p>
        Login to your account or sign up for a new account maanged by Clerk.dev. This will provide
        your identity which will be used by Cerbos for authorization.
      </p>
      <img slot="action" src="/icons/arrow-right.svg" alt="" />
    </Card>
  </section>
{/if}

{#if signedIn}
  <section class="cerbos-policy-example">
    <CerbosPolicy {policySource} />
  </section>

  <section id="resource-access" class="demo-resource-authorization">
    <APIRequest {getResourcesApiSource} />
  </section>

  <section id="route-guard" class="demo-route-guards">
    <GuardedRoutes />
  </section>

  <section class="user-profile">
    <h2>Clerk - User Profile</h2>
    <Card title="Manage your Clerk user profile" on:click={() => $clerk?.openUserProfile()}>
      <img slot="icon" src="/icons/layout.svg" alt="" />
      <p>
        Interact with the user button, user profile, and more to preview what your users will see
      </p>
      <img slot="action" src="/icons/arrow-right.svg" alt="" />
    </Card>
  </section>
{/if}

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
  }

  section {
    padding-top: 0.5rem;
    margin-bottom: 2rem;
  }

  .description {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    color: #808080;
    text-align: center;
  }

  .links {
    display: flex;
    flex-direction: column;
    height: 3.5rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .example-links {
    display: flex;
    gap: 1rem;
    width: 100%;

    :global(.card) {
      flex-basis: 50%;
    }
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .description {
      font-size: 1.25rem;
    }

    .links {
      padding-left: 28px;
      flex-direction: row;
      height: inherit;
      margin-top: 4rem;
    }
  }
</style>
