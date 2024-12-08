<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from '../foodAnddrink/$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';

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

<style>
    /* Custom select dropdown styling */
    .select {
        background-color: white; /* Matches the white background */
        border: 1px solid #38728A; /* Matches the border color */
        border-radius: 20px; /* Rounded corners */
        padding: 0.5rem 1rem; /* Padding for spacing */
        width: 100%; /* Ensure it takes up the full width of the container */
        transition: border-color 0.3s ease, background-color 0.3s ease; /* Smooth transition on focus */
    }
</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header {logout}/>

    <!-- aside -->
    <Aside />
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <!-- orders -->
        <div class="mx-80 mb-20">
            <div class="card p-4 bg-white border-4 border-primary-600 rounded-3xl grid grid-cols-[auto_1fr_auto] gap-4 items-center shadow-lg">

                <!-- button: left -->
                <button type="button" class="btn bg-primary-600 text-tertiary-300 rounded-full w-12 h-12 flex justify-center items-center shadow-md" on:click={carouselLeft}>
                ⮜
                </button>

                <!-- images -->
                <div bind:this={elemCarousel} class="m-20 snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
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
                <!-- information -->
                <div class="col-span-3 text-center mb-4">
                    <p class="text-surface-800">Food No.</p>
                    <p class="text-surface-800">Description</p>
                    <p class="text-surface-800">Price</p>
                    <p class="text-surface-800">Food Type</p>
                </div>
            </div>
        </div>


        <!-- order details -->
        <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-10">

            <!-- for padding -->
            <div class="px-12 py-6">
                <h1 class="h3 font-bold">Order Details</h1>
            </div>
            
            <form class="px-12 w-1/2 pb-20">
                <label for="tableNum">Food Number</label>
                <select name="tableNum" class="select rounded-full mt-1 mb-3">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                </select>

                <p class="mb-3">Availability:</p>
                <p class="mb-3">Stock Remaining:</p>
                <p class="mb-3">Total:</p>
            </form>

        </div>

        <div class="flex flex-row justify-center items-center mb-10">
            <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold">Add Booking/Order</button>
        </div>

    </div>

</div>