document.addEventListener('DOMContentLoaded', () => {
    // 1. Placeholder Image Fix (Auto-replace broken images)
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'https://placehold.co/600x800/e2e8f0/64748b?text=Fashion+Item';
        };
    });

    // 2. Search Functionality
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product-card');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        products.forEach(product => {
            const title = product.querySelector('h4').innerText.toLowerCase();
            const cat = product.querySelector('.category').innerText.toLowerCase();
            if (title.includes(term) || cat.includes(term)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // 3. Simple Cart Logic
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsList = document.getElementById('cartItems');
    const cartCountLabel = document.getElementById('cart-count');
    let cart = [];

    cartBtn.addEventListener('click', () => cartSidebar.classList.add('active'));
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const item = {
                name: card.querySelector('h4').innerText,
                price: card.querySelector('.price').innerText
            };
            cart.push(item);
            updateCartUI();
        });
    });

    function updateCartUI() {
        cartCountLabel.innerText = cart.length;
        if (cart.length > 0) {
            cartItemsList.innerHTML = cart.map((item, index) => `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <strong>${item.price}</strong>
                </div>
            `).join('');
        }
    }

    // 4. Hamburger Menu Toggle for Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // 5. Mock Google Login
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
        alert("Redirecting to Google Login...");
        loginBtn.innerHTML = `<img src="https://ui-avatars.com/api/?name=User&background=random" style="width:25px; border-radius:50%"> Hi, User`;
    });
});