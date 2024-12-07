const db = require('../config/db');

exports.makeSale = (req, res) => {
    const { productId, quantity } = req.body;

    // Verificar stock
    const stockQuery = 'SELECT stock FROM products WHERE id = ?';
    db.query(stockQuery, [productId], (err, results) => {
        if (err) throw err;
        if (results[0].stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // Actualizar stock
        const updateQuery = 'UPDATE products SET stock = stock - ? WHERE id = ?';
        db.query(updateQuery, [quantity, productId], (err) => {
            if (err) throw err;

            // Registrar venta
            const saleQuery = 'INSERT INTO sales (product_id, quantity, date) VALUES (?, ?, NOW())';
            db.query(saleQuery, [productId, quantity], (err) => {
                if (err) throw err;
                res.json({ message: 'Sale registered successfully' });
            });
        });
    });
};