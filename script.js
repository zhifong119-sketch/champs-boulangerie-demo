const products = [
    {
        name: "AN BUTTER CROFFLE",
        category: "CROFFLES",
        image: "images/an-butter-croffle.jpg",
        position: "50% 35%"
    },
    {
        name: "BERRIES CROFFLE",
        category: "CROFFLES",
        image: "images/berries-croffle.jpg",
        position: "50% 20%"
    },
    {
        name: "CHICKEN FLOSS CROFFLE",
        category: "CROFFLES",
        image: "images/chicken-floss-croffle.jpg",
        position: "50% 35%"
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
        name: "WELLNESS BREAD",
        category: "BREADS",
        image: "images/wellness-bread.jpg"
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

const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroCategory = document.getElementById("heroCategory");
const dots = document.getElementById("sliderDots");

let current = 0;
let timer;

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

function showSlide(index) {
    current = (index + products.length) % products.length;

    const product = products[current];

    heroImage.style.opacity = "0";

    setTimeout(() => {
        heroImage.src = product.image;
        heroImage.alt = product.name;

        heroImage.style.objectPosition =
            product.position || "50% 50%";

        heroTitle.textContent = product.name;
        heroCategory.textContent = product.category;

        heroImage.style.opacity = "1";
    }, 160);

    [...dots.children].forEach((button, index) => {
        button.classList.toggle(
            "active",
            index === current
        );
    });

    clearInterval(timer);

    timer = setInterval(() => {
        showSlide(current + 1);
    }, 4500);
}

document
    .getElementById("prevSlide")
    .addEventListener("click", () => {
        showSlide(current - 1);
    });

document
    .getElementById("nextSlide")
    .addEventListener("click", () => {
        showSlide(current + 1);
    });

renderDots();
showSlide(0);

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

document.getElementById("year").textContent =
    new Date().getFullYear();