document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/add-item', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        this.reset();
    })
    .catch(error => console.error('Error adding item:', error));
});
