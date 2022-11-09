<script lang="ts">
  import { UserButton } from '$lib/components/clerk';
</script>

<header>
  <div class="left">
    <a class="logo" href="/">
      <img src="/logo.svg" width="32" height="32" alt="Logo" />
      <span class="appName">Clerk + Cerbos Demo SvelteKit App</span>
    </a>
  </div>
  <div class="right">
    <UserButton />

    <a href="/sign-in">Sign in</a>

    <!-- <SignedOut>

    </SignedOut>
    <SignedIn>
      <UserButton userProfileURL="/user" afterSignOutAll="/" />
    </SignedIn> -->
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

  // .right > :not(:first-child) {
  //   margin-left: 1rem;
  // }

  @media screen and (min-width: 768px) {
    header {
      padding: 1rem 2rem;
    }
  }
</style>
