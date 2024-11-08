// Load the cart from localStorage and display items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear any existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'cart-item';
            courseItem.innerHTML = `
                <span>${course.title}</span>
                <button onclick="removeFromCart('${course.id}')">Remove</button>
            `;
            cartItemsContainer.appendChild(courseItem);
        });
    }

    // Update total count
    document.getElementById('total-count').textContent = cart.length;
}

// Remove a course from the cart
function removeFromCart(courseId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(course => course.id !== courseId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Refresh cart display
    updateCartCount();
    showPopup("Course removed from cart.");
}

// Call loadCart on page load
window.onload = loadCart;
