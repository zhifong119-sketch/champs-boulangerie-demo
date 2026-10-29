// ==========================================
// 1. HOMEPAGE SLIDER PRODUCTS
// ==========================================

const products = [
    { name: "OUR BAKERY", category: "CHAMPS BOULANGERIE", image: "images/champs-home-01.jpeg" },
    { name: "A WARM WELCOME", category: "CHAMPS BOULANGERIE", image: "images/champs-home-02.jpeg" },
    { name: "INSIDE CHAMPS", category: "BAKERY & CAF\u00c9", image: "images/champs-home-03.jpeg" },
    { name: "A PLACE TO UNWIND", category: "CHAMPS BOULANGERIE", image: "images/champs-home-04.jpeg" },
    { name: "COMFORTABLE MOMENTS", category: "CHAMPS BOULANGERIE", image: "images/champs-home-05.jpeg" },
    { name: "MADE FOR GATHERING", category: "CHAMPS BOULANGERIE", image: "images/champs-home-06.jpeg" },
    { name: "FRESHLY BAKED", category: "ARTISAN BREAD", image: "images/champs-home-07.jpeg" },
    { name: "SWEET MOMENTS", category: "BAKERY & CAF\u00c9", image: "images/champs-home-08.jpeg" }
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
const defaultImagePosition = "50% 50%";

// Individual position for Tiramisu
// First value = horizontal position
// Second value = vertical position
const imagePositions = {};


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