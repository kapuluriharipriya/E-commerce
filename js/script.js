// Sample Products Database
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 79.99,
        emoji: '🎧',
        description: 'High-quality wireless headphones with noise cancellation',
        rating: 4.5,
        inStock: true
    },
    {
        id: 2,
        name: 'USB-C Cable',
        category: 'accessories',
        price: 12.99,
        emoji: '🔌',
        description: 'Durable and fast charging USB-C cable',
        rating: 4.8,
        inStock: true
    },
    {
        id: 3,
        name: 'Smartphone Stand',
        category: 'accessories',
        price: 24.99,
        emoji: '📱',
        description: 'Adjustable smartphone stand for desk',
        rating: 4.3,
        inStock: true
    },
    {
        id: 4,
        name: 'Portable Speaker',
        category: 'gadgets',
        price: 49.99,
        emoji: '🔊',
        description: 'Waterproof portable Bluetooth speaker',
        rating: 4.6,
        inStock: true
    },
    {
        id: 5,
        name: '4K Webcam',
        category: 'electronics',
        price: 129.99,
        emoji: '📷',
        description: 'Ultra HD webcam for streaming and video calls',
        rating: 4.7,
        inStock: true
    },
    {
        id: 6,
        name: 'Mechanical Keyboard',
        category: 'accessories',
        price: 89.99,
        emoji: '⌨️',
        description: 'RGB mechanical keyboard with tactile switches',
        rating: 4.9,
        inStock: true
    },
    {
        id: 7,
        name: 'Wireless Mouse',
        category: 'accessories',
        price: 39.99,
        emoji: '🖱️',
        description: 'Ergonomic wireless mouse with precision tracking',
        rating: 4.4,
        inStock: true
    },
    {
        id: 8,
        name: 'Smartwatch',
        category: 'gadgets',
        price: 199.99,
        emoji: '⌚',
        description: 'Feature-rich smartwatch with fitness tracking',
        rating: 4.5,
        inStock: true
    },
    {
        id: 9,
        name: 'Tablet',
        category: 'electronics',
        price: 349.99,
        emoji: '📱',
        description: '10-inch tablet with high-resolution display',
        rating: 4.6,
        inStock: true
    },
    {
        id: 10,
        name: 'Phone Charger',
        category: 'accessories',
        price: 19.99,
        emoji: '⚡',
        description: 'Fast charging wall adapter for all devices',
        rating: 4.7,
        inStock: true
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let currentSearchTerm = '';

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load products if on home page
    if (document.getElementById('productsGrid')) {
        displayProducts(products);
    }
    
    // Load cart if on cart page
    if (document.getElementById('cartItems')) {
        displayCart();
    }
    
    // Load product details if on product details page
    if (document.getElementById('productDetails')) {
        displayProductDetails();
    }
    
    // Load checkout if on checkout page
    if (document.getElementById('checkoutItems')) {
        displayCheckout();
    }
});

// Display Products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #95a5a6;">No products found</div>';
        return;
    }
    
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="view-details">View Details</a>
                    <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    displayProducts(filtered);
}

// Search Products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    currentSearchTerm = searchInput.value.toLowerCase();
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(currentSearchTerm) ||
        p.description.toLowerCase().includes(currentSearchTerm)
    );
    
    displayProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Update Cart Quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="index.html" class="btn btn-primary">Continue Shopping</a></div>';
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-quantity">
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + tax + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Display Product Details
function displayProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('productDetails').innerHTML = '<p>Product not found</p>';
        return;
    }
    
    const stars = '⭐'.repeat(Math.floor(product.rating));
    
    document.getElementById('productDetails').innerHTML = `
        <div class="product-details-image">${product.emoji}</div>
        <div class="product-details-info">
            <h1>${product.name}</h1>
            <div class="product-details-rating">${stars} ${product.rating}</div>
            <div class="product-details-price">$${product.price.toFixed(2)}</div>
            <div class="product-details-description">${product.description}</div>
            <p style="color: #2ecc71; font-weight: bold;">In Stock</p>
            <div class="product-quantity">
                <label>Quantity:</label>
                <input type="number" id="quantityInput" value="1" min="1">
            </div>
            <button class="btn btn-primary" onclick="addToCartFromDetails(${product.id})">Add to Cart</button>
        </div>
    `;
}

// Add to Cart from Details
function addToCartFromDetails(productId) {
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value);
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} x ${product.name} added to cart!`);
}

// Display Checkout
function displayCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + tax + shipping;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// Submit Checkout
function submitCheckout(event) {
    event.preventDefault();
    alert('Order placed successfully! Thank you for your purchase.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'index.html';
}