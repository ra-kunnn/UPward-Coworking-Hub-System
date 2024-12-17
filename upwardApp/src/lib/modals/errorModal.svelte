<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

	
	/*
	const customerID = Cookies.get('userID');
	const dormNo = Cookies.get('dormNo');

	console.log(customerID, dormNo);

	let roomName: string = '';

	onMount(async () => {
		if (dormNo) {
			const { data, error } = await supabase
				.from('Dorm Room')
				.select('roomName')
				.eq('dormNo', dormNo)
				.single();

			if (error) {
				console.error('Error fetching room name:', error);
			} else {
				roomName = data.roomName;
			}
		}
	});


	const applyroom = async (event: Event) => { 

		event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);


		const startOfTenancy = formData.get('startOfTenancy') as Date;

		const currentDate = new Date().toISOString().split('T')[0];

		console.log(formData.get('startOfTenancy'));

		console.log(startOfTenancy, currentDate);

		if(startOfTenancy < currentDate){
			alert('Please enter valid date.');
		  return;
		}

		

		//setting hasApplied to true
		const { error: boolChangeError } = await supabase
		    .from('Potential Customer')
		    .update({ hasApplied: true })
		    .eq('customerID', customerID);

		if(boolChangeError){
		  alert(' There was an error with the dorm application');
		  return;
		}

		//inserting to Application Form
		const { error: applicationError } = await supabase
		  .from('Application Form') 
		  .insert([
		    {
		      customerID: customerID,
		      dormNo: dormNo,
		      startOfTenancy: startOfTenancy,
		    },
		  ]);

		  if(applicationError){
		  alert(' There was an error with the dorm application');
		  return;
		  }
		  

		  alert(' Application sent! See application status on your dashboard.');
		  remCookie();
		  window.location.reload();
		  parent.onClose();

	};

	function remCookie(){
		Cookies.remove('userID');
		Cookies.remove('dormNo');
	}

	*/

</script>

{#if $modalStore[0]}
	<div class="{cBase}">
		<header class={cHeader}>Error</header>
		<article>There is an error</article>
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose()}>Okay</button>
	</div>
{/if}


