import { error } from '@sveltejs/kit';
import { GRPC as Cerbos } from '@cerbos/grpc';
import { users } from '$lib/clerk-svelte/server';
import { getDocumentById, getDocumentAttributesById } from '$lib/db';
import type { PageServerLoad } from './$types';

const cerbos = new Cerbos('localhost:3593', { tls: false });

export const load: PageServerLoad = async ({ locals, params }) => {
  // fetch the user from the session
  const user = await users.getUser(locals.session.userId);
  // cerbos requires an array of `roles` so we just wrap `role` in an array
  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : ['user'];
  // query for the minimal infomation needed to pass to cerbos for an authorization check
  const documentAttrs = await getDocumentAttributesById(params.id);

  // if we can't find a document matching the route param id, throw a 404
  if (!documentAttrs) {
    throw error(404, 'Document not found');
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (documentAttrs?.author === 'tbd') {
    documentAttrs.author = user.id;
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
};
