// Product image lightbox for the Products page
(() => {
    const lightbox = document.getElementById("productLightbox");
    const lightboxImage = document.getElementById("productLightboxImage");
    const caption = document.getElementById("productLightboxCaption");
    if (!lightbox || !lightboxImage || !caption) return;

    const closeButton = lightbox.querySelector(".product-lightbox-close");
    const openLightbox = (image) => {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "";
        caption.textContent = image.alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    };
    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".product-image-button").forEach((button) => {
        button.addEventListener("click", () => {
            const image = button.querySelector("img");
            if (image) openLightbox(image);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
})();


// Whole Cake details: full description and every size/price in the source listing
(() => {
    const modal = document.getElementById("wholeCakeDetailsModal");
    if (!modal) return;
    const title = document.getElementById("wholeCakeDetailsTitle");
    const description = document.getElementById("wholeCakeDetailsDescription");
    const prices = document.getElementById("wholeCakeDetailsPrices");
    const closeButton = modal.querySelector(".whole-cake-details-close");
    let previousOverflow = "";

    const close = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = previousOverflow;
    };

    document.querySelectorAll(".whole-cake-card").forEach((card) => {
        const button = card.querySelector(".whole-cake-details-button");
        if (!button) return;
        button.addEventListener("click", () => {
            const name = card.querySelector("h3")?.textContent?.trim() || "Whole Cake";
            const desc = card.querySelector(".menu-product-info > p")?.textContent?.trim() || "";
            const priceRows = [...card.querySelectorAll(".whole-cake-prices span")].map((item) => ({
                size: item.querySelector("small")?.textContent?.trim() || "",
                price: item.querySelector("strong")?.textContent?.trim() || ""
            }));
            title.textContent = name;
            description.textContent = desc;
            prices.replaceChildren();
            priceRows.forEach(({size, price}) => {
                const item = document.createElement("span");
                const sizeEl = document.createElement("small");
                const priceEl = document.createElement("strong");
                sizeEl.textContent = size;
                priceEl.textContent = price;
                item.append(sizeEl, priceEl);
                prices.appendChild(item);
            });
            previousOverflow = document.body.style.overflow;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeButton.focus();
        });
    });
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) close();
    });
})();
