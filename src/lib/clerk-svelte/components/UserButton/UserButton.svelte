<script lang="ts">
  import { clerkui, getClerkStore } from '$lib/clerk-svelte';
  const clerk = getClerkStore();
</script>

<div class="user-button" use:clerkui={{ clerk: $clerk, componentType: 'UserButton' }} />
