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

    let isOrderView: boolean = true;

    let customer_id: string = '';
    let drinkReceiptRows = [];
    let drinkOrderStatusRows = [];
    let drinkOrderLineRows = [];
    let tableReservationRows = [];
    let tableReservationStatusRows = [];
    let tableRows = [];
    let drinkRows = [];
    let customerRows = [];

    onMount(() => {
        customer_id = data.user?.customer_id ?? '';
        drinkReceiptRows = data.drinkReceipt || [];
        drinkOrderStatusRows = data.drinkOrderStatus || [];
        drinkOrderLineRows = data.drinkOrderLine || [];
        tableReservationRows = data.tableReservation || [];
        tableReservationStatusRows = data.tableReservationStatus || [];
        tableRows = data.tables || [];
        drinkRows = data.drinks || [];
        customerRows = data.customer || [];
    });

    // Reactive variable for toggling between views
    let selectedView = 'order';
</script>

<HideOverflow />

<!-- global container div -->
<div>
    <!-- header -->
    <Header {logout} />

    <!-- aside -->
    <Aside />

    <!-- main content -->
    <div class="mx-40 mt-20">
        <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
            <!-- Header -->
            <div class="px-12 py-6 flex flex-row justify-between items-center">
                <h1 class="h1 font-bold font-fredoka">Order and Reservation History</h1>
            </div>

            <!-- Radio Buttons -->
            <div class="flex justify-end items-center pb-1 gap-4 mr-6">
                <div class="flex items-center">
                    <input 
                        type="radio" 
                        id="reservation" 
                        name="view" 
                        value="reservation" 
                        bind:group={selectedView}
                        class="w-4 h-4 text-primary-600 border-1 focus:ring-primary-600"
                    />
                    <label for="reservation" class="ms-2 font-medium">Reservation</label>
                </div>
                <div class="flex items-center">
                    <input 
                        type="radio" 
                        id="order" 
                        name="view" 
                        value="order" 
                        bind:group={selectedView}
                        class="w-4 h-4 text-primary-600 border-1 focus:ring-primary-600"
                    />
                    <label for="order" class="ms-2 font-medium">Order</label>
                </div>
            </div>

            <!-- Conditional Views -->
            {#if selectedView === 'order'}
                <div class="py-6 bg-surface-100">
                    <div class="px-12">
                        {#each drinkReceiptRows as receipt}
                            {#each drinkOrderStatusRows as status}
                                {#if receipt.receipt_no === status.receipt_no && status.is_done && receipt.customer_id === customer_id}
                                    <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                        <div><p>Drink Receipt No: {receipt.receipt_no}</p></div>
                                        {#each drinkOrderLineRows as line}
                                            {#if line.receipt_no === receipt.receipt_no}
                                                {#each drinkRows as drink}
                                                    {#if drink.drink_id === line.drink_id}
                                                        <div><p>{line.qty}x {drink.drink_name}</p></div>
                                                    {/if}
                                                {/each}
                                            {/if}
                                        {/each}
                                        <div><p>{receipt.created_at}</p></div>
                                        <div><p>{receipt.total_price}</p></div>
                                    </div>
                                {/if}
                            {/each}
                        {/each}
                    </div>
                </div>
            {:else}
                <div class="py-6 bg-surface-100">
                    <div class="px-12">
                        {#each tableReservationRows as reservation}
                            {#each tableReservationStatusRows as status}
                                {#if reservation.reservation_no === status.reservation_no && status.is_done && reservation.customer_id === customer_id}
                                    <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                        <div><p>Reservation No: {reservation.reservation_no}</p></div>
                                        {#each tableRows as table}
                                            {#if table.table_id === reservation.table_id}
                                                <div><p>{table.table_name}</p></div>
                                            {/if}
                                        {/each}
                                        <div><p>{reservation.date} to {reservation.end_date}</p></div>
                                        <div><p>{reservation.price}</p></div>
                                    </div>
                                {/if}
                            {/each}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
