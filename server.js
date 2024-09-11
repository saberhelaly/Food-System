const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/items', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading items.json');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/add-item', upload.single('image'), (req, res) => {
    const newItem = {
        name: req.body.name,
        price: req.body.price,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };

    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading items.json');
            return;
        }

        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile('items.json', JSON.stringify(items, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to items.json');
                return;
            }

            res.send('Item added');
        });
    });
});

app.post('/orders', (req, res) => {
    const newOrder = req.body;

    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading orders.json');
            return;
        }

        const orders = JSON.parse(data);
        orders.push(newOrder);

        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to orders.json');
                return;
            }

            res.send('Order received');
        });
    });
});

app.get('/admin/orders', (req, res) => {
    fs.readFile('orders.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading orders.json');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
