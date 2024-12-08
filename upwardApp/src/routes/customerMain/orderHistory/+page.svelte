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
        window.location.href = "/";
        if (error) {
            console.error(error);
            }
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
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, Customer ID!</h1>

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