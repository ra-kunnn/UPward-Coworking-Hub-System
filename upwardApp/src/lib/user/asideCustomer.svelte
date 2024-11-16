<script lang="ts">
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    function passwordChange(): void {
        const modal: ModalSettings = {
        type: 'component',
        component: 'ChangePassword',
        };
        modalStore.trigger(modal);
    }
</script>

<aside class="fixed top-20 left-0 z-20 w-60 h-screen">
    <div class="h-full px-3 py-4 overflow-y-auto bg-white shadow">
        <ul class="space-y-2 font-medium">
            <li>
                <a href="/customerMain" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Reserve</span>
                </a>
            </li>
            <li>
                <a href="/customerMain/timeCredits" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Time Credits</span>
                </a>
            </li>
        </ul>
    </div>
</aside>