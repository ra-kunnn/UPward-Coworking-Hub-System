<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from '../orderHistory/$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';
                        
    export let data:PageData;

    const logout = async () => {
        const { supabase } = data; // Destructure supabase from data
        const { error } = await supabase.auth.signOut();
        console.log("LOGGING OUT");
        document.cookie = 'sb-access-token=; Max-Age=0; path=/';
            document.cookie = 'sb-refresh-token=; Max-Age=0; path=/';
        window.location.replace('/redirectToHome');
        if (error) {
            console.error(error);
            }
        };

            interface User {
        customer_name: string;
        customer_id: number;
        customer_phone: number;
        customer_email: string;
    }

    let customer_name: string = '';
    let customer_email: string = '';
    let customer_id: string = '';

interface Drink{
    drink_id: number;
    drink_name: string;
    description: string;
    price: number;
    drink_type: string;
}

interface DrinkAvailability{
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
let isOrderView = true;
    console.log("TESTING CUST DATA" + customer_name);

    onMount(() => {
    console.log("IS IT MOUNTING??/");
        try {
            customer_name = data.user?.customer_name ?? '';
            customer_email = data.user?.customer_email ?? '';
            customer_id = data.user?.customer_id ?? 0;
            console.log("testing cookies"+ customer_id, customer_email);
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
</script>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header {logout}/>

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="mx-40 mt-20">
        <!-- date reservations -->
        <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
            
            <!-- for padding -->
            <div class="min-h-full flex flex-col">
                <div class="px-12 py-6 flex flex-row justify-between items-center">
                    <h1 class="h1 font-bold font-fredoka">Order and Reservation History</h1>
                    <button 
                        on:click={() => { 
                            const selectedView = getSelectedRadioValue(); 
                            console.log(selectedView)
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
                                    {#each drinkOrderStatusRows as drinkOrderStatusRow}
                                        {#if drinkReceiptRow.receipt_no === drinkOrderStatusRow.receipt_no && drinkOrderStatusRow.is_done && customer_id === drinkReceiptRow.customer_id}
                                                <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                                    <div>
                                                        <p>Drink Receipt No. {drinkReceiptRow.receipt_no}</p>
                                                    </div>
                                                    {#each drinkOrderLineRows as drinkOrderLineRow}
                                                        {#if drinkOrderLineRow.receipt_no === drinkReceiptRow.receipt_no}
                                                            <div>
                                                                {#each drinkRows as drinkRow}
                                                                    {#if drinkRow.drink_id === drinkOrderLineRow.drink_id}
                                                                        <p>{drinkOrderLineRow.qty} {drinkRow.drink_name}</p>
                                                                    {/if}
                                                                {/each}
                                                            </div>
                                                                    
                                                        {/if}
                                                    {/each}
                                                    {#each customerRows as customerRow}
                                                            {#if customerRow.customer_id === drinkReceiptRow.customer_id}
                                                            <div>
                                                                <p>{customerRow.customer_name}</p>
                                                            </div>
                                                            {/if}
                                                    {/each}
                                                    <div>
                                                        <p>{drinkReceiptRow.created_at}</p>
                                                    </div>
                                                    <div>
                                                        <p>{drinkReceiptRow.total_price}</p>
                                                    </div>
                                                </div>
                                        {/if}
                                    {/each}
                            {/each}
                            
                        </div>

                    </div>
                {:else}
                    <div class="py-6 grow bg-surface-100">
                        <div class="px-12">
                            {#each tableReservationRows as tableReservationRow}
                            <!-- one entry -->
                                    {#each tableReservationStatusRows as tableReservationStatusRow}
                                        
                                    
                                        {#if tableReservationStatusRow.reservation_no === tableReservationRow.reservation_no && tableReservationStatusRow.is_done && customer_id === tableReservationRow.customer_id}
                                            
                                        
                                            <div class="grid grid-flow-col justify-between items-center gap-3 pb-5">
                                                <div>
                                                    <p>Reservation No. {tableReservationRow.reservation_no}</p>
                                                </div>
                                                {#each tableRows as tableRow}
                                                    {#if tableReservationRow.table_id === tableRow.table_id}
                                                        <div>
                                                            <p>{tableRow.table_name}</p>
                                                        </div>
                                                                
                                                    {/if}
                                                {/each}
                                                {#each customerRows as customerRow}
                                                        {#if customerRow.customer_id === tableReservationRow.customer_id}
                                                        <div>
                                                            <p>{customerRow.customer_name}</p>
                                                        </div>
                                                        {/if}
                                                {/each}
                                                <div>
                                                    <p>{tableReservationRow.date} to {tableReservationRow.end_date}</p>
                                                </div>
                                                <div>
                                                    <p>{tableReservationRow.price}</p>
                                                </div>
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
</div>