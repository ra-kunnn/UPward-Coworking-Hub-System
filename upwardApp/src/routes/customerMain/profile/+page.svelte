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

    // Categorize reservations and orders by their status
    let incomingReservations = [];
    let ongoingReservations = [];
    let completedReservations = [];
    let incomingOrders = [];
    let ongoingOrders = [];
    let completedOrders = [];

    onMount(() => {
        customer_id = data.user?.customer_id ?? '';
        customer_name = data.user?.customer_name ?? '';

        tableReservationRows = data.tableReservation || [];
        tableReservationStatusRows = data.tableReservationStatus || [];
        tableRows = data.tables || [];
        drinkOrderLineRows = data.drinkOrderLine || [];
        drinkOrderStatusRows = data.drinkOrderStatus || [];
        drinkRows = data.drinks || [];

        // Categorizing reservations based on their statuses
        incomingReservations = tableReservationRows.filter(reservation =>
            tableReservationStatusRows.some(status =>
                status.reservation_no === reservation.reservation_no &&
                status.is_incoming &&
                reservation.customer_id === customer_id
            )
        );

        ongoingReservations = tableReservationRows.filter(reservation =>
            tableReservationStatusRows.some(status =>
                status.reservation_no === reservation.reservation_no &&
                status.is_ongoing &&
                reservation.customer_id === customer_id
            )
        );

        completedReservations = tableReservationRows.filter(reservation =>
            tableReservationStatusRows.some(status =>
                status.reservation_no === reservation.reservation_no &&
                status.is_done &&
                reservation.customer_id === customer_id
            )
        );

        // Categorizing orders based on their statuses
        incomingOrders = drinkOrderLineRows.filter(orderLine =>
            drinkOrderStatusRows.some(status =>
                status.receipt_no === orderLine.receipt_no &&
                status.is_incoming &&
                orderLine.customer_id === customer_id
            )
        );

        ongoingOrders = drinkOrderLineRows.filter(orderLine =>
            drinkOrderStatusRows.some(status =>
                status.receipt_no === orderLine.receipt_no &&
                status.is_ongoing &&
                orderLine.customer_id === customer_id
            )
        );

        completedOrders = drinkOrderLineRows.filter(orderLine =>
            drinkOrderStatusRows.some(status =>
                status.receipt_no === orderLine.receipt_no &&
                status.is_done &&
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
                        <h2 class="font-bold">Pending Reservations</h2>
                        {#each incomingReservations as reservation}
                            <p class="mb-3">Table Number: {getTableName(reservation.table_id)}</p>
                            <p class="mb-3">Reservation Date: {reservation.date}</p>
                        {/each}

                        <h2 class="font-bold mt-5">Ongoing Reservations</h2>
                        {#each ongoingReservations as reservation}
                            <p class="mb-3">Table Number: {getTableName(reservation.table_id)}</p>
                            <p class="mb-3">Reservation Date: {reservation.date}</p>
                            <p class="mb-3">End Time: {reservation.end_date}</p>
                        {/each}

                        <h2 class="font-bold mt-5">Completed Reservations</h2>
                        {#each completedReservations as reservation}
                            <p class="mb-3">Table Number: {getTableName(reservation.table_id)}</p>
                            <p class="mb-3">Reservation Date: {reservation.date}</p>
                        {/each}
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
                        <h2 class="font-bold">Incoming Orders</h2>
                        {#each incomingOrders as order}
                            <p class="mb-3">{order.qty}x {getDrinkName(order.drink_id)}</p>
                        {/each}

                        <h2 class="font-bold mt-5">Ongoing Orders</h2>
                        {#each ongoingOrders as order}
                            <p class="mb-3">{order.qty}x {getDrinkName(order.drink_id)}</p>
                        {/each}

                        <h2 class="font-bold mt-5">Completed Orders</h2>
                        {#each completedOrders as order}
                            <p class="mb-3">{order.qty}x {getDrinkName(order.drink_id)}</p>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
