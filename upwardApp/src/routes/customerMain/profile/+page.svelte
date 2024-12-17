<script lang="ts">
    import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';
    import type { PageData } from '../orderHistory/$types';

    export let data: PageData;

    const logout = async () => {
        const { supabase } = data;
        const { error } = await supabase.auth.signOut();
        document.cookie = 'sb-access-token=; Max-Age=0; path=/';
        document.cookie = 'sb-refresh-token=; Max-Age=0; path=/';
        window.location.replace('/redirectToHome');
        if (error) console.error(error);
    };

    let customer_id: string = '';
    let customer_name: string = '';

    // Data arrays
    let tableReservationRows = [];
    let tableReservationStatusRows = [];
    let tableRows = [];
    let drinkOrderLineRows = [];
    let drinkOrderStatusRows = [];
    let drinkRows = [];

    // Ongoing reservation and orders
    let ongoingReservation = null;
    let ongoingOrders = [];

    onMount(() => {
        customer_id = data.user?.customer_id ?? '';
        customer_name = data.user?.customer_name ?? '';

        tableReservationRows = data.tableReservation || [];
        tableReservationStatusRows = data.tableReservationStatus || [];
        tableRows = data.tables || [];
        drinkOrderLineRows = data.drinkOrderLine || [];
        drinkOrderStatusRows = data.drinkOrderStatus || [];
        drinkRows = data.drinks || [];

        // Find ongoing reservation
        ongoingReservation = tableReservationRows.find(reservation =>
            tableReservationStatusRows.some(status =>
                status.reservation_no === reservation.reservation_no &&
                status.is_ongoing &&
                reservation.customer_id === customer_id
            )
        );

        // Find ongoing orders
        ongoingOrders = drinkOrderLineRows.filter(orderLine =>
            drinkOrderStatusRows.some(status =>
                status.order_id === orderLine.order_id &&
                status.is_ongoing &&
                orderLine.customer_id === customer_id
            )
        );
    });

    // Function to find table name
    const getTableName = (table_id: number) => {
        const table = tableRows.find(t => t.table_id === table_id);
        return table ? table.table_name : 'Unknown Table';
    };

    // Function to get drink name
    const getDrinkName = (drink_id: number) => {
        const drink = drinkRows.find(d => d.drink_id === drink_id);
        return drink ? drink.drink_name : 'Unknown Drink';
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');

    .font-fredoka {
        font-family: "Fredoka", sans-serif;
        font-weight: 600;
    }
</style>

<HideOverflow />

<!-- global container div -->
<div>
    <!-- header -->
    <Header {logout} />

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-8 lg:px-20 2xl:px-32 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h1 font-bold font-fredoka">Hello, {customer_name}!</h1>

        <!-- container for the two boxes -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Reservation Details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Reservation Details</h1>
                    </div>
                    <div class="pt-10 py-6 flex-grow">
                        {#if ongoingReservation}
                            <p class="mb-3">Table Number: {getTableName(ongoingReservation.table_id)}</p>
                            <p class="mb-3">Reservation Date: {ongoingReservation.date}</p>
                            <p class="mb-3">End Time: {ongoingReservation.end_date}</p>
                        {:else}
                            <p class="mb-1">You have no ongoing reservations.</p>
                        {/if}
                    </div>
                    <div class="py-7 flex flex-row justify-end items-end">
                        <span>Want to reserve a table? <a href="/customerMain" class="text-secondary-800 hover:underline hover:text-primary-600">Click here!</a></span>
                    </div>
                </div>
            </div>

            <!-- Order Details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Order Details</h1>
                    </div>
                    <div class="pt-10 py-6 grow min-h-0">
                        {#if ongoingOrders.length > 0}
                            {#each ongoingOrders as order}
                                <p class="mb-3">{order.qty}x {getDrinkName(order.drink_id)}</p>
                            {/each}
                        {:else}
                            <p class="mb-1">You have no ongoing orders.</p>
                        {/if}
                    </div>
                    <div class="py-7 flex flex-row justify-end items-end">
                        <span>Want to order a drink? <a href="/customerMain" class="text-secondary-800 hover:underline hover:text-primary-600">Click here!</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
