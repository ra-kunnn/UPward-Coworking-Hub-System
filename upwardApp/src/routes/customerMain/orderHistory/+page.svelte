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
    <Header {logout}/>

    <!-- aside -->
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, {customer_name}}!</h1>

        <!-- table details -->
        <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-20">

            <!-- for padding -->
            <div class="px-12 py-6">
                <h1 class="h3 font-bold">Order Details</h1>
            </div>
            
            <div class="px-12 pt-2 pb-6">
                <p class="mb-3">Pending</p>
                <p class="mb-3"></p>
                <p class="mb-3"></p>
            </div>

        </div>
       
    </div>

</div>