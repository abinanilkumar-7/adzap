document.addEventListener("DOMContentLoaded", () => {
    initProductData();
});

function initProductData() {
    // Parse URL parameters to get product ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const titleEl = document.getElementById('product-title');
    const imageEl = document.getElementById('product-image');
    const loaderEl = document.getElementById('model-loader');
    
    if (productId && typeof products !== 'undefined') {
        const product = products.find(p => p.id === productId);
        if (product) {
            titleEl.textContent = product.name;
            
            // Load the actual image from the gallery folder
            const imageUrl = product.src || `gallery/product${product.id}.jpg`;
            
            imageEl.src = imageUrl;
            imageEl.alt = product.name;

            // Wait for image to load before displaying
            imageEl.onload = () => {
                if (loaderEl) loaderEl.style.display = 'none';
                imageEl.style.display = 'block';
            };
            
            // Handle loading error just in case
            imageEl.onerror = () => {
                if (loaderEl) loaderEl.innerHTML = "<p>Image failed to load</p>";
                imageEl.style.display = 'none';
            };

        } else {
            titleEl.textContent = "Product Not Found";
            if (loaderEl) loaderEl.style.display = 'none';
        }
    } else {
        titleEl.textContent = "Welcome to ADZAP";
        if (loaderEl) loaderEl.style.display = 'none';
    }
}
