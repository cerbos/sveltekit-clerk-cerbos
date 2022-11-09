<script lang="ts">
  import Header from '$lib/components/Header/Header.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import './styles.scss';
  import { page } from '$app/stores';
</script>

<Header />
<div class="container">
  <main>
    <slot />
    <div style="width: 800px" />
  </main>
</div>
{#if !$page.data.noFooter}
  <Footer />
{/if}

<style lang="scss">
  .container {
    padding: 0;
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    margin: 0 auto;
    flex-grow: 1;
  }

  main {
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
