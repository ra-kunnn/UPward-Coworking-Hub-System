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

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />
    
    <Aside />

    <!-- main div -->
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

        <div class="mx-80 mb-20">
            <div class="card bg-white border-4 border-primary-600 rounded-3xl shadow-lg pb-6">

                <div class="px-12 py-6">
                    <h1 class="h3 font-bold">Orders</h1>
                </div>

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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