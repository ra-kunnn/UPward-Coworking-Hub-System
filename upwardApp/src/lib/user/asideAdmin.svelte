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

<style>
    /* Sidebar Styling */
    .hover-sidebar {
        width: 125px; /* Initial width */
        height: 100vh;
        background-color: #ffffff;
        box-shadow: inset -4px 0 10px rgba(0, 0, 0, 0.1);
        border-top-right-radius: 70px;
        border-bottom-right-radius: 70px;
        overflow-x: hidden;
        transition: width 0.3s ease;
        position: fixed;
        z-index: 100;
    }

    .hover-sidebar:hover {
        width: 200px; /* Expanded width */
    }

    /* Sidebar Item Styling */
    .sidebar-item {
        display: flex;
        align-items: center;
        padding: 15px;
        cursor: pointer;
        color: #333333;
        margin-top: 50px;
        position: relative;
        font-family: "Inter", sans-serif;
        white-space: nowrap;
    }

    .icon {
        font-size: 1.5em;
        margin-right: 10px;
    }

    .text {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .hover-sidebar:hover .text {
        opacity: 1;
    }
</style>

<aside class="hover-sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
            <li>
                <a href="/adminMain" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg">
                    <span class="icon">⚙️</span>
                    <span class="text">Admin</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/tables" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg">
                    <span class="icon">📋</span>
                    <span class="text">Tables</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/orders" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg">
                    <span class="icon">🛒</span>
                    <span class="text">Orders</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/logbook" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg">
                    <span class="icon">📘</span>
                    <span class="text">Logbook</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/users" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg">
                    <span class="icon">🙍‍♂️</span>
                    <span class="text">Users</span>
                </a>
            </li>
        </ul>
    </div>
</aside>
