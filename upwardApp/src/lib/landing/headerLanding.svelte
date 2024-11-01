<script lang="ts">
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    function logIn(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'LogIn',
        };
        modalStore.trigger(modal);
    }

    function signUp(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'SignUp',
        };
        modalStore.trigger(modal);
    }
</script>

<div class="sticky top-0 z-40 h-20 w-full p-5 mx-auto bg-secondary-800 shadow-xl">
    <div class="flex justify-between mx-20 items-center text-tertiary-300">
        <span class="font-semibold max-sm:font-bold text-xl max-md:text-base max-[480px]:text-xs">UPward</span>
        <div class="flex items-center gap-3">
            <button on:click={logIn} class="bg-surface-50 rounded border-none px-3 py-1 my-1 text-sm font-semibold">Log In</button>
            <button on:click={signUp} class="bg-tertiary-500 text-surface-50 rounded border-none px-3 py-1 my-1 text-sm font-semibold">Sign Up</button>
        </div>
    </div>
</div>