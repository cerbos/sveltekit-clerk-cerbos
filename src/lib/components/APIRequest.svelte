<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Prism from './Prism.svelte';
  import { getClerkStore } from '$lib/clerk-svelte';

  export let getResourcesApiSource = '';

  interface Contact {
    id: string;
    [key: string]: unknown;
  }

  interface Actions {
    create?: string;
    read?: string;
    update?: string;
    delete?: string;
  }

  const clerk = getClerkStore();
  $: user = $clerk?.user;
  $: id = user?.id;
  $: role = user?.publicMetadata.role;

  let response: Promise<{
    results: { resource: Contact; actions: Actions; validationErrors: unknown[] }[];
  }>;
  let tableResults: { resource: Contact; actions: Actions; validationErrors: unknown[] }[];

  // This just caches and shows the previous results when re-fetching
  $: response?.then((data) => {
    tableResults = data.results;
  });

  const makeRequest = async (e: Event) => {
    e.preventDefault();
    if (role) {
      response = fetch('/api/getResources').then((res) => res.json());
    }
  };
</script>

<h2>Demo: Access API authorized by Cerbos</h2>
<p>
  Now that you are authenticated as <b>{user?.primaryEmailAddress}</b> the following makes a request
  to the API endpoint of a sample CRM application. This will call Cerbos to check that you are authorized
  based on the resources being requested. The result will be returned below demonstrating the authorization
  decision from Cerbos.
</p>

<Card
  on:click={makeRequest}
  title={`fetch('/api/getResources')${role ? ` as ${role}` : ''}`}
  disabled={!role}
>
  <img slot="icon" src="/icons/server.svg" alt="" />
  <p>
    Retrieve what permissions a user has on resouces based on upon Cerbos policies. The backend will
    make an authorization call to the Cerbos instance using your Clerk identity and two sample
    resouces.
  </p>
  <img slot="action" src="/icons/download.svg" alt="" />
</Card>

<h4>
  Response <em
    >You are signed in so the actions for two contact resources will be returned based on Cerbos
    policies</em
  >
</h4>

{#if tableResults}
  <table>
    <thead>
      <tr>
        <td>Resource</td>
        <td>Read</td>
        <td>Update</td>
        <td>Delete</td>
      </tr>
    </thead>
    <tbody>
      {#each tableResults as { resource, actions }}
        <tr>
          <td>{resource.id}</td>
          <td>{actions?.read == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
          <td>{actions?.update == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
          <td>{actions?.delete == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

{#if !response}
  {#if !role}
    <Prism source="// You must set a role in the dropdown above" />
  {:else}
    <Prism source="// Click above to run the request" />
  {/if}
{:else}
  {#await response}
    <Prism source="// Loading..." />
  {:then responseJSON}
    <Prism source={JSON.stringify(responseJSON, null, 2)} language="json" />
  {:catch error}
    <Prism source="// There was an error with the request. Please contact support@clerk.dev" />
  {/await}
{/if}

<h4>/api/getResources</h4>
{#await getResourcesApiSource}
  <Prism source="// Loading..." />
{:then responseJSON }
  <Prism source={responseJSON.replaceAll('user.id', `"${id}"`).replaceAll('locals.session.userId', `"${id}"`)} />
{/await}

<style lang="scss">
  h4 em {
    font-weight: normal;
    margin-left: 0.5rem;
  }

  table {
    width: 80%;
    background: #f2f2f2;
    padding: 0.2em;
    margin: 0 auto;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  thead {
    font-weight: 600;
  }
</style>
