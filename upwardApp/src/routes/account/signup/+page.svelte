<script lang="ts">
	import Header from '$lib/account/headerAccount.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    // import type { PageData } from '../login copy/$types';

    const handleSignup = (event: Event) => {

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const password = formData.get('password') as string;
    const conpassword = formData.get('conpassword') as string;

        if (password !== conpassword) {
            event.preventDefault();
            alert('Password and Confirm Password are not the same.');
        }


        if (password.length < 6) {
            event.preventDefault();
            alert('Password too short. Atleast 6 characters.');
        }
    };

</script>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <!-- should there be header?? -->

    <!-- screen div -->
    <div class="h-dvh w-dvw bg-surface-50">

        <!-- centerer -->
        <div class="flex flex-row min-h-screen justify-center items-center">

            <!-- main box -->
            <div class="grid grid-cols-2 rounded-3xl overflow-hidden w-9/12 shadow-xl">

                <div class="flex bg-primary-600 justify-center items-center">
                    <div class="h2 font-bold text-tertiary-300">
                        UPward
                    </div>
                </div>

                <div class="block bg-surface-50">
                    <div class="w-3/4 mx-auto py-20">

                        <!-- login form -->
                        <form method="POST" on:submit={handleSignup} action="?/signup">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>



                            <div class="relative z-0 w-full mb-5 group">
                                <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <input type="password" name="conpassword" id="conpassword" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="conpassword" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                            </div>

                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="number" id="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                            </div>

                            <button  type="submit"  class="btn bg-tertiary-300 text-surface-50 hover:text-secondary-800 hover:bg-primary-50 rounded-xl border-none px-8 py-2 my-1 mt-9 text-sm font-semibold shadow-lg">Sign Up</button>
                        </form>

                        <!-- border -->
                        <hr class="my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />

                        <!-- signup link -->
                        <p class="text-gray-500 text-sm">Already have an account? Log in!</p>

                        <a href="login" class="btn bg-surface-50 text-tertiary-300 hover:text-primary-50 hover:bg-secondary-800 rounded-xl border-none px-8 py-2 my-1 mt-4 text-sm font-semibold shadow-lg">Login</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>