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
        is_current: boolean;
        is_done: boolean;
    }

    interface Customer {
        customer_id: string;
        customer_name: string;
        customer_email: string;
        customer_phone: string;
    }

    let tableRows : Table[] = [];
    let tableAvailabilityRows: TableAvailability[] = [];
    let tableReservationRows: TableReservation[] = [];
    let tableReservationStatusRows: TableReservationStatus[] = [];
    let customerRows : Customer[] = [];

    onMount(() => {
        try {
            tableRows = data.tables || [];
            tableAvailabilityRows = data.tableAvailability || [];
            tableReservationRows = data.tableReservation || [];
            tableReservationStatusRows = data.tableReservationStatus || [];
            customerRows = data.customer || [];
            console.log("tableRows:", tableRows);
            console.log("tableAvailabilityRows:", tableAvailabilityRows);
            console.log("tableReservationRows:", tableReservationRows);
            console.log("tableReservationStatusRows:", tableReservationStatusRows);
            console.log("customerRows:", customerRows);
            
        } catch (error) {
            console.error(error);
            tableRows = [];
            tableAvailabilityRows = [];
            tableReservationRows = [];
            tableReservationStatusRows = [];
            customerRows = [];
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

    const confirmCurrent = async (reservation_no: number) => {
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
    const confirmDone = async (reservation_no: number) => {
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
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold font-fredoka">Tables</h1>
        </div>
        
        <!-- container for the two boxes -->
        <div class="grid grid-cols-1 xl:flex gap-8">

            <!-- table display -->
            <div class="w-2.25/5 flex-col gap-5">

                <!-- tables -->
                <div class="mb-6 h-80">
                    <div class="grid grid-cols-5 grid-rows-3 gap-2 min-h-full min-w-full">
                        <div class="col-start-5 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 1</div>
                        <div class="col-start-5 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200">Table 2</div>
                        <div class="col-start-5 row-start-3 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 3</div>
                        <div class="col-start-4 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 4</div>
                        <div class="col-start-3 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 5</div>
                        <div class="col-start-2 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 6</div>
                        <div class="col-start-1 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 7</div>
                        <div class="col-span-4 row-span-2 col-start-1 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200">Table 8</div>
                    </div>
                </div>

                <!-- reservations to tables -->
                <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                    <!-- for padding -->
                    <div class="px-12 min-h-full flex flex-col">

                        <div class="pt-6">
                            <h1 class="h2 font-bold font-fredoka">Table 1</h1>
                            <!-- remove this p when done implementing -->
                            <p class="mt-1 blockquote">display changes depending on clicked box, grayed out tables mean someone is currently occupying</p>
                        </div>


                        <div class="py-6 flex-grow">

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-5 pb-4">
                                <p class="whitespace-normal break-all">Customer Name</p>
                                <p class="whitespace-normal break-all">Hours Remaining</p>
                                <p class="whitespace-normal break-all">Date Reserved</p>
                            </div>

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-5 pb-4">
                                <p class="whitespace-normal break-all">Customer Name</p>
                                <p class="whitespace-normal break-all">Hours Remaining</p>
                                <p class="whitespace-normal break-all">Date Reserved</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- date reservations -->
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
                                            <p>{tableReservationRow.reservation_no}</p>
                                        {#each customerRows as customerRow}
                                            {#if customerRow.customer_id === tableReservationRow.customer_id}
                                                <p>{customerRow.customer_name}</p>
                                            {/if}
                                        {/each}
                                        {#each tableRows as tableRow}
                                            {#if tableRow.table_id === tableReservationRow.table_id}
                                                <p>{tableRow.table_name}</p>
                                            {/if}
                                        {/each}
                                        <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                        <p>{tableReservationRow.duration}</p>
                                        <p>{tableReservationRow.price}</p>
                                        <div class="flex flex-auto mx-auto gap-2">
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
                                    <div class="grid grid-cols-7 items-center gap-5 pb-4">
                                        <div>
                                            <p>{tableReservationRow.reservation_no}</p>
                                        </div>
                                        {#each customerRows as customerRow}
                                            {#if customerRow.customer_id === tableReservationRow.customer_id}
                                                <div>
                                                    <p>{customerRow.customer_name}</p>
                                                </div>
                                            {/if}
                                        {/each}
                                        {#each tableRows as tableRow}
                                            {#if tableRow.table_id === tableReservationRow.table_id}
                                                <div>
                                                    <p>{tableRow.table_name}</p>
                                                </div>
                                            {/if}
                                        {/each}
                                        <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                        <p>{tableReservationRow.duration}</p>
                                        <p>{tableReservationRow.price}</p>
                                        <div class="flex flex-auto gap-2">
                                            <button on:click={() => {confirmCurrent(tableReservationRow.reservation_no);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                            <button on:click={() => {cancelOrder(tableReservationRow.reservation_no);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                        </div>
                                    </div>
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