<script lang="ts">
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    const modalStore = getModalStore();
    let sidebarVisible = false; // State to toggle the sidebar visibility
    let currentPath = '';

    function passwordChange(): void {
        const modal: ModalSettings = {
            type: 'component',
            component: 'ChangePassword',
        };
        modalStore.trigger(modal);
    }

    onMount(() => {
        currentPath = window.location.pathname;
    });

    function toggleSidebar(): void {
        sidebarVisible = !sidebarVisible;
    }
</script>

<style>
    /* Sidebar Styling */
    .sidebar {
        width: 200px;
        height: 100vh;
        background-color: #ffffff;
        box-shadow: inset -4px 0 10px rgba(0, 0, 0, 0.1);
        border-top-right-radius: 70px;
        border-bottom-right-radius: 70px;
        overflow-x: hidden;
        position: fixed;
        z-index: 100;
        transition: transform 0.3s ease;
        transform: translateX(-100%); /* Initially hidden */
    }

    .sidebar.visible {
        transform: translateX(0); /* Show when visible */
    }

    /* Sidebar Item Styling */
    .sidebar-item {
        display: flex;
        align-items: center;
        padding: 15px;
        cursor: pointer;
        color: #333333;
        margin-top: 35px;
        position: relative;
        font-family: "fredoka";
        white-space: nowrap;
        white-space: normal; /* Allow text wrapping */
        word-break: break-word; /* Break long words if necessary */
    }

    .icon {
        font-size: 1.5em;
        margin-right: 10px;
    }

    .active {
        background-color: #38728A;
        color: #ffffff;
    }

    /* Hamburger Menu Styling */
    .hamburger {
        cursor: pointer;
        position: fixed;
        top: 25px;
        left: 30px;
        z-index: 150; /* Above sidebar */
    }

    .hamburger div {
        width: 25px;
        height: 3px;
        background-color: #ffff;
        margin: 5px 0;
        transition: all 0.3s ease;
    }
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');

    .font-fredoka {
        font-family: "Fredoka", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        font-variation-settings:
            "wdth" 100;
    }
</style>

<!-- Hamburger Button -->
<div class="hamburger" on:click={toggleSidebar}>
    <div></div>
    <div></div>
    <div></div>
</div>

<!-- Sidebar -->
<aside class="sidebar {sidebarVisible ? 'visible' : ''}">
    <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
            <li>
                <a href="/adminMain" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain' ? 'active' : ''}">
                    <span class="icon">⚙️</span>
                    <span class="text">Admin</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/create" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain/create' ? 'active' : ''}">
                    <span class="icon">📝</span>
                    <span class="text">Create</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/tables" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain/tables' ? 'active' : ''}">
                    <span class="icon">📋</span>
                    <span class="text">Tables</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/orders" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain/orders' ? 'active' : ''}">
                    <span class="icon">🛒</span>
                    <span class="text">Orders and Reservation</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/logbook" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain/logbook' ? 'active' : ''}">
                    <span class="icon">📘</span>
                    <span class="text">Logbook</span>
                </a>
            </li>
            <li>
                <a href="/adminMain/users" class="sidebar-item hover:bg-primary-600 hover:text-surface-50 rounded-lg {currentPath === '/adminMain/users' ? 'active' : ''}">
                    <span class="icon">🙍‍♂️</span>
                    <span class="text">Users</span>
                </a>
            </li>
        </ul>
    </div>
</aside>
