const db = require('../config/db');

exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM products WHERE stock > 0';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createProduct = (req, res) => {
    const { name, reference, price, weight, category, stock, created_at } = req.body;
    const query = 'INSERT INTO products (name, reference, price, weight, category, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, reference, price, weight, category, stock, created_at], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Product created successfully' });
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, reference, price, weight, category, stock } = req.body;
    const query = 'UPDATE products SET name = ?, reference = ?, price = ?, weight = ?, category = ?, stock = ? WHERE id = ?';
    db.query(query, [name, reference, price, weight, category, stock, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ message: 'Transaction failed', error: err });

        const deleteSalesQuery = 'DELETE FROM sales WHERE product_id = ?';
        db.query(deleteSalesQuery, [id], (err, salesResults) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ message: 'Failed to delete related sales', error: err });
                });
            }

            const deleteProductQuery = 'DELETE FROM products WHERE id = ?';
            db.query(deleteProductQuery, [id], (err, productResults) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Failed to delete product', error: err });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ message: 'Transaction commit failed', error: err });
                        });
                    }

                    res.json({ message: 'Product and related sales deleted successfully' });
                });
            });
        });
    });
};
