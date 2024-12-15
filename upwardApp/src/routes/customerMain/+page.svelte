<script lang="ts">
	import Header from '$lib/user/headerUser.svelte';
    import Aside from '$lib/user/asideCustomer.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';
    import { SlideToggle } from '@skeletonlabs/skeleton';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';

    import SelectorModal from '$lib/user/selectorModal.svelte';
    let showModal = false;
    const handleClose = () => {
        showModal = false;
    };

    let toggleReserve: boolean = true;
    let toggleOrder: boolean = true;
                        
    /** values for reserve selection */
    let reservePlaceholder = 'Select a reservation rate...';
	let reserveOptions = [{
		label: "Hourly Rate (100Php)",
		value: "1"
	}, {
		label: "Daily Rate (100Php)",
		value: "2"
	}, {
		label: "Weekly Rate (100Php)",
		value: "3"
	}];
	let reserveSelected = "";

    /** Placeholder and drink options */
    let orderPlaceholder = 'Select a drink...';
    let drinkOptions = [
        { label: "Drink 1", value: "1", price: 40, count: 0 },
        { label: "Drink 2", value: "2", price: 40, count: 0 },
        { label: "Drink 3", value: "3", price: 40, count: 0 },
        { label: "Drink 4", value: "4", price: 40, count: 0 },
        { label: "Drink 5", value: "5", price: 40, count: 0 },
        { label: "Drink 6", value: "6", price: 40, count: 0 },
        { label: "Drink 7", value: "7", price: 40, count: 0 },
        { label: "Drink 8", value: "8", price: 40, count: 0 },
        { label: "Drink 9", value: "9", price: 40, count: 0 },
    ];
    let totalOrder = [];

    /** Increment drink count */
    function increment(drink) {
        drink.count++;
        drinkOptions = [...drinkOptions]; // Trigger reactivity
        updateTotalOrder();
    }

    /** Decrement drink count */
    function decrement(drink) {
        if (drink.count > 0) {
            drink.count--;
            drinkOptions = [...drinkOptions]; // Trigger reactivity
            updateTotalOrder();
        }
    }

    /** Update total order */
    function updateTotalOrder() {
        totalOrder = drinkOptions.filter(drink => drink.count > 0);
    }

    let tableOptions = []; // Holds the processed table options
    let tableSelected = 'shared'; // Selected 
    let chosenTable_id = "";
    let chosenTable_type = "";



    export let data:PageData;

    const logout = async () => {
        const { supabase } = data; // Destructure supabase from data
        const { error } = await supabase.auth.signOut();
        console.log("LOGGING OUT");
        document.cookie = 'sb-access-token=; Max-Age=0; path=/';
            document.cookie = 'sb-refresh-token=; Max-Age=0; path=/';
        window.location.replace('/redirectToHome');
        if (error) {
            console.error(error);
            }
        };

        interface User {
        customer_name: string;
        customer_id: number;
        customer_phone: number;
        customer_email: string;
    }

    let customer_name: string = '';
    let customer_email: string = '';
    let customer_id: number = 0;

    console.log("TESTING CUST DATA" + customer_name);

  

    onMount(async () => {
    console.log("IS IT MOUNTING??/");
        try {
            customer_name = data.user?.customer_name ?? '';
            customer_email = data.user?.customer_email ?? '';
            customer_id = data.user?.customer_id ?? 0;
            console.log("testing cookies"+ customer_id, customer_email);
        } catch (error) {
            console.error(error);
        }

});

    let tablePlaceholder = 'Select a table...';
    let tableTypePlaceholder = 'Select a table type...';

    const handleTableSelection = () => {
        const selectElement = document.getElementById("tableNum");
        const selectedOption = selectElement.selectedOptions[0]; // Get the selected <option> element
        chosenTable_id = selectedOption ? selectedOption.getAttribute('data-table-id') : ""; // Get the data-table-id

        chosenTable_type = selectedOption ? selectedOption.getAttribute('value') : "";
        //set global table type
        console.log(chosenTable_id, chosenTable_type + " should be tableID");
        
         setTimeout(() => {
         console.log("Calculating total with:", { chosenTable_type, chosenTable_id });
        calculateTotal();
    }, 0);
    };

