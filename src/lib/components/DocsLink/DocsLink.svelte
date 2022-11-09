<script lang="ts">
  export let href: string;
</script>

<a {href} target="_blank" rel="noopener noreferrer">
  <span class="linkText"><slot /></span>
</a>

<style lang="scss">
  a {
    color: #335bf1;
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    a {
      padding-right: 28px;
    }

    a:hover,
    a:focus {
      background: url(/icons/external-link.svg) no-repeat right;
      background-size: 20px 20px;
    }

    .linkText:hover {
      border-bottom: 2px solid #335bf1;
    }
  }
</style>
