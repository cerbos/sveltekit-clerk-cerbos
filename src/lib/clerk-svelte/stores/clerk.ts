import { onMount, onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import { getContext } from 'svelte';
import type { Readable } from 'svelte/store';
import type Clerk from '@clerk/clerk-js';

export const createClerkStore = (frontEndApi: string) => {
  const store = writable<Clerk | undefined>(undefined);
  let unsub: ReturnType<Clerk['addListener']>;

  onMount(async () => {
    const Clerk = (await import('@clerk/clerk-js')).default;
    const clerk = new Clerk(frontEndApi);
    await clerk.load();
    store.set(clerk);
    unsub = clerk.addListener(() => store.set(clerk));
  });

  onDestroy(() => {
    unsub?.();
    store.set(undefined);
  });

  return store;
};

export const getClerkStore = () => {
  return getContext<Readable<Clerk> | undefined>('clerk');
};
