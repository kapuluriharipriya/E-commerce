# TechStore - E-Commerce Website

A fully functional e-commerce website built with HTML, CSS, and JavaScript.

## Features

✅ **Product Catalog** - Browse all products
✅ **Search & Filter** - Search by name or filter by category
✅ **Product Details Page** - View full product information
✅ **Shopping Cart** - Add/remove items, update quantities
✅ **Cart Summary** - Calculate subtotal, tax, shipping, and total
✅ **Checkout Page** - Complete the purchase
✅ **Responsive Design** - Works on all devices
✅ **Local Storage** - Cart persists across page refreshes
✅ **Professional UI** - Modern and user-friendly design

## Project Structure

```
ecommerce-website/
├── index.html
├── product-details.html
├── cart.html
├── checkout.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## File Descriptions

### HTML Files
- **index.html** - Main home page with product listing, search, and filters
- **product-details.html** - Individual product details page
- **cart.html** - Shopping cart page with order summary
- **checkout.html** - Checkout page with billing and payment forms

### CSS File
- **css/styles.css** - All styling for the website including responsive design

### JavaScript File
- **js/script.js** - All functionality including:
  - Product management
  - Shopping cart operations
  - Local storage handling
  - Search and filter functionality
  - Checkout processing

## How to Use

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start shopping!

## Features in Detail

### Products
- Browse 10 sample tech products
- View product details including price, description, and rating
- Each product has an emoji icon for visual appeal

### Shopping Cart
- Add products to cart with customizable quantities
- View cart summary with subtotal, tax, and shipping
- Update quantities or remove items from cart
- Cart data persists using browser's localStorage

### Search and Filter
- Search products by name or description
- Filter products by category:
  - Electronics
  - Accessories
  - Gadgets

### Checkout
- Enter billing and payment information
- Review order summary before completion
- Order confirmation message

## Customization

### Adding More Products
Edit the `products` array in `js/script.js` to add more products:

```javascript
const products = [
    {
        id: 11,
        name: 'Your Product Name',
        category: 'category-name',
        price: 99.99,
        emoji: '🎯',
        description: 'Product description',
        rating: 4.5,
        inStock: true
    }
];
```

### Changing Colors
Edit the CSS variables in `css/styles.css` to customize the color scheme.

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

## Browser Compatibility
- Chrome
- Firefox
- Safari
- Edge

## License
Open source - Feel free to use and modify for your projects!
