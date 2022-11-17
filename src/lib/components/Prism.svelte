<script lang="ts">
  import Prism from 'prismjs';
  import 'prismjs/components/prism-yaml';
  import 'prismjs/components/prism-json';

  export let source = `console.log('Hello world')`;
  export let language = 'javascript';

  // @ts-ignore
  $: html = Prism.highlight(source, Prism.languages[language], language);
</script>

<pre class={`language-${language}`}><code class={`language-${language}`}>{@html html}</code></pre>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
    rel="stylesheet"
  />
</svelte:head>

<style>
  pre[class*='language-'] {
    font-size: 80%;
    border-radius: 0.5rem;
  }
</style>
