<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';

    import SelectorModal from '$lib/user/selectorModal.svelte';
    let showModal = false;
    const handleClose = () => {
        showModal = false;
    };
                        
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
        width: 50%; /* Make it fill the width of the container */
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
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, Customer ID!</h1>

        <!-- container for the two boxes -->
        <div class="flex gap-8">
            <!-- original box -->
            <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-20 flex-1">

                <!-- for padding -->
                <div class="px-12 py-6">
                    <h1 class="h3 font-bold">Reservation Details</h1>
                </div>
                
                <form class="px-12 w-1/2 pb-20">
                    <label for="tableNum">Table Number</label>
                    <select name="tableNum" class="select-style rounded-full mt-1 mb-3">
                        <option value="1">Sharing Table</option>
                        <option value="2">Individual Focus Table</option>
                        <option value="3">Drafting Table</option>
                    </select>

                    <!-- Reservation Rates should change according to the kind of table reserved -->

                    <label for="tableRate">Reservation Rates</label>
                    <select name="tableRate" class="select-style rounded-full mt-1 mb-3">
                        <option value="1">Hourly Rate -- RATE HERE</option>
                        <option value="1">Daily Rate -- RATE HERE</option>
                        <option value="2">Weekly Rate -- RATE HERE</option>
                    </select>

                     <label for="tableDate" class="mb-2">Appointment Hours</label>
                    <input name="dateFrom" type="date" class="input date-input rounded-3xl w-60">

                    <label for="tableDate" class="mb-2">Appointment Date</label>
                    <input name="dateFrom" type="date" class="input date-input rounded-3xl w-60">

                    <!-- OR, FOR APPOINTMENT WEEK OR APPOINTMENT HOURS. IT SHOULD CHANGE ACCORDING TO WHAT RATE IS CHOSEN-->

                    <label for="tableDate" class="mb-2">Appointment Week</label>
                    <input name="dateFrom" type="date" class="input date-input rounded-3xl w-60">

                    <p class="mt-2">Total:</p>
                </form>

            </div>

        </div>

        <button on:click={() => showModal = true} class="btn border-4 shadow-lg border-primary-600 rounded-3xl mb-20 px-14">
            <!-- for padding -->
            <div class="px-12 py-6">
                <h1 class="h3 font-bold">👉 Add some flavor to your day! Choose a snack or drink to complete your experience &emsp;</h1>
            </div>
        </button>

        <SelectorModal show={showModal} on:close={handleClose} />


        <div class="flex flex-row justify-center items-center mb-10">
            <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold">Add Booking/Order</button>
        </div>
    </div>
</div>