<script>
	export let data;
	$: ({ supabase } = data);

</script>

<svelte:head>
    <title>UPward Coworking Hub System</title>    
</svelte:head>

<main>
	<slot />
</main>