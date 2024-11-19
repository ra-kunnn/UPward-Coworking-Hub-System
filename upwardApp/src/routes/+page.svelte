<script lang="ts">
	import Header from '$lib/landing/headerLanding.svelte';
    import Footer from '$lib/footer.svelte';
    import HideOverflow from '$lib/hideOverflowX.svelte';
    import { onMount } from 'svelte';

    import type { PageData } from './$types';
	import HideOverflowX from '$lib/hideOverflowX.svelte';
    

    /**
 

    export let data:PageData;
    const { rooms, availability }: { rooms: Room[], availability: Availability[] } = data;

    let roomRows: Room[] = [];
    let availRows: Availability[] = [];
    let availableRooms: Room[] = [];

    onMount(() => {
        try {
            roomRows = rooms || [];
            availRows = availability || [];
            availableRooms = roomRows.filter(room => {
                const roomAvailability = availRows.find(avail => avail.dormNo === room.dormNo);
                return roomAvailability && roomAvailability.availability;
            });
        } catch (error) {
            console.error(error);
            roomRows = [];
            availRows = [];
            availableRooms = [];
        }
    });

    function createArray(length: number): number[] {
        return Array.from({ length }, (_, i) => i);
    } 

    */

    let currentIndex = 0; // Start with the center image
    const images: string[] = [
        '/src/lib/landing/rates.jpg',   // Left image
        '/src/lib/landing/coffee.jpg', // Center image
        '/src/lib/landing/drinks.jpg'   // Right image
    ];

    let fadeClass = 'fade-in'; // Initial class for the center image

    function changeImage(direction: 'left' | 'right'): void {
        // Change the fade class to fade out first
        fadeClass = 'fade-out';

        // Wait for the fade-out transition to finish
        setTimeout(() => {
            if (direction === 'left') {
                currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the left
            } else if (direction === 'right') {
                 currentIndex = (currentIndex + 1) % images.length; // Move to the right
            }
            // Reset the fade class to fade in the new image
            fadeClass = 'fade-in';
        }, 500); // Match this duration with your CSS transition duration
    }

    function setImage(index: number): void {
         currentIndex = index; // Set the current image based on the dot clicked
    }

</script>

<style>
    .carousel-image {
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    }
    
    .fade-out {
        opacity: 0;
        transform: scale(0.95);
    }
    
    .fade-in {
        opacity: 1;
        transform: scale(1);
    }
    .footer {
        background-color: #224C4D; 
        color: white;
    }

    .footer-square {
        width: 250px;
        height: 250px;
        border-radius: 25px;
    }

    .footer-section {
        font-family: "Inter", sans-serif;
        font-size: 18px;
        text-align: center;
    }

    .social-icons {
        font-size: 1.5rem;
        display: flex;
        gap: 15px;
    }

    html {
    scroll-behavior: smooth;
    }

</style>

<HideOverflow />

