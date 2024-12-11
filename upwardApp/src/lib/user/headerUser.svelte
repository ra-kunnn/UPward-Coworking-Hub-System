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

<div class="sticky top-0 z-40 h-20 w-full p-5 mx-auto bg-secondary-800 shadow-xl">
    <div class="flex justify-between mx-20 items-center text-tertiary-300">
        <span class="font-semibold max-sm:font-bold text-xl max-md:text-base max-[480px]:text-xs">UPward</span>
        <div class="flex items-center gap-3">
            <button class="btn bg-surface-50 hover:text-secondary-800 hover:bg-surface-300 rounded border-none px-3 py-1 my-1 text-sm font-semibold" on:click={handleLogout}>Log Out</button>
        </div>
    </div>
</div>