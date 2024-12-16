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

    /** Placeholder and drink options */
    let orderPlaceholder = 'Select a drink...';
    let drinkOptions = [
        { label: "Drink 1", value: "1", price: 40, count: 0 },
        { label: "Drink 2", value: "2", price: 40, count: 0 },
        { label: "Drink 3", value: "3", price: 40, count: 0 },
        { label: "Drink 4", value: "4", price: 40, count: 0 },
        { label: "Drink 5", value: "5", price: 40, count: 0 },
        { label: "Drink 6", value: "6", price: 40, count: 0 },
        { label: "Drink 7", value: "7", price: 40, count: 0 },
        { label: "Drink 8", value: "8", price: 40, count: 0 },
        { label: "Drink 9", value: "9", price: 40, count: 0 },
    ];
    let totalOrder = [];

    /** Increment drink count */
    function increment(drink) {
        drink.count++;
        drinkOptions = [...drinkOptions]; // Trigger reactivity
        updateTotalOrder();
    }

    /** Decrement drink count */
    function decrement(drink) {
        if (drink.count > 0) {
            drink.count--;
            drinkOptions = [...drinkOptions]; // Trigger reactivity
            updateTotalOrder();
        }
    }

    /** Update total order */
    function updateTotalOrder() {
        totalOrder = drinkOptions.filter(drink => drink.count > 0);
    }

    /**
    
    const modalStore = getModalStore();

    function makeAnAccount(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'CreateAccount',
        };
        modalStore.trigger(modal);
    }

    interface Room {
        dormNo: number;
        PAX: number;
        airconStatus: boolean;
        personalCrStatus: boolean;
        personalSinkStatus: boolean;
        monthlyRent: number;
        floor: number;
        roomName: string;
        // Add other columns as needed
  }

    interface Availability {
        dormNo: number;
        availability: boolean;
        availableSlots: number;
        preexistingTenants: number;
        // Add other columns as needed
    }

 

    let roomRows: Room[] = [];
    let availRows: Availability[] = [];
    let availableRooms: Room[] = [];

    onMount(() => {
        try {
            roomRows = rooms || [];
            availRows = availability || [];
            availableRooms = roomRows.filter(room => {
                const roomAvailability = availRows.find(avail => avail.dormNo === room.dormNo);
                return roomAvailability && roomAvailability.availability;
            });
        } catch (error) {
            console.error(error);
            roomRows = [];
            availRows = [];
            availableRooms = [];
        }
    });

    function createArray(length: number): number[] {
        return Array.from({ length }, (_, i) => i);
    } 

    */

</script>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');

    .font-fredoka {
        font-family: "Fredoka", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        font-variation-settings:
            "wdth" 100;
    }

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
    <Header />

    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10">
        <h1 class="px-8 pb-12 h1 font-bold font-fredoka">Hello, Customer ID!</h1>

        <!-- container for the two boxes -->
        <div class="flex gap-8">
            <!-- reserve box -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 py-6 flex flex-row justify-between items-center">
                    <h1 class="h2 font-fredoka">Would you like to reserve?</h1>
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
                    <h1 class="h2 font-fredoka">Would you like to order?</h1>
                    <SlideToggle name="slide" bind:checked={toggleOrder} active="bg-primary-500" />
                </div>
                
                {#if toggleOrder}
                    <div class="px-12 pb-20">
                        <label for="drinkOrder">Drink Selection</label>
                        
                        <div style=" border-color: #38728A; height: 10rem;" class="border my-1 rounded-3xl overflow-y-auto">
                            {#each drinkOptions as drink}
                                <div class="flex justify-between items-center px-4 py-2 border-b">
                                    <span>{drink.label} - ₱{drink.price}</span>
                                    <div class="flex items-center gap-5">
                                        <button class="border-none px-3 rounded-lg text-base" on:click={() => decrement(drink)}>-</button>
                                        <span>{drink.count}</span>
                                        <button class="border-none px-3 rounded-lg text-base" on:click={() => increment(drink)}>+</button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <div class="mt-4">
                            <h3>Order Summary</h3>
                            {#if totalOrder.length === 0}
                                <p>No drinks selected.</p>
                            {:else}
                                <ul>
                                    {#each totalOrder as drink}
                                        <li>{drink.label} x {drink.count} = ₱{drink.count * drink.price}</li>
                                    {/each}
                                </ul>
                                <p class="font-bold">Total: ₱{totalOrder.reduce((sum, drink) => sum + drink.count * drink.price, 0)}</p>
                            {/if}
                        </div>
                        
                    </div>
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