<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_CLERK_FRONTEND_API } from '$env/static/public';
  import type Clerk from '@clerk/clerk-js';
  let clerk: Clerk | undefined;

  onMount(async () => {
    const Clerk = (await import('@clerk/clerk-js')).default;
    clerk = new Clerk(PUBLIC_CLERK_FRONTEND_API);
  });

  const clerkui = (node: HTMLDivElement, clerk?: Clerk) => {
    return {
      update: (clerk: Clerk) => {
        if (clerk) {
          clerk.load().then(() => {
            clerk.mountUserButton(node);
          });
        }
      },
      destroy() {
        if (clerk) {
          clerk.unmountUserButton(node);
        }
      },
    };
  };
</script>

<div class="sign-in" use:clerkui={clerk} />