const changeTable =  async () => {
        
        const { supabase } = data; // Destructure Supabase client from data
        try {
            // Fetch table data from Supabase
            const { data: tables, error: tableError } = await supabase
                .from('Table')
                .select('table_name, table_type, table_id');

            const { data: tableAvailability, error: availabilityError } = await supabase
                .from('Table Availability')
                .select('availability, table_id');

            if (tableError || availabilityError) throw error;

            const availabilityMap = new Map(
                   tableAvailability.map((entry) => [entry.table_id, entry.availability])
               );

            // Group and process the table data
            const groupedTables = {
                shared: [],
                drafting: [],
                individual: []
            };

            tables.forEach((table) => {
                   const isAvailable = availabilityMap.get(table.table_id); // Check availability
                   if (isAvailable) {
                       switch (table.table_type) {
                           case 'Sharing Table':
                               groupedTables.shared.push(table.table_name);
                               break;
                           case 'Drafting Table':
                               groupedTables.drafting.push(table.table_name);
                               break;
                           case 'Individual Focus':
                               groupedTables.individual.push(table.table_name);
                               console.log(table.table_name);
                               break;
                       }
                   }
               });

               let allTableOptions = [];

               // Add options for each table type dynamically
               if (groupedTables.shared.length > 0) {
                   groupedTables.shared.forEach((tableName) => {
                       const table = tables.find(t => t.table_name === tableName);
                       allTableOptions.push({
                           label: `Sharing Table (${tableName})`,
                           value: 'shared',
                           table_id: table?.table_id || null,
                       });
                   });
               } else {
                   allTableOptions.push({
                       label: "Sharing Tables (No available tables)",
                       value: null,
                       table_id: null,
                   });
               }

               if (groupedTables.individual.length > 0) {
                   groupedTables.individual.forEach((tableName) => {
                       const table = tables.find(t => t.table_name === tableName);
                       allTableOptions.push({
                           label: `Individual Focus (${tableName})`,
                           value: 'individual',
                           table_id: table?.table_id || null,
                       });
                   });
               } else {
                   allTableOptions.push({
                       label: "Individual Focus (No available tables)",
                       value: null,
                       table_id: null,
                   });
               }

               if (groupedTables.drafting.length > 0) {
                   groupedTables.drafting.forEach((tableName) => {
                       const table = tables.find(t => t.table_name === tableName);
                       allTableOptions.push({
                           label: `Drafting Table (${tableName})`,
                           value: 'drafting',
                           table_id: table?.table_id || null,
                       });
                   });
               } else {
                   allTableOptions.push({
                       label: "Drafting Tables (No available tables)",
                       value: null,
                       table_id: null,
                   });
               }

               // Filter out invalid options (e.g., those with value = null)
               allTableOptions = allTableOptions.filter(option => option.value !== null);

               console.log("Available options:", allTableOptions);


        // Update table options based on the selected table type
        $: {
    console.log("bruh, should show selected table", tableSelected);
    chosenTable_type = tableSelected;
    calculateTotal();

    if (tableSelected) {
        // Filter table options based on the selected table type
        tableOptions = allTableOptions.filter(option => option.value === tableSelected);
    } else {
        tableOptions = allTableOptions;
    }

    if (tableOptions.length === 0) {
        tablePlaceholder = 'No Available Tables';
    } else {
        tablePlaceholder = 'Select a table...'; // Default placeholder
    }


}

    } catch (err) {
        console.error("Error fetching tables:", err.message);
    }
    };


    // Watch for changes in reserveSelected and other relevant variables
    $: changeTable();

    $: if (chosenTable_type && chosenTable_id) {
    calculateTotal();}


    // Existing imports and declarations...

    let total_price: number | string = ""; // Default value for total_price
    let startDate: string = ""; // Variable for start date and time
    let endDate: string = ""; // Variable for end date and time
    let hours: number = 0;

    // Function to calculate the total price based on reservation type
    const calculateTotal = () => {

        const hourlySharedRate = 100; 
        const hourlyIndividualRate = 150;
        const hourlyDraftingRate = 200; 

        const dailySharedRate = 120; 
        const dailyIndividualRate = 170;
        const dailyDraftingRate = 220; 

        const weeklySharedRate = 1100; 
        const weeklyIndividualRate = 160;
        const weeklyDraftingRate = 210; 

        let hourlyRate: number = 0 ;
        let dailyRate: number = 0 ;
        let weeklyRate: number = 0 ;

        console.log("in calculate total, chosentabletype is" + chosenTable_type);

        if (reserveSelected === "1") { // Hourly rate

            if(chosenTable_type == "shared"){
                hourlyRate = hourlySharedRate;
            }
            else if(chosenTable_type == "individual"){
                hourlyRate = hourlyIndividualRate;
            }
            else if(chosenTable_type == "drafting"){
                hourlyRate = hourlyDraftingRate;
            }
            else{
                console.log("how bro");
                hourlyRate = 0;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Difference in hours
            total_price = hours > 0 ? Math.ceil(hours) * hourlyRate : console.log("Invalid time range.");

        } else if (reserveSelected === "2") { // Daily rate, daily rate lasts from time started until 6 am the next day

            if(chosenTable_type == "shared"){
                dailyRate = dailySharedRate;
            }
            else if(chosenTable_type == "individual"){
                dailyRate = dailyIndividualRate;
            }
            else if(chosenTable_type == "drafting"){
                dailyRate = dailyDraftingRate;
            }
            else{
                console.log("how bro");
                dailyRate = 0;
            }            
            total_price = dailyRate;
        } else if (reserveSelected === "3") { // Weekly rate, equivalent to 7 dailies, usuable within 2 weeks
            

            if(chosenTable_type == "shared"){
                weeklyRate = weeklySharedRate;
            }
            else if(chosenTable_type == "individual"){
                weeklyRate = weeklyIndividualRate;
            }
            else if(chosenTable_type == "drafting"){
                weeklyRate = weeklyDraftingRate;
            }
            else{
                weejlyRate = 0;
            }


            total_price = weeklyRate;


        } else {
            total_price = "Invalid selection.";
        }
    };


    // Watch for changes in reserveSelected and other relevant variables
    $: calculateTotal();

const handleConfirm = async () => {

    const { supabase } = data;
    if (toggleReserve) {
        handleTableSelection();
        console.log(total_price);
        const reserveForm = document.getElementById("reserveForm") as HTMLFormElement;
        if (reserveForm) {
            const formData = new FormData(reserveForm);

            const startDate = formData.get('startDate') as string;
            const endDate = formData.get('endDate') as string;
            
            const total = total_price;
            const customer_id =  data.user?.customer_id ?? 0;


            console.log(chosenTable_id + "in confirms")

            if (reserveSelected === "1") { // Hourly rate

            const durationHourInterval = `${Math.ceil(hours)} hours`; 

            console.log(customer_id, chosenTable_id, startDate, durationHourInterval, endDate);

                const { reserveError } = await supabase
                .from('Table Reservation')
                .insert({ 
                    customer_id: customer_id,
                    table_id: chosenTable_id,
                    date: startDate,
                    duration: durationHourInterval,
                    end_date: endDate,
                    price: total_price

                });
                 if (reserveError){
              console.log("errorr bruh. also u dont have an error message yet In Website")
             }
                
            } else if (reserveSelected === "2") { // Daily rate

                const start = new Date(startDate); // Convert startDate string to Date object

                // Create the end date: 6 AM the next day
                const dailyEnd = new Date(start);
                dailyEnd.setDate(dailyEnd.getDate() + 1); // Move to the next day
                dailyEnd.setHours(6, 0, 0, 0); // Set time to 6:00 AM

                // Calculate the duration in hours
                const dailyDuration = (dailyEnd.getTime() - start.getTime()) / (1000 * 60 * 60); // Duration in hours
                const durationDailyInterval = `${Math.ceil(dailyDuration)} hours`; // Round up to nearest hour


                 /*   const { reserveError } = await supabase
                .from('Table Reservation')
                .insert({ 
                    customer_id: customer_id,
                    table_id: ,
                    date: startDate,
                    duration: durationDailyInterval,
                    end_date: dailyEnd,
                    price: total_price

                });*/
            } else if (reserveSelected === "3") { // Weekly rate
                total_price = weeklyRate;
            } else {
                total_price = "Invalid selection.";
            }
    }
   }
   if (toggleOrder) {
        const orderForm = document.getElementById("orderForm") as HTMLFormElement;
        if (orderForm) {
            const orderData = new FormData(orderForm);
        }
    }
};


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

    /* Custom input style */
    .date-input {
        background-color: white; /* Match the white background of the card */
        border: 2px solid #38728A; /* Match the border color of the card */
        border-radius: 20px; /* Rounded corners to match .rounded-3xl */
        padding: 0.5rem 1rem; /* Add padding for a nice look */
        width: 100%; /* Make it fill the width of the container */
        transition: border-color 0.3s ease, background-color 0.3s ease; /* Smooth transition on focus */
    }

    /* Focus effect */
    .date-input:focus {
        outline: none; /* Remove default focus outline */
        border-color: #38728A; /* Keep the border color as primary when focused */
        background-color: #f1fdfd; /* Lighter background when focused */
    }


    /* Custom select dropdown styling */
    .select-style {
        background-color: white; /* Matches the white background */
        border: 1px solid #38728A; /* Matches the border color */
        border-radius: 20px; /* Rounded corners */
        padding: 0.5rem 1rem; /* Padding for spacing */
        width: 100%; /* Ensure it takes up the full width of the container */
        transition: border-color 0.3s ease, background-color 0.3s ease; /* Smooth transition on focus */
    }

    /* Focus effect to change border and background */
    .select-style:focus {
        outline: none; /* Remove default outline */
        border-color: #38728A; /* Keep the border color on focus */
        background-color: #fafafa; /* Lighter background on focus */
    }

    /* Styling for the options inside the select (optional) */
    .select-style option {
        padding: 0.5rem; /* Adds spacing to the option text */
    }

</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header {logout}/>

    <Aside />

    <!-- main div -->
    <div class="w-dvw px-40 py-10">
        <h1 class="px-8 pb-12 h2 font-bold">Hello, {customer_name}!</h1>


        <!-- container for the two boxes -->
        <div class="flex gap-8">
            <!-- reserve box -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 py-6 flex flex-row justify-between items-center">
                    <h1 class="h2 font-fredoka">Would you like to reserve?</h1>
                    <SlideToggle name="slide" bind:checked={toggleReserve} active="bg-primary-500" />
                </div>
                
                {#if toggleReserve}
                    <div class="flex pt-4 gap-6 px-12">
                        <div class="flex-1">
                            <form class="form-widget"id="reserveForm" method="POST" action="?/reserve" on:submit|preventDefault>
                                <label for="tableType">Table Type</label>
                                <select name="tableType" bind:value={tableSelected} on:change={() => { changeTable(); handleTableSelection(); }} class="select-style rounded-full mt-1 mb-3">
                                    <option value='shared'>Sharing Table</option>
                                    <option value='individual'>Individual Focus Table</option>
                                    <option value='drafting'>Drafting Table</option>
                                </select>

            
                                <label for="tableNum">Table</label>
                                <select name="tableNum"  id="tableNum" class="select-style rounded-full mt-1 mb-3" on:change={() => { handleTableSelection(); }} required>
                                    <option value="" disabled selected >{tablePlaceholder}</option>
                                    {#each tableOptions as table}
                                        <option value={table.value} data-table-id={table.table_id}>{table.label}</option>
                                    {/each}
                                </select>
                                
            
                                <label for="tableRate">Reservation Rates</label>

                                <!-- change values in typescript -->
                                <select name="tableRate" class="select-style rounded-full mt-1 mb-3" bind:value={reserveSelected}  on:change={() => { handleTableSelection();}}>    
                                    {#if reservePlaceholder}
                                        <option value="" disabled selected>{reservePlaceholder}</option>
                                    {/if}
                                    {#each reserveOptions as option}
                                        <option value={option.value}>
                                            {option.label}
                                        </option>
                                    {/each}
                                </select>

                                <!-- change depending on selected rate -->
                                <div class="mt-5">
                                {#if reserveSelected == '1'}
                                    <!-- PUT THE START AND END HOURS SIDE BY SIDE-->

                                    <p>Hourly Rate is charged for every hour, smth minutes past the time is considered an hour</p> <br />
                                    
                                    <label for="startDate" class="mb-2">Start Time</label>
                                    <input name="startDate" type="datetime-local" class="input time-input rounded-3xl"  bind:value={startDate} on:change={calculateTotal}>
                                    <label for="endDate" class="mb-2">End Time</label>
                                    <input name="endDate" type="datetime-local" class="input time-input rounded-3xl"  bind:value={endDate} on:change={calculateTotal}>
                                {:else if reserveSelected == '2'}
                                    <p>Daily Rate lasts from time started until closing time (6 am). </p> <br />
                                    <label for="startDate" class="mb-2">Appointment Date</label>
                                    <input name="startDate" type="datetime-local" class="input date-input rounded-3xl" on:change={calculateTotal}>
                                {:else if reserveSelected == '3'}
                                    <p>Weekly Rate is good for 7 days but can be used flexibly within 2 weeks from appointment date. </p> <br />
                                    <label for="startDate" class="mb-2">Start Date</label>
                                    <input name="startDate" type="datetime-local" class="input time-input rounded-3xl"  bind:value={startDate} on:change={calculateTotal}>
                                {:else}
                                    <div></div>
                                {/if}
                                </div>

                                {#if reserveSelected}
                                    <div class="py-6">
                                        <p class="mt-2 font-semibold">Total: {total_price}</p>
                                    </div>
                                {/if}
                            </form>
                        </div>
                    </div>
                {:else}
                    <div class="min-h-full"></div>
                {/if}
                
                

            </div>

            <!-- order box -->
            <div class="bg-surface-50 min-h-[600px] border shadow-xl rounded-3xl mb-5 flex-1 overflow-hidden">

                <!-- for padding -->
                <div class="px-12 py-6 pb-10 flex flex-row justify-between items-center">
                    <h1 class="h2 font-fredoka">Would you like to order?</h1>
                    <SlideToggle name="slide" bind:checked={toggleOrder} active="bg-primary-500" />
                </div>
                
                {#if toggleOrder}

                <form class="px-12 pb-20" id="orderForm" method="POST" action="?/order" on:submit|preventDefault>

                    <div class="px-12 pb-20">

                        <label for="drinkOrder">Drink Selection</label>
                        
                        <div style=" border-color: #38728A; height: 10rem;" class="border my-1 rounded-3xl overflow-y-auto">

                            
                                {#each drinkOptions as drink}
                                    <div class="flex justify-between items-center px-4 py-2 border-b">
                                        <span>{drink.label} - ₱{drink.price}</span>
                                        <div class="flex items-center gap-5">
                                            <button class="border-none px-3 rounded-lg text-base" on:click={() => decrement(drink)}>-</button>
                                            <span>{drink.count}</span>
                                            <button class="border-none px-3 rounded-lg text-base" on:click={() => increment(drink)}>+</button>
                                        </div>
                                    </div>
                                {/each}
                        </div>

                        <div class="mt-4">
                            <h3>Order Summary</h3>
                            {#if totalOrder.length === 0}
                                <p>No drinks selected.</p>
                            {:else}
                                <ul>
                                    {#each totalOrder as drink}
                                        <li>{drink.label} x {drink.count} = ₱{drink.count * drink.price}</li>
                                    {/each}
                                </ul>
                                <p class="font-bold">Total: ₱{totalOrder.reduce((sum, drink) => sum + drink.count * drink.price, 0)}</p>
                            {/if}
                             
                        </div>
                    </div></form>
                   
                {:else}
                    <div class="min-h-full"></div>
                {/if}
                    
            </div> 

        </div>

        <!-- <SelectorModal show={showModal} on:close={handleClose} /> -->


        <div class="flex flex-row justify-end items-center">
            <button type="button" class="btn bg-primary-600 text-tertiary-300 rounded-full border-none px-5 py-2 my-1 font-semibold" on:click={() => {handleConfirm(); }}>Confirm</button>
            <!-- HANDLE TABLE SELECTION SHOULD ONLY RUN IF RESERVE IS TOGGLED!-->
        </div>
    </div>
</div>