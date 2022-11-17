<script lang="ts">
  import RoleSelect from '$lib/components/RoleSelect.svelte';
  import APIRequest from '$lib/components/APIRequest.svelte';
  import GuardedRoutes from './GuardedRoutes.svelte';
</script>

<div>
  <RoleSelect />
  <APIRequest />
  <GuardedRoutes />
</div>
