<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';
    import { SlideToggle } from '@skeletonlabs/skeleton';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';

    import SelectorModal from '$lib/user/selectorModal.svelte';
    let showModal = false;
    const handleClose = () => {
        showModal = false;
    };

    let toggleReserve: boolean = true;
    let toggleOrder: boolean = true;
                        
    /** values for reserve selection */
    let reservePlaceholder = 'Select a reservation rate...';
	let reserveOptions = [{
		label: "Hourly Rate (100Php)",
		value: "1"
	}, {
		label: "Daily Rate (100Php)",
		value: "2"
	}, {
		label: "Weekly Rate (100Php)",
		value: "3"
	}];
	let reserveSelected = "";

    /** values for order selection */
    let orderPlaceholder = 'Select a drink...';
	let drinkOptions = [
        { label: "Spanish Latte", value: "1",price: 40 }, 
        { label: "Cappuccino", value: "2", price: 40 },
        { label: "Nescafe", value: "3", price: 40 },
        { label: "Strawberry Fizz", value: "4", price: 40 },
        { label: "Blueberry Fizz", value: "5", price: 40 },
    ];
	let drinkSelected = "";


    export let data:PageData;

    const logout = async () => {
        const { supabase } = data; // Destructure supabase from data
        const { error } = await supabase.auth.signOut();
        console.log("LOGGING OUT");
        document.cookie = 'sb-access-token=; Max-Age=0; path=/';
            document.cookie = 'sb-refresh-token=; Max-Age=0; path=/';
        window.location.replace('/redirectToHome');
        if (error) {
            console.error(error);
            }
        };

        interface User {
        customer_name: string;
        customer_id: number;
        customer_phone: number;
        customer_email: string;
    }

    let customer_name: string = '';
    let customer_email: string = '';
    let customer_id: number = 0;

    console.log("TESTING CUST DATA" + customer_name);

    onMount(() => {
    console.log("IS IT MOUNTING??/");
        try {
            customer_name = data.user?.customer_name ?? '';
            customer_email = data.user?.customer_email ?? '';
            customer_id = data.user?.customer_id ?? 0;
            console.log("testing cookies"+ customer_id, customer_email);
        } catch (error) {
            console.error(error);
        }
    });

</script>

<style>

    /* Custom input style */
    .date-input {
        background-color: white; /* Match the white background of the card */
        border: 2px solid #38728A; /* Match the border color of the card */
        border-radius: 20px; /* Rounded corners to match .rounded-3xl */
        padding: 0.5rem 1rem; /* Add padding for a nice look */
        width: 100%; /* Make it fill the width of the container */
        transition: border-color 0.3s ease, background-color 0.3s ease; /* Smooth transition on focus */
    }

    /* Focus effect */
    .date-input:focus {
        outline: none; /* Remove default focus outline */
        border-color: #38728A; /* Keep the border color as primary when focused */
        background-color: #f1fdfd; /* Lighter background when focused */
    }


    /* Custom select dropdown styling */
    .select-style {
        background-color: white; /* Matches the white background */
        border: 1px solid #38728A; /* Matches the border color */
        border-radius: 20px; /* Rounded corners */
        padding: 0.5rem 1rem; /* Padding for spacing */
        width: 100%; /* Ensure it takes up the full width of the container */
        transition: border-color 0.3s ease, background-color 0.3s ease; /* Smooth transition on focus */
    }

    /* Focus effect to change border and background */
    .select-style:focus {
        outline: none; /* Remove default outline */
        border-color: #38728A; /* Keep the border color on focus */
        background-color: #fafafa; /* Lighter background on focus */
    }

    /* Styling for the options inside the select (optional) */
    .select-style option {
        padding: 0.5rem; /* Adds spacing to the option text */
    }


</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header {logout}/>

    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, {customer_name}!</h1>

        <!-- container for the two boxes -->
        <div class="flex gap-8">
            <!-- reserve box -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 py-6 flex flex-row justify-between items-center">
                    <h1 class="h2 font-bold">Would you like to reserve?</h1>
                    <SlideToggle name="slide" bind:checked={toggleReserve} active="bg-primary-500" />
                </div>
                
                {#if toggleReserve}
                    <div class="flex pt-4 gap-6 px-12">
                        <div class="flex-1">
                            <form>
                                <label for="tableNum">Table Number</label>
                                <select name="tableNum" class="select-style rounded-full mt-1 mb-3">
                                    <option value="1">Sharing Table</option>
                                    <option value="2">Individual Focus Table</option>
                                    <option value="3">Drafting Table</option>
                                </select>
            
                                <!-- Reservation Rates should change according to the kind of table reserved -->
            
                                <label for="tableRate">Reservation Rates</label>

                                <!-- change values in typescript -->
                                <select name="tableRate" class="select-style rounded-full mt-1 mb-3" bind:value={reserveSelected}>    
                                    {#if reservePlaceholder}
                                        <option value="" disabled selected>{reservePlaceholder}</option>
                                    {/if}
                                    {#each reserveOptions as option}
                                        <option value={option.value}>
                                            {option.label}
                                        </option>
                                    {/each}
                                </select>

                                <!-- change depending on selected rate -->
                                <div class="mt-5">
                                {#if reserveSelected == '1'}
                                    <label for="tableDate" class="mb-2">Appointment Hours</label>
                                    <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                {:else if reserveSelected == '2'}
                                    <label for="tableDate" class="mb-2">Appointment Date</label>
                                    <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                {:else if reserveSelected == '3'}
                                    <label for="tableDate" class="mb-2">Appointment Week</label>
                                    <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                {:else}
                                    <div></div>
                                {/if}
                                </div>

                                {#if reserveSelected}
                                    <div class="py-6">
                                        <p class="mt-2 font-semibold">Total:</p>
                                    </div>
                                {/if}
                            </form>
                        </div>
                    </div>
                {:else}
                    <div class="min-h-full"></div>
                {/if}
                
                

            </div>

            <!-- order box -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 py-6 pb-10 flex flex-row justify-between items-center">
                    <h1 class="h2 font-bold">Would you like to order?</h1>
                    <SlideToggle name="slide" bind:checked={toggleOrder} active="bg-primary-500" />
                </div>
                
                {#if toggleOrder}
                    <form class="px-12 pb-20">
                        <label for="drinkOrder">Drink Selection</label>
                        
                        <!-- change values in typescript -->
                        <select name="customerOrder" multiple size="4" class="select-style rounded-full mt-1 mb-3" bind:value={drinkSelected}>    
                            {#if orderPlaceholder}
                                <option value="" disabled selected>{orderPlaceholder}</option>
                            {/if}
                            {#each drinkOptions as drink}
                                <option value={drink.value}>
                                    {drink.label}
                                </option>
                            {/each}
                        </select>

                        {#if drinkSelected.length > 0}
                            <p class="mt-2 font-semibold">Order:</p>
                            <ul>
                                {#each drinkSelected as selectedValue}
                                    {#each drinkOptions as drink (drink.value)}
                                        {#if drink.value === selectedValue}
                                            <li>{drink.label} ({drink.price})</li>
                                        {/if}
                                    {/each}
                                {/each}
                            </ul>
                        {/if}
                        
                    </form>
                {:else}
                    <div class="min-h-full"></div>
                {/if}
                    
            </div>

        </div>

        <!-- <SelectorModal show={showModal} on:close={handleClose} /> -->


        <div class="flex flex-row justify-end items-center">
            <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold">Confirm</button>
        </div>
    </div>
</div>