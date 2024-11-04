<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
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
                        
    /**
    
    const modalStore = getModalStore();

    function makeAnAccount(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'CreateAccount',
        };
        modalStore.trigger(modal);
    }

    interface Room {
        dormNo: number;
        PAX: number;
        airconStatus: boolean;
        personalCrStatus: boolean;
        personalSinkStatus: boolean;
        monthlyRent: number;
        floor: number;
        roomName: string;
        // Add other columns as needed
  }

    interface Availability {
        dormNo: number;
        availability: boolean;
        availableSlots: number;
        preexistingTenants: number;
        // Add other columns as needed
    }

    export let data:PageData;
    const { rooms, availability }: { rooms: Room[], availability: Availability[] } = data;

    let roomRows: Room[] = [];
    let availRows: Availability[] = [];
    let availableRooms: Room[] = [];

    onMount(() => {
        try {
            roomRows = rooms || [];
            availRows = availability || [];
            availableRooms = roomRows.filter(room => {
                const roomAvailability = availRows.find(avail => avail.dormNo === room.dormNo);
                return roomAvailability && roomAvailability.availability;
            });
        } catch (error) {
            console.error(error);
            roomRows = [];
            availRows = [];
            availableRooms = [];
        }
    });

    function createArray(length: number): number[] {
        return Array.from({ length }, (_, i) => i);
    } 

    */

</script>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, Customer ID!</h1>

        <!-- reservation details -->
        <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-20">

            <!-- for padding -->
            <div class="px-12 py-6">
                <h1 class="h3 font-bold">Reservation Details</h1>
            </div>
            
            <form class="px-12 w-1/2 pb-20">
                <label for="tableNum">Table Number</label>
                <select name="tableNum" class="select rounded-full mt-1 mb-3">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                </select>

                <label for="tableRate">Table Rate</label>
                <select name="tableRate" class="select rounded-full mt-1 mb-3">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                </select>

                <label for="tableDate">Appointment Date</label>
                <input name="tableDate" type="date" class="rounded-full mt-1 mb-3">

                <p>Total:</p>
            </form>

        </div>


        <!-- reserve -->
        <div class="mx-80 mb-20">
            <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center shadow-lg">

                <!-- button: left -->
                <button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
                    <i class="fa-solid fa-arrow-left" />
                </button>

                <!-- mages -->
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
                <button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
                    <i class="fa-solid fa-arrow-right" />
                </button>
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