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

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        
        <div class="grid grid-cols-2 gap-12 py-10">

            <!-- user alerts -->
            <div class="col-span-1">
                <div class="grid grid-cols-9 grid-rows-6 gap-2">
                    <div class="col-span-8">
                        <div class="grid grid-flow-col justify-stretch items-center gap-1">
                            <div class="flex bg-surface-400 items-center rounded-2xl h-20">
                                <div class="flex mx-auto">Table 7</div>
                            </div>
                            <div class="flex bg-surface-400 items-center rounded-2xl h-20">
                                <div class="flex mx-auto">Table 6</div>
                            </div>
                            <div class="flex bg-surface-200 items-center rounded-2xl h-20">
                                <div class="flex mx-auto">Table 5</div>
                            </div>
                            <div class="flex bg-surface-200 items-center rounded-2xl h-20">
                                <div class="flex mx-auto">Table 4</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1 row-span-6 gap-2">
                        <div class="grid grid-flow-row justify-stretch items-center gap-1">
                            <div class="flex bg-surface-200 items-center rounded-2xl h-44">
                                <div class="flex mx-auto">Table 1</div>
                            </div>
                            <div class="flex bg-surface-200 items-center rounded-2xl h-44">
                                <div class="flex mx-auto">Table 2</div>
                            </div>
                            <div class="flex bg-surface-200 items-center rounded-2xl h-44">
                                <div class="flex mx-auto">Table 3</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-8 row-span-5">
                        <div class="flex bg-surface-400 items-center rounded-2xl h-full">
                            <div class="flex mx-auto">Table 8</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- date reservations -->
            <div class="card col-span-1">

                <!-- for padding -->
                <div class="px-12 py-6">
                    <h1 class="h3 font-bold mb-5">Reservations</h1>

                    <!-- one entry -->
                    <div class="grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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

                    <!-- one entry -->
                    <div class="grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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

                    <!-- one entry -->
                    <div class="grid grid-flow-col justify-stretch items-center gap-3 pb-4">
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

                </div>

            </div>

        </div>

        <!-- table details -->
        <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-20">

            <!-- for padding -->
            <div class="px-12 py-6">
                <h1 class="h3 font-bold">Table No. 1</h1>
            </div>
            
            <div class="px-12 pt-2 pb-6">

                <!-- one entry -->
                <div class="flex flex-auto justify-normal items-center gap-16 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Hours Remaining</p>
                    </div>
                    <div>
                        <p>Date Reserved</p>
                    </div>
                </div>

                <!-- one entry -->
                <div class="flex flex-auto justify-normal items-center gap-16 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Hours Remaining</p>
                    </div>
                    <div>
                        <p>Date Reserved</p>
                    </div>
                </div>

                <!-- one entry -->
                <div class="flex flex-auto justify-normal items-center gap-16 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Hours Remaining</p>
                    </div>
                    <div>
                        <p>Date Reserved</p>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>