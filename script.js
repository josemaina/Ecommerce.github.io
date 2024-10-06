const bar = document.getElementById('bar');
const close = document.getElementById('close');
const navbar = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () =>{
        navbar.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () =>{
        navbar.classList.remove('active');
    })
}
// Sample function to add an item to the cart
function addToCart(productId, productName, productPrice) {
    // Debugging: Log the product details to the console
    console.log('Product ID:', productId);
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    
    // Create an item object
    const item = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1, // Default quantity
    };

    // Get the existing cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === productId);
    if (existingItemIndex > -1) {
        // If it exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If it does not exist, add the new item
        cart.push(item);
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Item added to cart!');
}

// Function to display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart tbody');

    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart('${item.id}')"><i class="far fa-times-circle"></i></a></td>
            <td><img src="img/product${item.id}.jpg" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>KSH ${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity('${item.id}', this.value)" /></td>
            <td>KSH ${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Function to update the quantity of an item in the cart
// Function to update the quantity of an item in the cart
function updateCartItemQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item in the cart by its productId
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        // Update the quantity with the new value from the input
        cart[itemIndex].quantity = parseInt(newQuantity);
        
        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Refresh the cart display to show the updated quantities and totals
        displayCartItems();
    }
}



// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Call displayCartItems when the page loads
document.addEventListener('DOMContentLoaded', displayCartItems);
