<script lang="ts">
  import Header from '$lib/components/Header/Header.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import { page } from '$app/stores';
</script>

<Header />
<div class="container">
  <main>
    <slot />
  </main>
</div>
{#if !$page.data.noFooter}
  <Footer />
{/if}

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
    padding: 2rem 0 4rem 0;
    flex: 1;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    main {
      padding-top: 4.5rem;
    }
  }
</style>
