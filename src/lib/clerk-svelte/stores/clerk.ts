import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import type Clerk from '@clerk/clerk-js';

export const createClerkStore = (frontEndApi: string) => {
  const store = writable<Clerk | undefined>(undefined);

  onMount(async () => {
    const Clerk = (await import('@clerk/clerk-js')).default;
    const clerk = new Clerk(frontEndApi);
    await clerk.load();
    store.set(clerk);
  });

  return store;
};
