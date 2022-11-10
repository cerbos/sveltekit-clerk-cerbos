<script lang="ts">
  import Card from '$lib/components/Card/Card.svelte';
  import Prism from './Prism.svelte';
  import { getClerkStore } from '$lib/clerk-svelte';

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
  let user = $clerk?.user;
  let id = user?.id;
  let apiSample: string = `import { requireSession, users } from "@clerk/nextjs/api";
import { GRPC as Cerbos } from "@cerbos/grpc";
const cerbos = new Cerbos("localhost:3593");

export default requireSession(async (req, res) => {
  const user = await users.getUser("${id}");

  const roles = user.publicMetadata.role
    ? [user.publicMetadata.role]
    : ["user"];

  const cerbosPayload = {
    principal: {
      id: "${id}",
      roles, //roles from Clerk profile
      attributes: user,
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: "${id}", // faked to demostrate ownership policy
            lastUpdated: "2021-10-10",
          },
        },
        // the list of actions on the resource to check authorization for
        actions: ["read", "create", "update", "delete"],
      },

      {
        resource: {
          kind: "contact",
          id: "2",
          attributes: {
            owner: "somerUserId",
            lastUpdated: "2021-10-10",
          },
        },
        // the list of actions on the resource to check authorization for
        actions: ["read", "create", "update", "delete"],
      },
    ],
  };

  const result = await cerbos.checkResources(cerbosPayload);

  // make decisions baased on the result
  // if(result.isAllowed({
  //   resource: {
  //     kind: "contact",
  //     id: "1",
  //   },
  //   action: "edit",
  // })) {
  //  ... can do edit action on resource ID 1
  // }

  // return the payload for demo purposes
  res.json(result.results);
});
`;
  let response: Promise<{ resource: Contact; actions: Actions; validationErrors: unknown[] }[]>;
  let tableResults: { resource: Contact; actions: Actions; validationErrors: unknown[] }[];
  $: response?.then((data) => {
    tableResults = data;
  });

  const makeRequest = (e: Event) => {
    e.preventDefault();
    response = new Promise((res) =>
      setTimeout(
        () =>
          res([
            {
              resource: {
                id: '1',
                kind: 'contact',
                policyVersion: '',
                scope: '',
              },
              actions: {
                delete: 'EFFECT_ALLOW',
                update: 'EFFECT_ALLOW',
                create: 'EFFECT_ALLOW',
                read: 'EFFECT_ALLOW',
              },
              validationErrors: [],
            },
            {
              resource: {
                id: '2',
                kind: 'contact',
                policyVersion: '',
                scope: '',
              },
              actions: {
                delete: 'EFFECT_DENY',
                update: 'EFFECT_DENY',
                create: 'EFFECT_ALLOW',
                read: 'EFFECT_ALLOW',
              },
              validationErrors: [],
            },
          ]),
        1000
      )
    );
  };
</script>

<div class="api-request">
  <h2>Demo: Access API authorized by Cerbos</h2>
  <p>
    Now that you are authenticated as {user?.primaryEmailAddress} the following makes a request to the
    API endpoint of a sample CRM application. This will call Cerbos to check that you are authorized
    based on the resources being requested. The result will be returned below demonstrating the authorization
    decision from Cerbos.
  </p>

  <Card on:click={makeRequest} title="fetch('/api/getResources')">
    <img slot="icon" src="/icons/server.svg" alt="" />
    <p>
      Retrieve what permissions a user has on resouces based on upon Cerbos policies. The backend
      will make an authorization call to the Cerbos instance using your Clerk identity and two
      sample resouces.
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
    {#await tableResults then authz}
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
          {#each authz as { resource, actions }}
            <tr>
              <td>{resource.id}</td>
              <td>{actions?.read == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
              <td>{actions?.update == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
              <td>{actions?.delete == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/await}
  {/if}

  {#if !response}
    <Prism source="// Click above to run the request" />
  {:else}
    {#await response}
      <Prism source="// Loading..." />
    {:then responseJSON}
      <Prism source={JSON.stringify(responseJSON, null, 2)} />
    {:catch error}
      <Prism source="// There was an error with the request. Please contact support@clerk.dev" />
    {/await}
  {/if}

  <h4>/api/getResources</h4>
  <Prism source={apiSample} />
</div>

<style lang="scss">
  .api-request {
    margin-bottom: 4rem;
  }
  h2 {
    text-align: center;
  }
  h4 {
    margin-bottom: 0;
  }
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
