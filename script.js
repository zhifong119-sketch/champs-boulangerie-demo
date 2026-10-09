// ==========================================
// 1. HOMEPAGE SLIDER PRODUCTS
// ==========================================

const products = [
    {
        name: "AN BUTTER CROFFLE",
        category: "CROFFLES",
        image: "images/an-butter-croffle.jpg"
    },
    {
        name: "BERRIES CROFFLE",
        category: "CROFFLES",
        image: "images/berries-croffle.jpg"
    },
    {
        name: "CHICKEN FLOSS CROFFLE",
        category: "CROFFLES",
        image: "images/chicken-floss-croffle.jpg"
    },
    {
        name: "ENERGY STICK",
        category: "PASTRIES",
        image: "images/energy-stick.jpg"
    },
    {
        name: "LEMON CUSTARD DANISH",
        category: "PASTRIES",
        image: "images/lemon-custard-danish.jpg"
    },
    {
        name: "MATCHA RED BEAN DANISH",
        category: "PASTRIES",
        image: "images/matcha-red-bean-danish.jpg"
    },
    {
        name: "MIDNIGHT BERRIES MILLE CREPE",
        category: "CAKES",
        image: "images/midnight-berries-mille-crepe.jpg"
    },
    {
        name: "SEA SALT MILLE CREPE",
        category: "CAKES",
        image: "images/sea-salt-mille-crepe.jpg"
    },
    {
        name: "SUNLIGHT PISTACHIO MILLE CREPE",
        category: "CAKES",
        image: "images/sunlight-pistachio-mille-crepe.jpg"
    },
    {
        name: "TIRAMISU",
        category: "SWEETS",
        image: "images/tiramisu.jpg"
    }
];


// ==========================================
// 2. SLIDER ELEMENTS
// ==========================================

const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroCategory = document.getElementById("heroCategory");
const dots = document.getElementById("sliderDots");

let current = 0;
let timer;


// ==========================================
// 3. INDIVIDUAL PHOTO POSITION SETTINGS
// ==========================================

// Default position for all products
const defaultImagePosition = "50% 35%";

// Individual position for Tiramisu
// First value = horizontal position
// Second value = vertical position
const imagePositions = {
    "TIRAMISU": "50% 70%",
    "SEA SALT MILLE CREPE": "50% 120%",
    "ENERGY STICK": "60% 60%",
    "LEMON CUSTARD DANISH": "50% 50%",
    "MATCHA RED BEAN DANISH": "50% 60%",
    "MIDNIGHT BERRIES MILLE CREPE": "50% 60%"
};


// ==========================================
// 4. CREATE SLIDER DOTS
// ==========================================

function renderDots() {
    products.forEach((product, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.setAttribute(
            "aria-label",
            `Show ${product.name}`
        );

        button.addEventListener("click", () => {
            showSlide(index);
        });

        dots.appendChild(button);
    });
}


// ==========================================
// 5. DISPLAY SLIDE
// ==========================================

function showSlide(index) {
    current = (index + products.length) % products.length;

    const product = products[current];

    // Fade out the current image
    heroImage.style.opacity = "0";

    setTimeout(() => {
        // Update product image and text
        heroImage.src = product.image;
        heroImage.alt = product.name;
        heroTitle.textContent = product.name;
        heroCategory.textContent = product.category;

        // Apply individual image position
        heroImage.style.objectPosition =
            imagePositions[product.name] || defaultImagePosition;

        // Fade in the new image
        heroImage.style.opacity = "1";
    }, 160);

    // Update active slider dot
    [...dots.children].forEach((button, dotIndex) => {
        button.classList.toggle(
            "active",
            dotIndex === current
        );
    });

    // Restart automatic slideshow
    clearInterval(timer);

    timer = setInterval(() => {
        showSlide(current + 1);
    }, 4500);
}


// ==========================================
// 6. PREVIOUS / NEXT BUTTONS
// ==========================================

document.getElementById("prevSlide").addEventListener("click", () => {
    showSlide(current - 1);
});

document.getElementById("nextSlide").addEventListener("click", () => {
    showSlide(current + 1);
});


// ==========================================
// 7. INITIALIZE SLIDER
// ==========================================

renderDots();
showSlide(0);


// ==========================================
// 8. MOBILE NAVIGATION MENU
// ==========================================

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

menuButton.addEventListener("click", () => {
    const active = mobileNav.classList.toggle("active");

    menuButton.setAttribute(
        "aria-expanded",
        String(active)
    );
});

mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


// ==========================================
// 9. AUTOMATIC COPYRIGHT YEAR
// ==========================================

document.getElementById("year").textContent =
    new Date().getFullYear();