import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { users } from '$lib/clerk-svelte/server';

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user;
  if (!user) {
    return json({ ok: false, error: 'User not found' });
  }
  const body = await request.json();
  users.updateUser(user.id, {
    publicMetadata: {
      role: body.role,
    },
  });
  return json({ ok: true });
};
