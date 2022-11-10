<script lang="ts">
  import { clerkui, getClerkStore } from '$lib/clerk-svelte';
  const clerk = getClerkStore();
</script>

<div
  class="sign-up"
  class:loading={!$clerk}
  use:clerkui={{ clerk: $clerk, componentType: 'SignUp' }}
/>

<style lang="scss">
  .loading {
    height: 606.5px;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    box-shadow: rgb(0 0 0 / 16%) 0px 24px 48px;
    border-radius: 10px;
    background-color: #f8f8f8;
    background-image: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    );
    background-repeat: repeat-y;
    background-size: 50px 200px;
    background-position: 0 0;
    animation: shine 1s infinite;
  }

  @keyframes shine {
    to {
      background-position: 100% 0;
    }
  }
</style>
