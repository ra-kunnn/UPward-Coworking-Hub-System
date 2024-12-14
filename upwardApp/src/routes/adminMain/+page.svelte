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

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />
    
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold">Welcome back, Admin Name!</h1>
            <div class="text-right">
                <p>Number of User Accounts: ###</p>
                <p>Users Online Now: ###</p>
            </div>
        </div>

        <!-- container for the two boxes -->
        <div class="flex gap-8">

            <!-- user alerts -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold">Table Details</h1>
                    </div>

                    <div class="pt-10 py-6 flex-grow">
                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- date reservations -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold">Upcoming Reservations</h1>
                    </div>

                    <div class="pt-10 py-6 flex-grow">
                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Reservation ID</p>
                            </div>
                            <div>
                                <p>Customer ID</p>
                            </div>
                            <div>
                                <p>Table No.</p>
                            </div>
                            <div>
                                <p>Per hour</p>
                            </div>
                            <div class="flex flex-auto mx-auto">
                                <button class="btn bg-primary-600 text-tertiary-300">✓</button>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Reservation ID</p>
                            </div>
                            <div>
                                <p>Customer ID</p>
                            </div>
                            <div>
                                <p>Table No.</p>
                            </div>
                            <div>
                                <p>Per hour</p>
                            </div>
                            <div class="flex flex-auto mx-auto">
                                <button class="btn bg-primary-600 text-tertiary-300">✓</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>

</div>