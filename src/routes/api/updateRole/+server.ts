import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { users } from '$lib/clerk-svelte/server';

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.session) {
    return json({ ok: false, error: 'Users Session not found' });
  }
  const body = await request.json();
  const user = await users.updateUser(locals.session.userId, {
    publicMetadata: {
      role: body.role,
    },
  });
  return json({ ok: true, user });
};
