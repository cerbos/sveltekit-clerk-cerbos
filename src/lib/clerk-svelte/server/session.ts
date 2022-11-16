import Clerk from '@clerk/clerk-sdk-node/dist/cjs/instance';
import { env } from '$env/dynamic/private';

const clerk = new Clerk({ apiKey: env.CLERK_API_KEY });

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
      console.log('ERROR', err);
    }
  }
};
