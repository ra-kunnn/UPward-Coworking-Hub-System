<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Check session and redirect on mount
  onMount(() => {
      goto('/', { replaceState: true });
  });
</script>

<style>
  /* Make the page visually blank */
  :global(body) {
    background: white;
    color: white;
    margin: 0;
    padding: 0;
  }
</style>
