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
        if (error) {
            console.error(error);
        }
    };

    /*NO LOGOUT YET, ITS JUST REDIRECTING RN*/

    interface User {
        customer_name: string;
        customer_id: number;
        customer_phone: number;
        customer_email: string;
    }

    let customer_name: string = '';
    let customer_email: string = '';
    let customer_id: number = 0;

    console.log("TESTING CUST DATA" + customer_name);

    onMount(() => {
    console.log("IS IT MOUNTING??/");
        try {
            customer_name = data.user?.customer_name ?? '';
            customer_email = data.user?.customer_email ?? '';
            customer_id = data.user?.customer_id ?? 0;
            console.log("testing cookies"+ customer_id, customer_email);
        } catch (error) {
            console.error(error);
        }
    });

</script>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, {customer_name}</h1>
         
        <!-- container for the two boxes -->
        <div class="flex gap-8">
            <!-- table details -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold">Table Details</h1>
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
                        <h1 class="h1 font-bold">Order Details</h1>
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