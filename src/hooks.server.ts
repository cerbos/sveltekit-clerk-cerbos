import type { Handle } from '@sveltejs/kit';
import { verifySession } from '$lib/clerk-svelte/server';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('__session');
  if (sessionToken) {
    try {
      const user = await verifySession();
      if (user) {
        event.locals.user = user;
      }
    } catch (reason) {
      console.warn('warning', reason);
    }
  }
  return resolve(event);
};
