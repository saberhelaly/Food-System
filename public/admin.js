document.addEventListener('DOMContentLoaded', loadOrders);

function loadOrders() {
    fetch('/admin/orders')
        .then(response => response.json())
        .then(orders => {
            const ordersTableBody = document.getElementById('orders-table-body');
            ordersTableBody.innerHTML = '';
            orders.forEach(order => {
                const orderDetails = order.items.map(item => `${item.name} - ${item.price} درهم × ${item.quantity}`).join('<br>');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.customerName}</td>
                    <td>${order.customerPhone}</td>
                    <td>${orderDetails}</td>
                `;
                ordersTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading orders:', error));
}
