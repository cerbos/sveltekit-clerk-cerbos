import { json } from '@sveltejs/kit';
import { GRPC as Cerbos } from '@cerbos/grpc';
import type { RequestHandler } from './$types';
import { users } from '$lib/clerk-svelte/server';

const cerbos = new Cerbos('localhost:3593', { tls: false });

export const POST: RequestHandler = async ({ locals }) => {
  if (!locals.session) {
    return json({ ok: false, error: 'Session not found' });
  }

  const user = await users.getUser(locals.session.userId);

  if (!user) {
    return json({ ok: false, error: 'User not found' });
  }

  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : ['user'];
  const email =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? null;

  const cerbosPayload = {
    principal: {
      id: user.id,
      roles, //roles from Clerk profile
      attributes: { email },
    },
    resources: [
      {
        resource: {
          kind: 'contact',
          id: '1',
          attributes: {
            owner: user.id,
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ['read', 'create', 'update', 'delete'],
      },

      {
        resource: {
          kind: 'contact',
          id: '2',
          attributes: {
            owner: 'test2',
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ['read', 'create', 'update', 'delete'],
      },
    ],
  };
  console.log(cerbosPayload);

  const result = await cerbos.checkResources(cerbosPayload);
  return json(result);
};