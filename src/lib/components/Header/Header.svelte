<script lang="ts">
  import { UserButton, getClerkStore } from '$lib/clerk-svelte';
  const clerk = getClerkStore();
</script>

<header>
  <div class="left">
    <a class="logo" href="/">
      <img src="/cerbie.svg" width="32" height="32" alt="Logo" />
      <span class="appName">Clerk + Cerbos Demo SvelteKit App</span>
    </a>
  </div>
  <div class="right">
    {#if $clerk?.user}
      <UserButton />
    {:else if $clerk}
      <a href="/sign-in">Sign in</a>
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .appName {
    margin-left: 12px;
    font-weight: bold;
    color: #335bf1;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    header {
      padding: 1rem 2rem;
    }
  }
</style>
