<script lang="ts">
  import Prism from '$lib/components/Prism.svelte';
  export let data = {
    title: '???',
    blurb: '',
    icon: 'lock',
  };
</script>

<h1>{data.title}</h1>
<p>{data.blurb}</p>
{#if data.icon}
  <img src={`/icons/${data.icon}.svg`} alt="" />
{/if}

<h4>The load function for this document page:</h4>
<Prism
  source={`export const load: PageServerLoad = async ({ locals, params }) => {
  const user = await users.getUser(locals.session.userId);
  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : ['user'];
  const documentAttrs = await getDocumentAttributesById(params.id);

  if (!documentAttrs) {
    throw error(404, 'Document not found');
  }

  const isAllowed = await cerbos.isAllowed({
    principal: { id: user.id, roles },
    resource: {
      kind: 'document',
      id: params.id,
      attributes: documentAttrs,
    },
    action: 'view',
  });

  if (!isAllowed) {
    throw error(403, 'Forbidden');
  }

  // get the full document for the page
  return getDocumentById(params.id);
};`}
  language="js"
/>

<style lang="scss">
  h1 {
    text-align: center;
  }

  h4 {
    margin: 0;
  }

  img {
    display: block;
    margin: 2rem auto;
    width: 200px;
  }
</style>
