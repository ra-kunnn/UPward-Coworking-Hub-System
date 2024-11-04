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
    
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="grid grid-flow-col mx-96 justify-center items-center px-8 pt-10 pb-4 gap-5">
            <p>Search customer:</p>
            <input name="dateFrom" type="text" class="input rounded-full w-60">
        </div>

        <div class="grid grid-flow-col mx-96 justify-center items-center px-8 pb-6 gap-10">

            <div class="flex items-center">
                <input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-secondary-800">
                <label for="default-radio-1" class="ms-2 font-medium">ID</label>
            </div>

            <div class="flex items-center">
                <input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-secondary-800">
                <label for="default-radio-1" class="ms-2 font-medium">Name</label>
            </div>
        </div>

        
        <div class="mx-80 mb-20">
            <div class="card items-center shadow-lg pb-6">

                <div class="px-12 py-6">
                    <h1 class="h3 font-bold">Customers</h1>
                </div>

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Customer Name</p>
                    </div>
                    <div>
                        <p>Credits and Reservations</p>
                    </div>
                    <div>
                        <p>E-mail</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                    </div>
                </div>

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Customer Name</p>
                    </div>
                    <div>
                        <p>Credits and Reservations</p>
                    </div>
                    <div>
                        <p>E-mail</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                    </div>
                </div>

                <!-- one entry -->
                <div class="px-12 grid grid-flow-col justify-stretch items-center gap-3 pb-4">
                    <div>
                        <p>Customer ID</p>
                    </div>
                    <div>
                        <p>Customer Name</p>
                    </div>
                    <div>
                        <p>Credits and Reservations</p>
                    </div>
                    <div>
                        <p>E-mail</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                    </div>
                </div>

            </div>
        </div>

    </div>

</div>