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

    export let data:PageData;

    interface Table{
        tableID: number;
        tableName: string;
        description: string;
        pax: number;
        tableType: string;
    }

    interface TableAvailability{
        tableAvailNo: number;
        tableID: number;
        availability: boolean;
        customerID: string;
    }

    interface TableReservation{
        reservationID: number;
        dateReserved: Date;
        customerID: string;
        tableID: number;
        duration: Date;
        dateEnd: Date;
    }

    interface TableReservationStatus{
        reservationID: number;
        isIncoming: boolean;
        isOngoing: boolean;
        isDone: boolean;
    }

    interface Customer {
        customerID: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
    }

    let tableRows : Table[] = [];
    let tableAvailabilityRows: TableAvailability[] = [];
    let tableReservationRows: TableReservation[] = [];
    let tableReservationStatusRows: TableReservationStatus[] = [];
    let customerRows : Customer[] = [];

    onMount(() => {
        try {
            tableRows = data.tables || [];
            tableAvailabilityRows = data.tableAvailability || [];
            tableReservationRows = data.tableReservation || [];
            tableReservationStatusRows = data.tableReservationStatus || [];
            customerRows = data.customer || [];
            console.log("tableRows:", tableRows);
            console.log("tableAvailabilityRows:", tableAvailabilityRows);
            console.log("tableReservationRows:", tableReservationRows);
            console.log("tableReservationStatusRows:", tableReservationStatusRows);
            console.log("customerRows:", customerRows);
            
        } catch (error) {
            console.error(error);
            tableRows = [];
            tableAvailabilityRows = [];
            tableReservationRows = [];
            tableReservationStatusRows = [];
            customerRows = [];
        }
    });
</script>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />
   
    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10 bg-surface-50">
        <div class="flex justify-between items-center px-8 pb-6">
            <h1 class="h2 font-bold">Tables</h1>
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
                            <h1 class="h2 font-bold">Table 1</h1>
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
                        <h1 class="h1 font-bold">Upcoming Reservations</h1>
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