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
    <div class="w-dvw pl-40 pr-20 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold font-fredoka">Welcome back, Admin Name!</h1>
            <div class="text-right">
                <p>Number of User Accounts: ###</p>
                <p>Users Online Now: ###</p>
            </div>
        </div>

        <!-- container for the two boxes -->
        <div class="flex gap-8">

            <!-- user alerts -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-auto overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Table Details</h1>
                    </div>

                    <div class="pt-10 py-6 flex-grow">
                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 1</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 2</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 3</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 4</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 5</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 6</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 7</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>

                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                            <div>
                                <p class="font-bold">Table 8</p>
                            </div>
                            <div>
                                <p>Customer Name</p>
                            </div>
                            <div>
                                <p>Time/Credit Status</p>
                            </div>
                            <div>
                                <a href="/adminMain" class="text-tertiary-300 font-semibold hover:underline">Notify</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        <!-- Reservation Section -->
        <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-auto overflow-hidden grid grid-rows-2 h-[600px]">
            <!-- Upcoming Reservations -->
            <div class="px-12 py-6 overflow-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Upcoming Reservations</h2>
                </div>
                <div class="flex-grow upcoming-reservations-container">
                    <!-- One entry -->
                    <div class="grid grid-cols-5 items-center gap-3 pb-4">
                        <div>
                            <p>Reservation ID</p>
                        </div>
                        <div>
                            <p>Customer ID</p>
                        </div>
                        <div>
                            <p>Table No.</p>
                        </div>
                        <div>
                            <p>Per hour</p>
                        </div>
                        <div class="flex flex-auto mx-auto">
                            <button class="btn bg-primary-600 text-tertiary-300">✓</button>
                        </div>
                    </div>
                    <!-- Add more entries here as needed -->
                </div>
            </div>

            <!-- Ongoing Reservations -->
            <div class="px-12 py-6 overflow-auto border-t">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="h2 font-bold font-fredoka">Ongoing Reservations</h2>
                </div>
                <div class="flex-grow ongoing-reservations-container">
                    <!-- Ongoing reservation entries will dynamically appear here -->
                </div>
            </div>
        </div>

        </div>
    </div>

</div>