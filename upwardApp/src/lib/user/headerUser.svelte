<script>


    export let logout; // Receive the logout function through props

    // Use the logout function when the logout button is clicked
    const handleLogout = async () => {
        if (logout) {
            await logout(); // Call the logout function
        }
        console.log("LOGGING OUT");
    };


</script>

<div class="sticky top-0 z-40 h-20 w-full p-5 bg-secondary-800 shadow-xl">
    <div class="flex justify-between mx-5 items-stretch text-tertiary-300">
        <div class="flex items-center gap-3">
            <button class="btn bg-secondary-800 text-secondary-800 rounded border-none px-3 py-1 my-1 text-sm font-semibold">Log Out</button>
        </div>
        <!-- Logo Section -->
        <a href="/" class="flex items-center">
            <img src="/src/lib/landing/Upward logo2.png" 
                 alt="UPward Logo" 
                 class="h-10">
        </a>
        <!-- Logout Button -->
        <div class="flex items-center gap-3">
            <button 
                class="btn bg-surface-50 hover:text-secondary-800 hover:bg-surface-300 rounded border-none px-3 py-1 my-1 text-sm font-semibold"
                on:click={handleLogout}>
                Log Out
            </button>
        </div>
    </div>
</div>