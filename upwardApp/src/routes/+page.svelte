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

        // Initial state for the squares
    let squares = [
        {
        title: "About Us",
        content: "UPWARD is a co-working hub empowering students with collaborative spaces.",
        },
        {
        title: "Contact Us",
        content: "📞 0912-345-6789<br>📧 upwardcoworkinghub@gmail.com",
        },
        {
        title: "Visit Us",
        content: "UP Mindanao, Davao City<br>Open: 9 AM - 8 PM",
        },
    ];

    // Function to rotate squares to the right
    function rotateRight() {
    if (squares.length > 0) {
        squares = [squares[squares.length - 1], ...squares.slice(0, -1)];
    }
    }



</script>

<style>
    
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');

    .font-fredoka {
        font-family: "Fredoka", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        font-variation-settings:
            "wdth" 100;
    }

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
                <h1 class="h1 font-fredoka font-semibold mb-6">Join UPWARD Today</h1>
                <p class="text-l font-normal">
                    UPward is the ultimate work and study environment designed for students and professionals alike. 
                </p>
                <p class="text-l font-normal">
                    Enjoy a productive co-working space tailored to meet all your study needs. 
                </p>
                <p class="text-l font-normal mb-6">
                    Register now to access a dynamic hub for collaboration and focus!
                </p>
                <a href="account/signup" class="btn bg-tertiary-500 text-surface-50 hover:text-secondary-800 hover:bg-tertiary-600 rounded border-none px-4 py-2 text-sm font-semibold">Register Now</a>
            </div>
            <!-- Image Section -->
            <div class="w-1/3 h-full max-lg:w-full max-lg:h-auto max-lg:mt-6">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="/src/lib/landing/image.png" alt="Study hub image" class="w-full h-auto max-lg:max-w-[300px] max-lg:mx-auto" />
            </div>
        </div>
    </div>
    
    
    
    <div id="what-makes-us-different" class="w-full px-0 flex flex-wrap justify-between items-stretch gap-0">
        <!-- Left Square (Now Right Square in smaller screens) -->
        <div class="w-1/2 h-[700px] bg-tertiary-500 rounded-tr-[400px] rounded-bl-none rounded-tl-none rounded-br-none max-lg:w-full max-lg:h-[300px] max-lg:order-2"></div>
    
        <!-- Right Square (Now Left Square in smaller screens, with longer height for text) -->
        <div class="w-1/2 h-[700px] bg-[#38728A] rounded-tl-[400px] rounded-tr-none rounded-br-none rounded-bl-none flex items-center justify-center p-8 text-surface-50 max-lg:w-full max-lg:h-auto max-lg:py-16 max-lg:px-8 max-lg:order-1">
            <div class="pl-40 pt-10 text-center max-lg:ml-0">
                <strong class="h1 font-fredoka font-bold mb-6 block">What makes UPWARD different?</strong>
                <p class="font-normal text-lg mb-4">
                    UPWARD offers:
                </p>
                <ul class="list-disc list-inside mt-2 font-normal text-lg">
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
        <div class="flex flex-wrap justify-between items-stretch gap-0">
            <!-- Content with Margin -->
            <div class="p-10">
                <h1 class="h1 font-fredoka font-semibold mb-6">Access UPWARD</h1>
                <p class="font-inter text-l font-normal">
                    Reserve a table and order drinks or snacks seamlessly.
                </p>
                <p class="font-inter text-l font-normal mb-6">
                    Experience a comfortable environment designed for productivity.
                </p>
                <a href="account/login" class="btn bg-tertiary-500 text-surface-50 hover:text-secondary-800 hover:bg-tertiary-600 rounded border-none px-4 py-2 text-sm font-semibold">Log In</a>
            </div>
            
            <!-- Right Side Image -->
            <div class="w-full md:w-1/3 h-auto">
                <img src="/src/lib/landing/image2.png" alt="Log In to UPward" class="w-full h-auto" />
            </div>
        </div>
    </div>

    
    
    <!-- Carousel Section -->
    <div id="gallery-section" class="w-full px-0 flex justify-center items-center gap-0 relative">
        <!-- Left Side Image -->
        <img src={images[(currentIndex - 1 + images.length) % images.length]} 
            alt="Image on the left side" 
            class="carousel-image w-1/4 opacity-75 transition-opacity duration-300 hover:opacity-100 cursor-pointer mr-4" 
            on:click={() => changeImage('left')} />

        <!-- Center Image -->
        <img id="main-image" src={images[currentIndex]} alt="Main displayed image" 
            class={`carousel-image transition-all duration-500 ease-in-out w-[600px] h-[400px] rounded-lg ${fadeClass}`} />

        <!-- Right Side Image -->
        <img src={images[(currentIndex + 1) % images.length]} 
            alt="Image on the right side" 
            class="carousel-image w-1/4 opacity-75 transition-opacity duration-300 hover:opacity-100 cursor-pointer ml-4"
            on:click={() => changeImage('right')} />
    </div>

    <!-- Dots for Image Indicators -->
    <div class="flex justify-center mt-4">
        {#each images as _, index}
            <span class={`dot w-3 h-3 rounded-full mx-1 cursor-pointer ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`} 
            on:click={() => setImage(index)}>
            </span>
        {/each}
    </div>
</div>

<!-- Footer Section -->
<footer class="footer w-full mt-24 pt-24 pb-8 flex flex-col items-center">
    <div id="square" class="flex items-center gap-3 mb-8">
        {#each squares as square, index}
          <div class="footer-square bg-[#EAB940] flex flex-col justify-center items-center text-center text-white p-2">
            <h3 class="h3 font-bold font-fredoka">{square.title}</h3>
            <p class="text-xs">{@html square.content}</p>

          </div>
          {#if index < squares.length - 1}
            <button
              class="btn bg-[#224C4D] text-tertiary-300 rounded-full w-12 h-12 flex justify-center items-center shadow-md"
              on:click={rotateRight}
            >
              ⮞
            </button>
          {/if}
        {/each}
      </div>


        
        <!-- Clickable Section Labels -->
        <div class="flex gap-12 mt-8 mb-10 footer-section">
            <a href="#register-now" class="text-white hover:text-tertiary-500">Register</a>
            <a href="#what-makes-us-different" class="text-white hover:text-tertiary-500">Benefits</a>
            <a href="#access-section" class="text-white hover:text-tertiary-500">Access</a>
            <a href="#gallery-section" class="text-white hover:text-tertiary-500">Gallery</a>
        </div>
        
        <!-- Social Media Icons (replace # with actual links) -->
        <div class="flex items-center gap-4">
            <a href="https://www.facebook.com/upwardcoworkinghub" class="text-white hover:text-tertiary-500">
                <img src="/src/lib/landing/fb icon.png" alt="fb icon" class="h-11 w-11">
            </a>
            <a href="https://www.instagram.com/upwardcoworkinghub/" class="text-white hover:text-tertiary-500">
                <img src="/src/lib/landing/insta icon.png" alt="insta icon" class="h-16 w-16">
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=upwardcoworkinghub@gmail.com" target="_blank" class="text-white hover:text-tertiary-500">
                <img src="/src/lib/landing/email icon.png" alt="email icon" class="h-9 w-9">
            </a>
        </div>

        <!-- Logo at the bottom left -->
        <div class="flex justify-between w-full px-8 mt-12">
            <img src="/src/lib/landing/Upward logo1.png" alt="Site Logo" class="h-12 w-auto">
            <span class="text-white text-sm">© 2024 UPWARD. All rights reserved.</span>
        </div>
    </footer>