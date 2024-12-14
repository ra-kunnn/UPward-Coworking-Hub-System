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

    let elemCarousel: HTMLDivElement;
    const unsplashIds = ['1620562303747-ba21ca6f1530', '1572826246393-e42b63b4ac82',
                        '1620074506951-33a51f7f454a', '1601325979086-d54da2c7419c',
                        '1597077962467-be16edcc6a43', '1510111652602-195fc654aa83'
    ];


    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
                : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
        elemCarousel.scroll(x, 0);
    }
    
    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop
                : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
        elemCarousel.scroll(x, 0);
    }

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

    let drinkRows : Drink[] = [];
    let drinkAvailabilityRows: DrinkAvailability[] = [];
    let drinkOrderLineRows: DrinkOrderLine[] = [];
    let drinkOrderStatusRows: DrinkOrderStatus[] = [];
    let drinkReceiptRows: DrinkReceipt[] = [];
    let customerRows : Customer[] = [];

console.log("test");
    onMount(() => {
        try {
            drinkRows = data.drinks || [];
            drinkAvailabilityRows = data.drinkAvailability || [];
            drinkOrderLineRows = data.drinkOrderLine || [];
            drinkOrderStatusRows = data.drinkOrderStatus || [];
            drinkReceiptRows = data.drinkReceipt || [];
            customerRows = data.customer || [];
            
        } catch (error) {
            console.error(error);
            drinkRows = [];
            drinkAvailabilityRows = [];
            drinkOrderLineRows = [];
            drinkOrderStatusRows = [];
            drinkReceiptRows = [];
        }
    });
    
    const cancelOrder = async (receipt_no: number) => {
        const { supabase } = data;
        try {
            const {error, count} = await supabase
                .from('Drink Order Status')
                .update({
                    is_incoming: false,
                    is_ongoing: false,
                    is_done: false
                })
                .eq('receipt_no', receipt_no)
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
    const confirmOrder = async (receipt_no: number) => {
        const { supabase } = data;
        try {
            const {error, count} = await supabase
                .from('Drink Order Status')
                .update({
                    is_incoming: false,
                    is_ongoing: true,
                    is_done: false
                })
                .eq('receipt_no', receipt_no)
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

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />
    
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold">Food and Drinks</h1>
        </div>

        <!-- container for the two boxes -->
        <div class="flex gap-8">

            <!-- user alerts -->
            <div class="flex-1">
                <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 grow min-h-[600px] overflow-hidden">

                    <!-- for padding -->
                    <div class="p-12 min-h-full rounded-3xl grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                        <!-- button: left -->
                        <button type="button" class="btn bg-primary-600 text-tertiary-300 rounded-full w-12 h-12 flex justify-center items-center shadow-md" on:click={carouselLeft}>
                            ⮜
                        </button>
            
                        <!-- images -->
                        <div bind:this={elemCarousel} class="mx-20 snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
                            {#each unsplashIds as unsplashId}
                                <img
                                    class="snap-center w-[1024px] rounded-container-token"
                                    src="https://images.unsplash.com/photo-{unsplashId}"
                                    alt={unsplashId}
                                    loading="lazy"
                                />
                            {/each}
                        </div>
        
                        <!-- button: right -->
                        <button type="button" class="btn bg-primary-600 text-tertiary-300 rounded-full w-12 h-12 flex justify-center items-center shadow-md" on:click={carouselRight}>
                        ⮞
                        </button>
                            
                        <!-- information, changes when carousel is moved -->
                        <div class="col-span-3 text-center mb-4">
                            <p class="text-surface-800">Food ID</p>
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Name" aria-label="Product Name">
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Price" aria-label="Price">
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Food Type" aria-label="Food Type">
                        </div>
                    </div>
                    
                    <div class="py-7 flex flex-row justify-end items-end">
                        <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 mr-12 font-semibold">Update</button>
                    </div>
                </div>

            </div>

            <!-- date reservations -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold">Incoming Orders</h1>
                    </div>

                    <div class="py-6 flex-grow">

                        <!-- one entry -->
                        {#each drinkReceiptRows as drinkReceiptRow}
                            {#each drinkOrderStatusRows as drinkOrderStatusRow}
                                {#if drinkReceiptRow.receipt_no === drinkOrderStatusRow.receipt_no && drinkOrderStatusRow.is_incoming}      
                                    <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                                        <div>
                                            <p>Receipt No. {drinkReceiptRow.receipt_no}</p>
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
                                            <p>{drinkReceiptRow.total_price}</p>
                                        </div>
                                        <div class="flex flex-auto mx-auto">
                                            <button on:click={() => {confirmOrder(drinkReceiptRow.receipt_no);}} class="btn bg-primary-600 text-tertiary-300">✓</button>
                                            <button on:click={() => {cancelOrder(drinkReceiptRow.receipt_no);}} class="btn bg-red-600 text-tertiary-300">X</button>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        {/each}

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p>Receipt No.</p>
                            </div>
                            <div>
                                <p>Drink No.</p>
                            </div>
                            <div>
                                <p>Customer</p>
                            </div>
                            <div>
                                <p>Total</p>
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