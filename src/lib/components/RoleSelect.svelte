<script lang="ts">
  import { getClerkStore } from '$lib/clerk-svelte';
  const clerk = getClerkStore();
  $: user = $clerk?.user;
  export let role: string;

  let loading = false;

  const setRole = async (e: Event) => {
    const target = e.target as HTMLSelectElement;
    loading = true;
    role = target.value;
    await fetch('/api/updateRole', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: target.value }),
    });
    await user?.reload(); // refresh frontend user data
    loading = false;
  };
</script>

<h2>Demo: Set your Role</h2>
<p>
  For this demo set a role on your Clerk user - this is stored in the publicMetadata field of your
  user profile and passed into Cerbos for use in authorization.
</p>
<select class="role-select" bind:value={role} on:input={setRole} disabled={loading}>
  {#if !role}
    <option value="">Select a role</option>
  {/if}
  <option value="admin">Admin</option>
  <option value="user">User</option>
</select>
<p>
  Once you change the role, re-run the below request to see the impact on the authorization result.
</p>

<style lang="scss">
  .role-select {
    width: 100%;
    padding: 0.5em;
    border: 2px solid #f2f2f2;
    border-radius: 0.5em;
    font-size: 1rem;
  }
</style>
