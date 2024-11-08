

// Select all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const courseId = event.target.dataset.courseId;
        const courseTitle = event.target.dataset.courseTitle;
        addToCart(courseId, courseTitle);
    });
});

// Add the course to the cart and store it in localStorage
function addToCart(courseId, courseTitle) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the course is already in the cart
    if (!cart.some(course => course.id === courseId)) {
        cart.push({ id: courseId, title: courseTitle });
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart
        updateCartCount();
        showPopup("Course added to cart!");
    } else {
        showPopup("Course is already in your cart!", "error");
    }
}

// Update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Show a success or error message when adding to cart
function showPopup(message, type = "success") {
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.innerText = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Update cart count on page load
window.onload = updateCartCount;
