document.addEventListener('DOMContentLoaded', loadItems);

function loadItems() {
    fetch('/items')
        .then(response => response.json())
        .then(items => {
            const itemsList = document.getElementById('items-list');
            itemsList.innerHTML = '';
            items.forEach(item => {
                const itemElement = document.createElement('li');
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>السعر: ${item.price} درهم</p>
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100px;height:100px;">` : ''}
                    <label for="quantity-${item.name}">الكمية</label>
                    <input type="number" id="quantity-${item.name}" name="quantity-${item.name}" min="1" value="1">
                    <button onclick="addToOrder('${item.name}', ${item.price}, 'quantity-${item.name}')">إضافة للطلب</button>
                `;
                itemsList.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Error loading items:', error));
}

function addToOrder(name, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const orderDetails = document.getElementById('order-details');
    const orderItem = document.createElement('li');
    orderItem.textContent = `${name} - ${price} درهم × ${quantity}`;
    orderDetails.appendChild(orderItem);
}

function submitOrder() {
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const orderItems = Array.from(document.getElementById('order-details').children).map(li => {
        const [name, details] = li.textContent.split(' - ');
        const [price, quantity] = details.split(' × ');
        return { name, price: parseFloat(price), quantity: parseInt(quantity) };
    });

    const order = {
        customerName,
        customerPhone,
        items: orderItems
    };

    fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Error submitting order:', error));
}
