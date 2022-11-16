import type { Handle } from '@sveltejs/kit';
import { verifySession } from '$lib/clerk-svelte/server';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('__session');
  if (sessionToken) {
    try {
      const session = await verifySession(sessionToken);
      if (session) {
        event.locals.session = session;
      }
    } catch (reason) {
      console.warn('warning', reason);
    }
  }
  return resolve(event);
};
