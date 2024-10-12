// Retrieve the order from localStorage
const order = JSON.parse(localStorage.getItem('order')) || [];
let totalPrice = 0;

// Display order summary
const orderItemsContainer = document.getElementById('order-items');
order.forEach(item => {
    const itemElement = document.createElement('p');
    itemElement.textContent = `${item.quantity} x ${item.name}`;
    orderItemsContainer.appendChild(itemElement);
    totalPrice += item.quantity * item.price;
});

// Display total price
document.getElementById('total-price').textContent = `₦${totalPrice}`;

// Handle order form submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const orderDetails = {
        name,
        phone,
        address,
        order,
        total: totalPrice
    };

    // For now, we'll just log the order details and clear localStorage
    console.log('Order placed:', orderDetails);
    alert('Your order has been placed successfully!');

    // Clear localStorage
    localStorage.removeItem('order');
    window.location.href = 'index.html'; // Redirect to homepage after order
});
