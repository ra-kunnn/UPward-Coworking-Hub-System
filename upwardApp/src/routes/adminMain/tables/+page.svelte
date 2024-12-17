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
    let tableAvailable = false;
    let selectedTableId: number = 0;
    let tableDetails: { reservation_no: number; customer_id: string; end_date: string; date: string }[] = [];
    let currentTableName: string = "";

    onMount(() => {
        try {
            tableRows = data.tables || [];
            tableAvailabilityRows = data.tableAvailability || [];
            tableReservationRows = data.tableReservation || [];
            tableReservationStatusRows = data.tableReservationStatus || [];
            customerRows = data.customer || [];
            /*const displayedReservation = tableReservationRows[currentTableId];
            currentTableId = displayedReservation.table_id;
            currentCustomerId = displayedReservation.customer_id;
            endDate = displayedReservation.end_date*/
            
            checkTableAvailability();
            console.log("tableRows:", tableRows);
            console.log("tableAvailabilityRows:", tableAvailabilityRows);
            console.log("tableReservationRows:", tableReservationRows);
            console.log("tableReservationStatusRows:", tableReservationStatusRows);
            
        } catch (error) {
            console.error(error);
            tableRows = [];
            tableAvailabilityRows = [];
            tableReservationRows = [];
            tableReservationStatusRows = [];
            customerRows = [];
        }
    });
    function checkTableAvailability() {
        tableAvailable = tableAvailabilityRows.some(
            (row) => row.table_id >= 8 && row.table_id <= 15 && row.availability
        );
     }
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
                    availability: true
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
    async function fetchTableDetails(tableId: number) {
        const { supabase } = data;
        selectedTableId = tableId;
        currentTableName = `Table ${tableId}`;
        tableDetails = []; // Reset to trigger reactivity

        try {
        // Step 1: Fetch reservations for the selected table
        let reservationQuery = supabase
        .from('Table Reservation')
        .select('reservation_no, table_id, date, end_date, customer_id');


        // Include multiple table IDs if tableId is 8
        if (tableId === 8) {
            reservationQuery = reservationQuery.in('table_id', [8, 9, 10, 11, 12, 13, 14, 15]);
        } else {
            reservationQuery = reservationQuery.eq('table_id', tableId);
      }

        const { data: reservations, error: reservationError } = await reservationQuery;
        console.log(reservations);
        if (reservationError) throw reservationError;

        // Step 2: Filter reservations by checking their status
        const filteredReservations = await Promise.all(
            reservations.map(async (reservation) => {
            // Fetch the reservation status for this reservation_no
            const { data: status, error: statusError } = await supabase
                .from('Table Reservation Status')
                .select('is_current, is_incoming, is_ongoing, is_done')
                .eq('reservation_no', reservation.reservation_no)
                .single();
            
            console.log(status);
            if (statusError) return null; // Skip if status fetch fails

            // Check if the reservation matches the required status
            if (status.is_current && !status.is_incoming && !status.is_ongoing && !status.is_done) {
                // Fetch customer name
                return {
                    reservation_no: reservation.reservation_no,
                    customer_id: reservation.customer_id,
                    date: reservation.date,
                    end_date: reservation.end_date,
                };
            }
            return null; // Skip reservations that don't match the status
            })
        );

        // Step 3: Remove nulls and set tableDetails
        tableDetails = filteredReservations.filter((res) => res !== null);
        console.log(tableDetails);
        } catch (error) {
        console.error('Error fetching table details:', error.message);
        }
        console.log(tableDetails);
    }

    async function getCustomerName(customer_id: string): Promise<string> {
        const { supabase } = data;
        const { data: namedata, error } = await supabase
            .from('Customer')
            .select('name')
            .eq('customer_id', customer_id)
            .single();
        console.log(namedata);
        return error ? 'Unknown' : namedata.name;
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
                        {#each tableAvailabilityRows as tableAvailabilityRow}
                            {#if tableAvailabilityRow.table_id === 1 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(1)}>Table 1</div>
                            {:else if tableAvailabilityRow.table_id === 1 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(1)}>Table 1</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 2 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(2)}>Table 2</div>
                            {:else if tableAvailabilityRow.table_id === 2 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-2 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(2)}>Table 2</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 3 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-3 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(3)}>Table 3</div>
                            {:else if tableAvailabilityRow.table_id === 3 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-5 row-start-3 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(3)}>Table 3</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 4 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-4 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(4)}>Table 4</div>
                            {:else if tableAvailabilityRow.table_id === 4 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-4 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(4)}>Table 4</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 5 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-3 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(5)}>Table 5</div>
                            {:else if tableAvailabilityRow.table_id === 5 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-3 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(5)}>Table 5</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 6 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-2 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(6)}>Table 6</div>
                            {:else if tableAvailabilityRow.table_id === 6 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-2 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(6)}>Table 6</div>
                            {/if}
                            {#if tableAvailabilityRow.table_id === 7 && tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-1 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(7)}>Table 7</div>
                            {:else if tableAvailabilityRow.table_id === 7 && !tableAvailabilityRow.availability}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-start-1 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(7)}>Table 7</div>
                            {/if}
                            
                            {#if tableAvailable}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-span-4 row-span-2 col-start-1 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200 cursor-pointer" on:click={() => fetchTableDetails(8)}>Table 8</div>
                            {:else}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="col-span-4 row-span-2 col-start-1 row-start-2 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50 cursor-pointer" on:click={() => fetchTableDetails(8)}>Table 8</div>
                            {/if}
                        {/each}
                    </div>
                </div>

                <!-- reservations to tables -->
                <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                    <!-- for padding -->
                    <div class="px-12 min-h-full flex flex-col">

                        <div class="pt-6">
                            <h1 class="h2 font-bold font-fredoka">{currentTableName || "Select a Table"}</h1>
                            <!--{#each tableRows as tableRow}
                                    
                                
                            {/each}-->
                            <p class="mt-1 blockquote">display changes depending on clicked box, grayed out tables mean someone is currently occupying</p>
                        </div>


                        <div class="py-6 flex-grow">
                            {#if tableDetails.length > 0}
                                {#each tableDetails as detail}
                                        <!-- one entry -->
                                        <div class="grid grid-flow-col justify-between items-center gap-5 pb-4">
                                                {#each customerRows as customerRow}
                                                    {#if customerRow.customer_id === detail.customer_id}
                                                        <p class="whitespace-normal break-all">{customerRow.customer_name}</p>
                                                    {/if}
                                                {/each}
                                                <p class="whitespace-normal break-all">{detail.date}</p>
                                                <p class="whitespace-normal break-all">{detail.end_date}</p>
                                            <div class="flex flex-auto mx-auto">
                                                <button on:click={() => {confirmDone(detail.reservation_no, selectedTableId);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                                <button on:click={() => {cancelledReserve(detail.reservation_no, selectedTableId);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                            </div>
                                        </div>
                                {/each}
                            {:else}
                                <p>No reservations for this table.</p>
                            {/if}
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
                    <div class="grid grid-cols-7 gap-5 font-bold">
                        <p>Receipt</p>
                        <p>Customer</p>
                        <p>Table</p>
                        <p>Start</p>
                        <p>End</p>
                        <p>Price</p>
                    </div>
                    <div class="flex-grow upcoming-reservations-container">
                        <!-- One entry -->
                        {#each tableReservationRows as tableReservationRow}
                            {#each tableReservationStatusRows as tableReservationStatusRow}    
                                {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_incoming}
                                    <div class="grid grid-cols-7 items-center gap-5 pb-4">
                                            <p class="whitespace-normal break-all">{tableReservationRow.reservation_no}</p>
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
                    <div class="grid grid-cols-7 gap-5 font-bold">
                        <p>Receipt</p>
                        <p>Customer</p>
                        <p>Table</p>
                        <p>Start</p>
                        <p>End</p>
                        <p>Price</p>
                    </div>
                    <div class="flex ongoing-reservations-container">
                        {#each tableReservationRows as tableReservationRow}
                            {#each tableReservationStatusRows as tableReservationStatusRow}    
                                {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_ongoing}
                                    {#each customerRows as customerRow}     
                                        {#if customerRow.customer_id === tableReservationRow.customer_id}       
                                            <div class="grid grid-cols-7 items-center gap-5 pb-4">
                                                    <p class="whitespace-normal break-all">{tableReservationRow.reservation_no}</p>
                                                    <p>{customerRow.customer_name}</p>
                                                {#each tableRows as tableRow}
                                                    {#if tableRow.table_id === tableReservationRow.table_id}
                                                        <p>{tableRow.table_name}</p>
                                                    {/if}
                                                {/each}
                                                <p class="whitespace-normal break-all">{tableReservationRow.date}</p>
                                                <p class="whitespace-normal break-all">{tableReservationRow.duration}</p>
                                                <p class="whitespace-normal break-all">{tableReservationRow.price}</p>
                                                <div class="flex flex-auto mx-auto">
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