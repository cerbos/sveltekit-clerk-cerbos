<script lang="ts">
  import Prism from './Prism.svelte';
</script>

<div class="cerbos-policy">
  <h2>Example Cerbos Policy</h2>
  <p>A sample policy deployed with which states that:</p>
  <ul>
    <li>
      Principals with the role of <code>Admin</code> or <code>User</code>
      are allowed to do the <b>create</b> or <b>read</b> actions.
    </li>
    <li>
      Principals with the role of <code>Admin</code> are allowed to do the
      <b>update</b> and <b>delete</b> actions.
    </li>
    <li>
      Principals with the role of <code>User</code> whose ID matches the owner attribute of the
      resource are allowed to do the <b>update</b>
      and <b>delete</b> actions.
    </li>
  </ul>
  <Prism
    language="plain"
    source={`---
apiVersion: api.cerbos.dev/v1
resourcePolicy:
version: default
resource: contact
rules:
- actions: ["read", "create"]
  effect: EFFECT_ALLOW
  roles:
    - admin
    - user

- actions: ["update", "delete"]
  effect: EFFECT_ALLOW
  roles:
    - admin

- actions: ["update", "delete"]
  effect: EFFECT_ALLOW
  roles:
    - user
  condition:
    match:
      expr: request.resource.attr.owner == request.principal.id`}
  />
</div>

<style lang="scss">
  .cerbos-policy {
    margin-bottom: 2rem;
    margin-top: -1.25rem;
  }
  h2 {
    text-align: center;
  }
</style>
