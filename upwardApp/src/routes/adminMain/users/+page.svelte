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
        is_done: boolean;
    }
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
            
        } catch (error) {
            console.error(error);
            drinkRows = [];
            drinkAvailabilityRows = [];
            drinkOrderLineRows = [];
            drinkOrderStatusRows = [];
            drinkReceiptRows = [];
        }
    });
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

        <div class="mt-20">
            <!-- date reservations -->
            <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="min-h-full flex flex-col">
                    <div class="px-12 py-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Users</h1>
                        <div class="flex justify-normal gap-4">
                            <input class="appearance-none bg-surface-100 rounded-2xl border-none text-surface-700 py-1 px-2 leading-tight focus:outline-none text-right" type="name" name="dateFrom" placeholder="Search...">
                            <button class="btn bg-tertiary-300 text-surface-50 rounded-full border-none px-5 py-2 my-1 font-semibold">Load</button>
                        </div>
                        
                    </div>

                    <div class="py-6 grow bg-surface-100">
                        <div class="px-12">
                            {#each customerRows as customerRow}
                            <!-- one entry -->
                                    <div class="grid grid-cols-3 items-center gap-3 pb-5">
                                        <p class="whitespace-normal break-word">{customerRow.customer_name}</p>
                                        <!--{#each tableReservationRows as tableReservationRow}
                                            {#if tableReservationRow.customer_id === customerRow.customer_id}
                                                {#each tableReservationStatusRows as tableReservationStatusRow}
                                                    {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_done}
                                                        <div>
                                                            <p>{tableReservationRow.date} to {tableReservationRow.end_date}</p>
                                                        </div>
                                                    {/if}
                                                {/each}
                                            {/if}
                                        {/each}
                                        -->
                                        <p class="whitespace-normal break-all">{customerRow.customer_email}</p>
                                        <p class="whitespace-normal break-all">{customerRow.customer_phone}</p>
                                    </div>
                            {/each}
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>

</div>