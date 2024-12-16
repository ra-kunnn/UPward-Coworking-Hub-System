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
        is_current: boolean;
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

const cancelOrder = async (reservation_no: number) => {
        const { supabase } = data;
        try {
            const {error, count} = await supabase
                .from('Table Reservation Status')
                .update({
                    is_incoming: false,
                    is_ongoing: false,
                    is_current: false,
                    is_done: false
                })
                .eq('reservation_no', reservation_no)
                .select();;

            if (error) {
                console.error('Error updating order status:', error.message);
                return { success: false, message: error.message };
            }

            console.log('Update response:', count);
            window.location.reload();
            return { success: true };
            
        } catch (err) {
            console.error('Unexpected error:', err);
            return { success: false, message: 'Unexpected error occurred.' };
        }
        
    }
    const confirmOrder = async (reservation_no: number) => {
        const { supabase } = data;

        try {
            const {error, count} = await supabase
                .from('Table Reservation Status')
                .update({
                    is_incoming: false,
                    is_ongoing: true,
                    is_current: false,
                    is_done: false
                })
                .eq('reservation_no', reservation_no)
                .select();;

            if (error) {
                console.error('Error updating order status:', error.message);
                return { success: false, message: error.message };
            }

            console.log('Update response:', count);
            window.location.reload();
            return { success: true };
            
        } catch (err) {
            console.error('Unexpected error:', err);
            return { success: false, message: 'Unexpected error occurred.' };
        }
        
    }

    const confirmCurrent = async (reservation_no: number, table_id: number, customer_id: string) => {
        const { supabase } = data;

        try {
            const {error, count} = await supabase
                .from('Table Reservation Status')
                .update({
                    is_incoming: false,
                    is_ongoing: false,
                    is_current: true,
                    is_done: false
                })
                .eq('reservation_no', reservation_no)
                .select();;

            const {availerror, availcount} = await supabase
                .from('Table Availability')
                .update({
                    availability: false,
                    customer_id: customer_id
                })
                .eq('table_id', table_id)
                .select();;

            if (error) {
                console.error('Error updating order status:', error.message);
                return { success: false, message: error.message };
            }

            console.log('Update response:', count);
            window.location.reload();
            return { success: true };
            
        } catch (err) {
            console.error('Unexpected error:', err);
            return { success: false, message: 'Unexpected error occurred.' };
        }
        
    }
    const confirmDone = async (reservation_no: number, table_id: number) => {
        const { supabase } = data;

        try {
            const {error, count} = await supabase
                .from('Table Reservation Status')
                .update({
                    is_incoming: false,
                    is_ongoing: false,
                    is_current: false,
                    is_done: true
                })
                .eq('reservation_no', reservation_no)
                .select();;
                
            const {availerror, availcount} = await supabase
                .from('Table Availability')
                .update({
                    availability: true,
                    customer_id: null
                })
                .eq('table_id', table_id)
                .select();;
            if (error) {
                console.error('Error updating order status:', error.message);
                return { success: false, message: error.message };
            }

            console.log('Update response:', count);
            window.location.reload();
            return { success: true };
            
        } catch (err) {
            console.error('Unexpected error:', err);
            return { success: false, message: 'Unexpected error occurred.' };
        }
        
    }
    const cancelledReserve = async (reservation_no: number, table_id: number) => {
        const { supabase } = data;

        try {
            const {error, count} = await supabase
                .from('Table Reservation Status')
                .update({
                    is_incoming: false,
                    is_ongoing: false,
                    is_current: false,
                    is_done: false
                })
                .eq('reservation_no', reservation_no)
                .select();;
                
            const {availerror, availcount} = await supabase
                .from('Table Availability')
                .update({
                    availability: true,
                    customer_id: null
                })
                .eq('table_id', table_id)
                .select();;
            if (error) {
                console.error('Error updating order status:', error.message);
                return { success: false, message: error.message };
            }

            console.log('Update response:', count);
            window.location.reload();
            return { success: true };
            
        } catch (err) {
            console.error('Unexpected error:', err);
            return { success: false, message: 'Unexpected error occurred.' };
        }
        
    }
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
</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />
    
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-8 lg:px-20 2xl:px-32 py-10 bg-surface-50">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 pb-6 gap-4">
            <h1 class="h2 font-bold font-fredoka">Welcome back, Admin Name!</h1>
            
        </div>

        <!-- container for the two boxes -->
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-8">

            <!-- table details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-auto overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Table Details</h1>
                    </div>

                    <div class="pt-10 py-6 flex-grow">
                        <!-- one entry -->
                        {#each tableReservationRows as tableReservationRow}
                            {#each tableReservationStatusRows as tableReservationStatusRow}
                                {#if tableReservationRow.reservation_no === tableReservationStatusRow.reservation_no && tableReservationStatusRow.is_current}
                                    <div class="grid grid-flow-col justify-between items-center gap-5 pb-4">
                                        <div>
                                            {#each tableRows as tableRow}
                                                {#if tableReservationRow.table_id === tableRow.table_id}
                                                    <p class="font-bold whitespace-normal break-word">{tableRow.table_name}</p>
                                                {/if}
                                            {/each}
                                        </div>
                                        <div>
                                            {#each customerRows as customerRow}
                                                {#if tableReservationRow.customer_id === customerRow.customer_id}
                                                    <p class="whitespace-normal break-word">{customerRow.customer_name}</p>
                                                {/if}
                                            {/each}
                                        </div>
                                        <div>
                                            <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                        </div>
                                        <div>
                                            <p class="whitespace-normal break-all">{tableReservationRow.end_date}</p>
                                        </div>
                                        <div class="flex flex-auto gap-2">
                                            <button on:click={() => {confirmDone(tableReservationRow.reservation_no, tableReservationRow.table_id);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                            <button on:click={() => {cancelledReserve(tableReservationRow.reservation_no, tableReservationRow.table_id);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        {/each}

                        
                    </div>

                </div>
            </div>

        <!-- Reservation Section -->
        <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-auto overflow-hidden grid grid-rows-2 h-auto">
            <!-- Upcoming Reservations -->
            <div class="px-12 py-6 overflow-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Upcoming Reservations</h2>
                </div>
                <div class="flex-grow upcoming-reservations-container">
                    <!-- One entry -->
                    {#each tableReservationRows as tableReservationRow}
                        {#each tableReservationStatusRows as tableReservationStatusRow}    
                            {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_incoming}
                                <div class="grid grid-cols-7 items-center gap-5 pb-4">
                                    <div>
                                        <p class="whitespace-normal break-all">{tableReservationRow.reservation_no}</p>
                                    </div>
                                    {#each customerRows as customerRow}
                                        {#if customerRow.customer_id === tableReservationRow.customer_id}
                                            <p class="whitespace-normal break-word">{customerRow.customer_name}</p>
                                        {/if}
                                    {/each}
                                    {#each tableRows as tableRow}
                                        {#if tableRow.table_id === tableReservationRow.table_id}
                                            <p class="whitespace-normal break-word">{tableRow.table_name}</p>
                                        {/if}
                                    {/each}
                                    <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                    <p class="whitespace-normal break-all">{tableReservationRow.duration}</p>
                                    <p class="whitespace-normal break-all">{tableReservationRow.price}</p>
                                    <div class="flex flex-auto gap-2">
                                        <button on:click={() => {confirmOrder(tableReservationRow.reservation_no);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                        <button on:click={() => {cancelOrder(tableReservationRow.reservation_no);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    <!-- Add more entries here as needed -->
                    {/each}
                </div>
            </div>

            <!-- Ongoing Reservations -->
            <div class="px-12 py-6 overflow-auto border-t">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Ongoing Reservations</h2>
                </div>
                <div class="flex-grow ongoing-reservations-container">
                    {#each tableReservationRows as tableReservationRow}
                        {#each tableReservationStatusRows as tableReservationStatusRow}    
                            {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_ongoing}
                                {#each customerRows as customerRow}     
                                    {#if customerRow.customer_id === tableReservationRow.customer_id}       
                                        <div class="grid grid-cols-7 items-center gap-3 pb-4">
                                            <p class="whitespace-normal break-word">{tableReservationRow.reservation_no}</p>
                                            <p class="whitespace-normal break-word">{customerRow.customer_name}</p>
                                            {#each tableRows as tableRow}
                                                {#if tableRow.table_id === tableReservationRow.table_id}
                                                    <p class="whitespace-normal break-word">{tableRow.table_name}</p>
                                                {/if}
                                            {/each}
                                            <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                            <p class="whitespace-normal break-all">{tableReservationRow.duration}</p>
                                            <p class="whitespace-normal break-all">{tableReservationRow.price}</p>
                                            <div class="flex flex-auto gap-2">
                                                <button on:click={() => {confirmCurrent(tableReservationRow.reservation_no, tableReservationRow.table_id, customerRow.customer_id);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                                <button on:click={() => {cancelOrder(tableReservationRow.reservation_no);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
                            {/if}
                        {/each}
                    <!-- Add more entries here as needed -->
                    {/each}
                    <!-- Ongoing reservation entries will dynamically appear here -->
                </div>
            </div>
        </div>

        </div>
    </div>

</div>