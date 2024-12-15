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
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold font-fredoka">Tables</h1>
        </div>
        
        <!-- container for the two boxes -->
        <div class="flex gap-8">

            <!-- table display -->
            <div class="w-3/5 flex-col gap-5">

                <!-- tables -->
                <div class="mb-6 h-96">
                    <div class="grid grid-cols-5 grid-rows-3 gap-2 min-h-full min-w-full">
                        <div class="col-start-5 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 1</div>
                        <div class="col-start-5 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200">Table 2</div>
                        <div class="col-start-5 row-start-3 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 3</div>
                        <div class="col-start-4 row-start-1 rounded-2xl flex justify-center items-center bg-surface-400 text-surface-50">Table 4</div>
                        <div class="col-start-3 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 5</div>
                        <div class="col-start-2 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 6</div>
                        <div class="col-start-1 row-start-1 rounded-2xl flex justify-center items-center bg-surface-200">Table 7</div>
                        <div class="col-span-4 row-span-2 col-start-1 row-start-2 rounded-2xl flex justify-center items-center bg-surface-200">Table 8</div>
                    </div>
                </div>

                <!-- reservations to tables -->
                <div class="bg-surface-50 border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                    <!-- for padding -->
                    <div class="px-12 min-h-full flex flex-col">

                        <div class="pt-6">
                            <h1 class="h2 font-bold font-fredoka">Table 1</h1>
                            <!-- remove this p when done implementing -->
                            <p class="mt-1 blockquote">display changes depending on clicked box, grayed out tables mean someone is currently occupying</p>
                        </div>


                        <div class="py-6 flex-grow">

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                                <div>
                                    <p>Customer Name</p>
                                </div>
                                <div>
                                    <p>Hours Remaining</p>
                                </div>
                                <div>
                                    <p>Date Reserved</p>
                                </div>
                            </div>

                            <!-- one entry -->
                            <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
                                <div>
                                    <p>Customer Name</p>
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

            <!-- date reservations -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 w-2/5 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 min-h-full flex flex-col">
                    <div class="pt-6 flex flex-row justify-between items-center">
                        <h1 class="h1 font-bold font-fredoka">Upcoming Reservations</h1>
                    </div>

                    <div class="pt-10 py-6 flex-grow">
                        <!-- one entry -->
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
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
                        <div class="grid grid-flow-col justify-between items-center gap-3 pb-4">
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

        </div>

            <!-- 
            

            <div class="card col-span-1">

                <div class="px-12 py-6">
                    <h1 class="h3 font-bold mb-5">Reservations</h1>

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

        <div class="border-4 shadow-lg border-primary-600 rounded-3xl mb-20">

            <div class="px-12 py-6">
                <h1 class="h3 font-bold">Table No. 1</h1>
            </div>
            
            <div class="px-12 pt-2 pb-6">

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

        -->

    </div>

</div>