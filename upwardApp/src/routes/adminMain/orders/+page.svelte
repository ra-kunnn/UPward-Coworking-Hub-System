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

    /**

    const modalStore = getModalStore();

    function billPopUp(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'BillingForm',
        };
        modalStore.trigger(modal);
    }

    export let data:PageData;

    const logout = async () => {
        const { supabase } = data; // Destructure supabase from data
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    };

    

    interface Tenant{
        tenantID: number;
        tenantName: string;
        tenantSex: string;
        dormNo: number;
        tenantEmail: string;
        tenantPhone: number;
    }

    interface Bills{
        billID: number;
        dormNo: number;
        dateIssued: Date;
        paymentStatus: boolean;
        datePaid: Date;
        monthlyRent: number;
        waterBill: number;
        electricityBill: number;
        hutRent: number;
        visitorOvernightBill: number;
        maintenanceBill: number;
        totalBillAmount?: number;
        
    }

    interface Visitors{
        visitorID: number;
        visitorName: string;
        startDateOfVisit: Date;
        visitorRelation: string;
        tenantID: number;
        endDateOfVisit: Date;
        isApproved: boolean;
    }

    interface Maintenance{
        maintenanceID: number;
        maintenanceRequest: string;
        startDateOfMaintenance: Date;
        dormNo: number;
        endDateOfMaintenance: Date;
        isDone: boolean;
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
    const maxThings = 4;



    let managerName: string = '';
    let managerEmail: string = '';
    let tenantRows: Tenant[] = [];
    let billRows: Bills[] = [];
    let visitorRows: Visitors[] = [];  
    let maintenanceRows: Maintenance[] = [];
    let roomRows: Room[] = [];
    const maxBills = 4;

    function calculateTotalBillAmount(bill: Bills): number {
        return bill.monthlyRent + bill.waterBill + bill.electricityBill + bill.hutRent + bill.visitorOvernightBill + bill.maintenanceBill;
    }

    onMount(() => {
        try {
            billRows = data.bill || [];
            tenantRows = data.allTenants || [];
            visitorRows = data.visitor || [];
            maintenanceRows = data.maintenance || [];
            roomRows = data.rooms || [];
            managerName = data.user[0]?.managerName ?? '';
            managerEmail = data.user[0]?.managerEmail ?? '';
            Cookies.set('email', managerEmail);
            billRows = billRows.map(bill => ({
                ...bill,
                totalBillAmount: calculateTotalBillAmount(bill)
            }));
            
        } catch (error) {
            console.error(error);
            tenantRows = [];
            billRows = [];
        }
    });
    
    Cookies.set('email', managerEmail); 
    function handleProfile(event) {
        managerName = event.detail.managerName;
        managerEmail = event.detail.managerEmail;
  }

    
    function getYear(date: Date): number {
        return date.getFullYear();
    }
    function getMonth(date: Date): number {
        return date.getMonth() + 1; // Months are zero-based, so we add 1
    }
    const confirmPayment = async (billID: number) => {

            const { error: billError } = await supabase
                .from('Tenant Bill') 
                .update([
                {
                    paymentStatus : true,
                },
                ])
                .eq('billID', billID);

                if (billError) {
                    console.error('Error confirming payment:', billError);
                    alert('Error confirming payment');
                } 
       
       

        alert('Payment Confirmed');
        window.location.reload();
    };
    const confirmVisitor = async (visitorID: number) => {

            const { error: visitorError } = await supabase
                .from('Visitor Info') 
                .update([
                {
                    isApproved : true,
                },
                ])
                .eq('visitorID', visitorID);

                if (visitorError) {
                    console.error('Error confirming visit:', visitorError);
                    alert('Error confirming visit');
                } 
       
       

        alert('Visit Confirmed');
        window.location.reload();
    };
    const confirmMaintenance = async (maintenanceID: number) => {

            const { error: maintenanceError } = await supabase
                .from('Maintenance Info') 
                .update([
                {
                    isDone: true,
                },
                ])
                .eq('maintenanceID', maintenanceID);

                if (maintenanceError) {
                    console.error('Error marking maintenance done:', maintenanceError);
                    alert('Error marking maintenance done');
                } 
       
       

        alert('Maintenance Done');
        window.location.reload();
    };

    */
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
    <Header />
    
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold font-fredoka">Food and Drinks</h1>
        </div>

        <!-- container for the two boxes -->
        <div class="flex gap-8">

            <!-- user alerts -->
            <div class="flex-1">
                <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 grow h-[600px] overflow-hidden">

                    <!-- for padding -->
                    <div class="p-12 h-[600px] rounded-3xl grid grid-cols-[auto_1fr_auto] gap-4 items-center">
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
                        <div class="col-span-3 text-center">
                            <p class="text-surface-800">Food ID</p>
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Name" aria-label="Product Name">
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Price" aria-label="Price">
                            <input class="appearance-none bg-transparent border-none w-full text-surface-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center" type="text" placeholder="Food Type" aria-label="Food Type">
                        </div>

                    </div>
                            
                </div>
                        
                <div class="flex flex-row justify-end items-end">
                    <button class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold">Update</button>
                </div>

            </div>

           <!-- Orders Section -->
           <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden grid grid-rows-2 h-[600px]">
            <!-- Incoming Orders -->
            <div class="px-12 py-6 overflow-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Incoming Orders</h2>
                </div>
                <div class="flex-grow">
                    <!-- One entry -->
                    <div class="grid grid-cols-5 items-center gap-3 pb-4">
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
                    <!-- Add more entries here as needed -->
                </div>
            </div>

            <!-- Ongoing Orders -->
            <div class="px-12 py-6 overflow-auto border-t">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Ongoing Orders</h2>
                </div>
                <div class="flex-grow ongoing-orders-container">
                    <!-- Ongoing order entries will dynamically appear here -->
                </div>
            </div>
        </div>
    </div>    

</div>

</div>