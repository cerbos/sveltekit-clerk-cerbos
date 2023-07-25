<script lang="ts">
  import { setContext } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
  import { createClerkStore } from '$lib/clerk-svelte';

  const clearkStore = createClerkStore(PUBLIC_CLERK_PUBLISHABLE_KEY);
  setContext('clerk', clearkStore);
</script>

<Header />
<div class="container">
  <main>
    <slot />
  </main>
</div>
<Footer />

<style lang="scss" global>
  @import './styles.scss';
  .container {
    padding: 0;
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    margin: 0 auto;
    flex-grow: 1;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 800px;
    padding-top: 2rem;
    flex: 1;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    main {
      padding-top: 4.5rem;
    }
  }
</style>
