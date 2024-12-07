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

    export let data:PageData;
    const { rooms, availability }: { rooms: Room[], availability: Availability[] } = data;

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
        <h1 class="px-8 pb-12 h2 font-bold">Hello, Customer ID!</h1>

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

                                <!-- change values in line 23 -->
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
                                {#if reserveSelected == '1'}
                                    <div class="mt-5">
                                        <label for="tableDate" class="mb-2">Appointment Hours</label>
                                        <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                    </div>
                                {:else if reserveSelected == '2'}
                                    <div class="mt-5">
                                        <label for="tableDate" class="mb-2">Appointment Date</label>
                                        <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                    </div>
                                {:else if reserveSelected == '3'}
                                    <div class="mt-5">
                                        <label for="tableDate" class="mb-2">Appointment Week</label>
                                        <input name="dateFrom" type="date" class="input date-input rounded-3xl">
                                    </div>
                                {:else}
                                    <div class="mt-5"></div>
                                {/if}

                                <div class="py-6">
                                    <p class="mt-2">Total:</p>
                                </div>
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
                        <label for="tableNum">Drink Selection</label>
                        <select name="tableNum" class="select-style rounded-full mt-1 mb-3">
                            <option value="1">Sharing Table</option>
                            <option value="2">Individual Focus Table</option>
                            <option value="3">Drafting Table</option>
                        </select>

                        <p class="mt-2">Total:</p>
                    </form>
                {:else}
                    <div class="min-h-full"></div>
                {/if}
                    
            </div>

        </div>

        <!-- <SelectorModal show={showModal} on:close={handleClose} /> -->


        <div class="flex flex-row justify-end items-center">
            <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold">Add Booking/Order</button>
        </div>
    </div>
</div>