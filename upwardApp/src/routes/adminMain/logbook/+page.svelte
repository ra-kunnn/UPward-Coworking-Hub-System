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
        drinkID: number;
        drinkName: string;
        description: string;
        price: number;
        drinkType: string;
    }

    interface DrinkAvailability{
        drinkAvailNo: number;
        drinkID: number;
        availability: boolean;
        stock: number;
    }

    interface DrinkOrderLine{
        orderID: number;
        createdAt: Date;
        customerID: string;
        drinkID: number;
        receiptID: number;
        qty: number;
        totalPrice: number;
    }

    interface DrinkOrderStatus{
        receiptID: number;
        isIncoming: boolean;
        isOngoing: boolean;
        isDone: boolean;
    }

    interface DrinkReceipt{
        receiptID: number;
        totalPrice: number;
        customerID: string;
        createdAt: Date;
    }

    interface Customer {
        customerID: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
    }

    interface Table{
        tableID: number;
        tableName: string;
        description: string;
        pax: number;
        tableType: string;
    }

    interface TableAvailability{
        tableAvailNo: number;
        tableID: number;
        availability: boolean;
        customerID: string;
    }

    interface TableReservation{
        reservationID: number;
        dateReserved: Date;
        customerID: string;
        tableID: number;
        duration: Date;
        dateEnd: Date;
    }

    interface TableReservationStatus{
        reservationID: number;
        isIncoming: boolean;
        isOngoing: boolean;
        isDone: boolean;
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
            console.log("drinkRows:", drinkRows);
            console.log("drinkAvailabilityRows:", drinkAvailabilityRows);
            console.log("drinkOrderLineRows:", drinkOrderLineRows);
            console.log("drinkOrderStatusRows:", drinkOrderStatusRows);
            console.log("drinkReceiptRows:", drinkReceiptRows);
            
            console.log("tableRows:", tableRows);
            console.log("tableAvailabilityRows:", tableAvailabilityRows);
            console.log("tableReservationRows:", tableReservationRows);
            console.log("tableReservationStatusRows:", tableReservationStatusRows);
            console.log("customerRows:", customerRows);
            
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

</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">

        <div class="mx-40 mt-20">
            <!-- date reservations -->
            <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="min-h-full flex flex-col">
                    <div class="px-12 py-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold">Logbook</h1>
                        <button class="btn bg-tertiary-300 text-surface-50 rounded-full border-none px-5 py-2 my-1 font-semibold">Load</button>
                    </div>

                    <div class="py-6 grow bg-surface-100">
                        <div class="px-12">

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                <div>
                                    <p>Receipt No.</p>
                                </div>
                                <div>
                                    <p>Drink No.</p>
                                </div>
                                <div>
                                    <p>Customer</p>
                                </div>
                                <div>
                                    <p>Total</p>
                                </div>
                            </div>

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                <div>
                                    <p>Receipt No.</p>
                                </div>
                                <div>
                                    <p>Drink No.</p>
                                </div>
                                <div>
                                    <p>Customer</p>
                                </div>
                                <div>
                                    <p>Total</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        
        <div class="mx-40 block">
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
                    <input type="radio" id="orderRadio" name="radioGroup" class="w-4 h-4 text-primary-600 border-1 border-primary-600 focus:ring-primary-600">
                    <label for="default-radio-1" class="ms-2 font-medium">Order</label>
                </div>
            </div>
            
        </div>


        

    </div>

</div>