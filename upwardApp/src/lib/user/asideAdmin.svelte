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
                <a href="/adminMain" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Admin</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/tables" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Tables</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/orders" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Orders</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/logbook" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Logbook</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/users" class="flex items-center p-2 text-surface-900 rounded-lg hover:bg-primary-600 hover:text-surface-50 group">
                    <span class="ms-3">Users</span>
                </a>
            </li>
        </ul>
    </div>
</aside>