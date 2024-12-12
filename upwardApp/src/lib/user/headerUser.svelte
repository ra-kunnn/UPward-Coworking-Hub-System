<script>

    /**

    export let logout; // Receive the logout function through props

    // Use the logout function when the logout button is clicked
    const handleLogout = async () => {
        if (logout) {
            await logout(); // Call the logout function
        }
    };

    */

</script>

<div class="sticky top-0 z-40 h-20 w-full p-5 mx-auto bg-secondary-800 shadow-xl">
    <div class="flex justify-between mx-20 items-center text-tertiary-300">
        <a href="/" class="flex items-center">
            <img src="/src/lib/landing/Upward logo1.png" alt="UPward Logo" class="h-10 max-sm:h-8 max-md:h-6 max-[480px]:h-4">
        </a>
        <div class="flex items-center gap-3">
            <a href="/" class="btn bg-surface-50 hover:text-secondary-800 hover:bg-surface-300 rounded border-none px-3 py-1 my-1 text-sm font-semibold">Log Out</a>
        </div>
    </div>
</div>