<script lang="ts">
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    export let show = true;
    const close = () => {
        show = false;
        dispatch('close');
    };
</script>

{#if show}
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50" on:click={close} >
    <div class="mx-auto my-52 max-w-sm bg-white rounded-lg shadow-xl p-10" on:click|stopPropagation>
        <h3 class="text-lg font-medium mb-4"> Modal Title </h3>
        <p class="text-gray-700 mb-4"> Modal Content Goes Here </p>
        <div class="flex-justify-end">
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400" on:click={close} >
                Close
            </button>
        </div>
    </div> 
</div>
{/if}
