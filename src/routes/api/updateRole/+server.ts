import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { users, requireSession } from '$lib/clerk-svelte/server';

export const POST: RequestHandler = requireSession(async ({ locals, request }) => {
  const body = await request.json();
  const user = await users.updateUser(locals.session.userId, {
    publicMetadata: {
      role: body.role,
    },
  });
  return json({ ok: true, user });
});
