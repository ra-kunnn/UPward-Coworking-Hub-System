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