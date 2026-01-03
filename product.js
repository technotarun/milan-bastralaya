document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productGrid = document.getElementById('dynamicProductGrid');

    // Load products from LocalStorage or use defaults
    let inventory = JSON.parse(localStorage.getItem('milan_inventory')) || [
        { id: 1, name: "Premium Saree", price: "₹2,999", category: "women", image: "" },
        { id: 2, name: "Men's Slim Fit Jeans", price: "₹1,499", category: "men", image: "" }
    ];

    function displayProducts() {
        productGrid.innerHTML = '';
        inventory.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const imgSrc = product.image || 'https://placehold.co/600x800/e2e8f0/64748b?text=' + product.name.replace(/ /g, '+');
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${imgSrc}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="category">${product.category.toUpperCase()}</p>
                    <div class="price">${product.price}</div>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Remove Item</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Add Product
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(), // Unique ID
            name: document.getElementById('pName').value,
            price: document.getElementById('pPrice').value,
            category: document.getElementById('pCategory').value,
            image: document.getElementById('pImage').value
        };

        inventory.push(newProduct);
        localStorage.setItem('milan_inventory', JSON.stringify(inventory));
        displayProducts();
        productForm.reset();
    });

    // Delete Product
    window.deleteProduct = (id) => {
        inventory = inventory.filter(p => p.id !== id);
        localStorage.setItem('milan_inventory', JSON.stringify(inventory));
        displayProducts();
    };

    displayProducts();
});