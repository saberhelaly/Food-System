document.addEventListener('DOMContentLoaded', () => {
    // Load order details from local storage or server
    loadOrderDetails();
});

function loadOrderDetails() {
    const orderDetails = document.getElementById('confirm-order-details');
    const order = JSON.parse(localStorage.getItem('order')) || {};

    order.items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${item.name} - الكمية: ${item.quantity} - السعر: ${item.price} درهم`;
        orderDetails.appendChild(li);
    });
}

function confirmOrder() {
    const order = JSON.parse(localStorage.getItem('order')) || {};

    fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (response.ok) {
            alert('تم تأكيد الطلب بنجاح!');
            localStorage.removeItem('order');
            window.location.href = '/index.html';
        } else {
            alert('حدث خطأ أثناء تأكيد الطلب.');
        }
    });
}