<!-- global container div -->
<div>

    <!-- header -->
    <Header />

    <div id="register-now" class="w-full my-10 px-20">
        <div class="flex justify-between items-center w-full p-8 bg-white max-lg:flex-col">
            <!-- Text Section -->
            <div class="w-2/3 max-lg:w-full max-lg:mb-6 text-secondary-800">
                <h2 class="font-inter font-semibold text-3xl mb-6">Join UPward Today</h2>
                <p class="font-inter text-l font-normal">
                    UPward is the ultimate work and study environment designed for students and professionals alike. 
                </p>
                <p class="font-inter text-l font-normal">
                    Enjoy a productive co-working space tailored to meet all your study needs. 
                </p>
                <p class="font-inter text-l font-normal mb-6">
                    Register now to access a dynamic hub for collaboration and focus!
                </p>
                <a href="account/signup" class="btn bg-tertiary-500 text-surface-50 hover:text-secondary-800 hover:bg-tertiary-600 rounded border-none px-4 py-2 text-sm font-semibold">Register Now</a>
            </div>
            <!-- Image Section -->
            <div class="w-1/3 h-full">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="/src/lib/landing/image.png" alt="Study hub image" class="w-full h-auto" />
            </div>
        </div>
    </div>
    
    
    <div id="what-makes-us-different" class="w-full px-0 flex justify-between items-center gap-0">
        <!-- Left Square -->
        <div class="w-1/2 h-[700px] bg-tertiary-500 rounded-tr-[400px] rounded-bl-none rounded-tl-none rounded-br-none"></div>
    
        <!-- Right Square with Text -->
        <div class="w-1/2 h-[700px] bg-[#38728A] rounded-tl-[400px] rounded-tr-none rounded-br-none rounded-bl-none flex items-center justify-center p-8 text-surface-50">
            <div class="text-center mt-12 ml-20">
                <strong class="font-century-gothic font-bold text-3xl mb-6">What makes UPward different?</strong><br /><br />
                <p class="font-century-gothic font-normal text-lg">
                    UPward offers:
                </p>
                <ul class="list-disc list-inside mt-2 font-century-gothic font-normal text-lg">
                    <li>WiFi up to 300Mbps</li>
                    <li>Free parking</li>
                    <li>Unlimited brewed coffee</li>
                    <li>Charging outlets</li>
                    <li>Outside food allowed</li>
                    <li>Accessible location</li>
                    <li>24/7 security</li>
                    <li>Printing services</li>
                    <li>Individual focus tables</li>
                    <li>Drafting tables</li>
                    <li>Shared tables</li>
                    <li>Drinks and snacks available</li>
                </ul>
            </div>
        </div>
    </div>
    
    
    <!-- Outer Margin Div -->
    <div id="access-section" class="w-full bg-surface-50 py-24 mx-auto max-w-screen-xl">
        <div class="flex justify-between items-center gap-0">
            <!-- Content with Margin -->
            <div class="p-10">
                <h2 class="font-inter font-semibold text-3xl mb-6">Access UPward</h2>
                <p class="font-inter text-l font-normal">
                    Reserve a table and order drinks or snacks seamlessly.
                </p>
                <p class="font-inter text-l font-normal mb-6">
                    Experience a comfortable environment designed for productivity.
                </p>
                <a href="account/login" class="btn bg-tertiary-500 text-surface-50 hover:text-secondary-800 hover:bg-tertiary-600 rounded border-none px-4 py-2 text-sm font-semibold">Log In</a>
            </div>
            
            <!-- Right Side Image -->
            <div class="w-1/3 h-full">
                <img src="/src/lib/landing/image2.png" alt="Log In to UPward" class="w-full h-auto" />
            </div>
        </div>
    </div>
    
    
    <!-- Carousel Section -->
    <div id="gallery-section" class="w-full px-0 flex justify-between items-center gap-0">
        <!-- Left Side Image -->
        <img 
            src={images[(currentIndex - 1 + images.length) % images.length]} 
            alt="Image on the left side" 
            class={`w-1/4 opacity-75 transition-opacity duration-300 hover:opacity-100 cursor-pointer mr-4 carousel-image ${fadeClass}`} 
            on:click={() => changeImage('left')} 
        />
        
        <!-- Center Image -->
        <img 
            id="main-image" 
            src={images[currentIndex]} 
            alt="Main displayed image" 
            class={`w-1/2 rounded-lg carousel-image ${fadeClass}`} 
        />
        
        <!-- Right Side Image -->
        <img 
            src={images[(currentIndex + 1) % images.length]} 
            alt="Image on the right side" 
            class={`w-1/4 opacity-75 transition-opacity duration-300 hover:opacity-100 cursor-pointer ml-4 carousel-image ${fadeClass}`} 
            on:click={() => changeImage('right')} 
        />
    </div>
    
    <!-- Dots for Image Indicators -->
    <div class="flex justify-center mt-4">
        {#each images as _, index}
            <span 
                class={`dot w-3 h-3 rounded-full mx-1 cursor-pointer ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`} 
                on:click={() => setImage(index)}>
            </span>
        {/each}
    </div>
    
    
    <!-- Footer Section -->
    <footer class="footer w-full my-24 py-24 flex flex-col items-center">
        <!-- Squares in the middle of the page -->
        <div class="flex gap-8 mb-8">
            <div class="footer-square bg-[#EAB940]"></div>
            <div class="footer-square bg-[#EAB940]"></div>
            <div class="footer-square bg-[#EAB940]"></div>
        </div>
        
        <!-- Clickable Section Labels -->
        <div class="flex gap-12 mb-8 footer-section">
            <a href="#register-now" class="text-white hover:text-tertiary-500">Register</a>
            <a href="#what-makes-us-different" class="text-white hover:text-tertiary-500">Benefits</a>
            <a href="#access-section" class="text-white hover:text-tertiary-500">Access</a>
            <a href="#gallery-section" class="text-white hover:text-tertiary-500">Gallery</a>
        </div>
        
        <!-- Social Media Icons (replace # with actual links) -->
        <div class="social-icons">
            <a href="#" class="hover:text-tertiary-500"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="hover:text-tertiary-500"><i class="fab fa-twitter"></i></a>
            <a href="#" class="hover:text-tertiary-500"><i class="fab fa-instagram"></i></a>
            <a href="#" class="hover:text-tertiary-500"><i class="fab fa-linkedin-in"></i></a>
        </div>
    </footer>


    <a href="/adminMain">to admin</a>
    <a href="/customerMain">to customer</a>
</div>