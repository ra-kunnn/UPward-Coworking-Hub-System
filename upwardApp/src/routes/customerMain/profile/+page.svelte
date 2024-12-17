<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from '../profile/$types';
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
    <Header {logout}/>

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-8 lg:px-20 2xl:px-32 py-10 bg-surface-50">

        <h1 class="px-8 pb-12 h1 font-bold font-fredoka">Hello, {customer_name}!</h1>
         
        <!-- container for the two boxes -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- table details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">

                        <h1 class="h1 font-bold font-fredoka">Reservation Details</h1>
                    </div>
                    
                    <div class="pt-10 py-6 flex-grow">
                        <p class="mb-1">Table Number: 1</p>
                        <p class="mb-1">Time Remaining: you have not started</p>
                        <p class="mb-1">Date Reserved: idk</p>
                    </div>

                    <div class="py-7 flex flex-row justify-end items-end">
                        <span>Want to reserve a table? <a href="/customerMain" class="text-secondary-800 hover:underline hover:text-primary-600">Click here!</a></span>
                    </div>
                </div>
            </div>

            <!-- order details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">
                
                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Order Details</h1>
                    </div>

                    <div class="pt-10 py-6 grow min-h-0">
                        <p class="mb-1">You have not placed an order yet.</p>
                    </div>

                    <div class="py-7 flex flex-row justify-end items-end">
                        <span>Want to order a drink? <a href="/customerMain" class="text-secondary-800 hover:underline hover:text-primary-600">Click here!</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>