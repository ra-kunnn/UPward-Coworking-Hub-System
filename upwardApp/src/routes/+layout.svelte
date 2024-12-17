<script lang="ts">

    
    import "../app.css";
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import type { ModalComponent } from '@skeletonlabs/skeleton';
    initializeStores();

    import { goto, invalidate } from '$app/navigation';
    import { onMount } from 'svelte';

    import Error from '$lib/modals/errorModal.svelte';
    import Confirm from '$lib/modals/confirmModal.svelte';

    const modalRegistry: Record<string, ModalComponent> = {
        Error: { ref: Error },
        Confirm: { ref: Confirm }
    };
   
    export let data;
    let { session, supabase } = data;

    /**
    onMount(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (!newSession) {
                setTimeout(() => {
                    goto('/', { invalidateAll: true });
                });
            } else if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => subscription?.unsubscribe();
    });

    */

    
</script>

<svelte:head>
    <title>UPward Coworking Hub System</title>
</svelte:head>

<Modal components={modalRegistry} />

<slot />
