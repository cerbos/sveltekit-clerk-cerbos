<script lang="ts">
  import { getContext } from 'svelte';
  import { clerkui } from '$lib/clerk-svelte';
  import type { Readable } from 'svelte/store';
  import type Clerk from '@clerk/clerk-js';

  const clerkStore = getContext<Readable<Clerk> | undefined>('clerk');
</script>

<div class="user-button" use:clerkui={{ clerk: $clerkStore, componentType: 'UserButton' }} />
