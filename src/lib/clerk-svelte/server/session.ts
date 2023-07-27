import { createClerkClient } from '@clerk/clerk-sdk-node';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

const clerk = createClerkClient({ apiKey: CLERK_SECRET_KEY });

export const users = clerk.users;

export const verifySession = async (sessionToken?: string) => {
  if (sessionToken) {
    try {
      const claims = await clerk.verifyToken(sessionToken);
      return {
        userId: claims.sub,
        claims,
      };
    } catch (err) {
      console.warn('ERROR', err);
    }
  }
};

export const requireSession = (handler: RequestHandler) => async (event: RequestEvent) => {
  if (!event.locals.session) {
    return json({ ok: false, error: 'Users Session not found' });
  }
  return handler(event);
};
