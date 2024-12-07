import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SalesForm({ onAddProduct }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ productId: '', quantity: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'productId') {
            setForm({ ...form, productId: value, quantity: '' });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAdd = () => {
        const product = products.find((p) => p.id === parseInt(form.productId));
        const quantity = parseInt(form.quantity);

        if (product) {
            if (quantity > product.stock) {
                toast.error(`Ingrese una cantidad correcta. El stock disponible es: ${product.stock}`, {
                    position: "top-center",
                    autoClose: 5000,
                });
                return;
            }

            onAddProduct(product, quantity);
            setForm({ productId: '', quantity: '' });
        }
    };

    const isButtonDisabled = !form.quantity || parseInt(form.quantity) <= 0;

    return (
        <div className="sales-form">
            {products.length === 0 ? (
                <h2 className="no-products-message">No hay productos a la venta</h2>
            ) : (
                <>
                    <select
                        name="productId"
                        value={form.productId}
                        onChange={handleChange}
                        className="product-select"
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} - Cantidad: {product.stock} - Precio: {product.price}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        placeholder="Cantidad"
                        className="quantity-input"
                        onChange={handleChange}
                        required
                        min="1"
                    />
                    <button
                        type="button"
                        className={`add-button ${isButtonDisabled ? 'disabled' : ''}`}
                        onClick={handleAdd}
                        disabled={isButtonDisabled}
                    >
                        Agregar
                    </button>
                </>
            )}

            <ToastContainer />
        </div>
    );
}

export default SalesForm;
