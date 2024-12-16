<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideAdmin.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import Cookies from 'js-cookie';
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
    import type { EventHandler } from 'svelte/elements';
    import type { PageData } from './$types';
    import { supabase } from '$lib/supabaseClient';

    

    export let data:PageData;

    interface Drink{
        drink_id: number;
        drink_name: string;
        description: string;
        price: number;
        drink_type: string;
    }

    interface DrinkAvailability{
        drink_avail_no: number;
        drink_id: number;
        availability: boolean;
        stock: number;
    }

    interface DrinkOrderLine{
        order_id: number;
        created_at: Date;
        customer_id: string;
        drink_id: number;
        receipt_no: number;
        qty: number;
        total_price: number;
    }

    interface DrinkOrderStatus{
        receipt_no: number;
        is_incoming: boolean;
        is_ongoing: boolean;
        is_done: boolean;
    }

    interface DrinkReceipt{
        receipt_no: number;
        total_price: number;
        customer_id: string;
        created_at: Date;
    }

    interface Customer {
        customer_id: string;
        customer_name: string;
        customer_email: string;
        customer_phone: string;
    }

    interface Table{
        table_id: number;
        table_name: string;
        description: string;
        pax: number;
        table_type: string;
    }

    interface TableAvailability{
        table_avail_id: number;
        table_id: number;
        availability: boolean;
        customer_id: string;
    }

    interface TableReservation{
        reservation_no: number;
        date: Date;
        customer_id: string;
        table_id: number;
        duration: Date;
        end_date: Date;
        price: number;
    }

    interface TableReservationStatus{
        reservation_no: number;
        is_incoming: boolean;
        is_ongoing: boolean;
        is_done: boolean;
    }

    let drinkRows : Drink[] = [];
    let drinkAvailabilityRows: DrinkAvailability[] = [];
    let drinkOrderLineRows: DrinkOrderLine[] = [];
    let drinkOrderStatusRows: DrinkOrderStatus[] = [];
    let drinkReceiptRows: DrinkReceipt[] = [];
    let customerRows : Customer[] = [];
    let tableRows : Table[] = [];
    let tableAvailabilityRows: TableAvailability[] = [];
    let tableReservationRows: TableReservation[] = [];
    let tableReservationStatusRows: TableReservationStatus[] = [];
    let isOrderView = true;
    let selectedDateFrom = null;
    let selectedDateTo = null;

    onMount(() => {
        try {
            drinkRows = data.drinks || [];
            drinkAvailabilityRows = data.drinkAvailability || [];
            drinkOrderLineRows = data.drinkOrderLine || [];
            drinkOrderStatusRows = data.drinkOrderStatus || [];
            drinkReceiptRows = data.drinkReceipt || [];
            customerRows = data.customer || [];
            tableRows = data.tables || [];
            tableAvailabilityRows = data.tableAvailability || [];
            tableReservationRows = data.tableReservation || [];
            tableReservationStatusRows = data.tableReservationStatus || [];
            
        } catch (error) {
            console.error(error);
            drinkRows = [];
            drinkAvailabilityRows = [];
            drinkOrderLineRows = [];
            drinkOrderStatusRows = [];
            drinkReceiptRows = [];
            tableRows = [];
            tableAvailabilityRows = [];
            tableReservationRows = [];
            tableReservationStatusRows = [];
        }
    });
    const setLogbookView = (view) => {
        console.log("Selected View:", view);
        // Add your logic here to handle the selected view
        isOrderView = view === "orderRadio";
    };

    const getSelectedRadioValue = () => {
        // Get the selected radio button value
        const selectedRadio = document.querySelector('input[name="radioGroup"]:checked');
        return selectedRadio ? selectedRadio.id : null; // Return the `id` of the selected radio, or `null` if none selected
    };
    const captureDateInputs = () => {
        // Get the date input values
        const dateFrom = document.querySelector('input[name="dateFrom"]').value;
        const dateTo = document.querySelector('input[name="dateTo"]').value;

        // Update the global constants
        selectedDateFrom = dateFrom;
        selectedDateTo = dateTo;

        console.log("Date From:", selectedDateFrom);
        console.log("Date To:", selectedDateTo)
    };

    const isDateInRange = (date) => {
        if (!selectedDateFrom || !selectedDateTo) return true; // No filtering if dates are not selected
        const fromDate = new Date(selectedDateFrom);
        const toDate = new Date(selectedDateTo);
        const targetDate = new Date(date);

        return targetDate >= fromDate && targetDate <= toDate;
    };
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

</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-8 lg:px-20 2xl:px-32 py-10 bg-surface-50">

        <div class="mt-20">
            <!-- date reservations -->
            <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
                
                <!-- for padding -->
                <div class="min-h-full flex flex-col">
                    <div class="px-12 py-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Logbook</h1>
                        <button 
                            on:click={() => { 
                                const selectedView = getSelectedRadioValue(); 
                                captureDateInputs(); // Capture the date inputs
                                setLogbookView(selectedView);
                            }} 
                            class="btn bg-tertiary-300 text-surface-50 rounded-full border-none px-5 py-2 my-1 font-semibold">
                            Load
                        </button>
                    </div>
                    {#if isOrderView}
                        <div class="py-6 grow bg-surface-100">
                            <div class="px-12">
                                {#each drinkReceiptRows as drinkReceiptRow}
                                <!-- one entry -->
                                    {#if isDateInRange(drinkReceiptRow.created_at)}
                                        {#each drinkOrderStatusRows as drinkOrderStatusRow}
                                            {#if drinkReceiptRow.receipt_no === drinkOrderStatusRow.receipt_no && drinkOrderStatusRow.is_done}
                                                    <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                                        <p>Receipt No. {drinkReceiptRow.receipt_no}</p>
                                                        {#each drinkOrderLineRows as drinkOrderLineRow}
                                                            {#if drinkOrderLineRow.receipt_no === drinkReceiptRow.receipt_no}
                                                                {#each drinkRows as drinkRow}
                                                                    {#if drinkRow.drink_id === drinkOrderLineRow.drink_id}
                                                                        <p>{drinkOrderLineRow.qty} {drinkRow.drink_name}</p>
                                                                    {/if}
                                                                {/each}
                                                                        
                                                            {/if}
                                                        {/each}
                                                        {#each customerRows as customerRow}
                                                            {#if customerRow.customer_id === drinkReceiptRow.customer_id}
                                                                <p>{customerRow.customer_name}</p>
                                                            {/if}
                                                        {/each}
                                                        <p class="whitespace-normal break-all">{drinkReceiptRow.created_at}</p>
                                                        <p>{drinkReceiptRow.total_price}</p>
                                                    </div>
                                            {/if}
                                        {/each}
                                    {/if}
                                {/each}
                                
                            </div>

                        </div>
                    {:else}
                        <div class="py-6 grow bg-surface-100">
                            <div class="px-12">
                                {#each tableReservationRows as tableReservationRow}
                                <!-- one entry -->
                                    {#if isDateInRange(tableReservationRow.date)}
                                        {#each tableReservationStatusRows as tableReservationStatusRow}
                                            
                                        
                                            {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_done}
                                                
                                            
                                                <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                                    <p>Reservation No. {tableReservationRow.reservation_no}</p>
                                                    {#each tableRows as tableRow}
                                                        {#if tableReservationRow.table_id === tableRow.table_id}
                                                            <p>{tableRow.table_name}</p>
                                                        {/if}
                                                    {/each}
                                                    {#each customerRows as customerRow}
                                                        {#if customerRow.customer_id === tableReservationRow.customer_id}
                                                            <p>{customerRow.customer_name}</p>
                                                        {/if}
                                                    {/each}
                                                    <p>{tableReservationRow.date} to {tableReservationRow.end_date}</p>
                                                    <p>total cost</p>
                                                </div>
                                            
                                            {/if}
                                        {/each}
                                    {/if}
                                {/each}
                                
                            </div>

                        </div>
                    {/if}
                </div>
            </div>
        </div>
        
        <div class="block">
            <div class="flex justify-end items-center pb-1">
                <p>Data from</p>
                <input class="appearance-none bg-transparent border-none text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="date" name="dateFrom">
                <p>to</p>
                <input class="appearance-none bg-transparent border-none text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="date" name="dateTo">
            </div>

            <div class="flex justify-end items-center pb-1 gap-4 mr-6">
                <div class="flex items-center">
                    <input type="radio" id="reservationRadio" name="radioGroup" class="w-4 h-4 text-primary-600 border-1 border-primary-600 focus:ring-primary-600">
                    <label for="default-radio-1" class="ms-2 font-medium">Reservation</label>
                </div>
    
                <div class="flex items-center">
                    <input type="radio" id="orderRadio" name="radioGroup" class="w-4 h-4 text-primary-600 border-1 border-primary-600 focus:ring-primary-600" checked>
                    <label for="default-radio-1" class="ms-2 font-medium">Order</label>
                </div>
            </div>
            
        </div>

    </div>

</div>