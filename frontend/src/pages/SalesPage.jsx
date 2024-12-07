import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import '../styles/salesPage.css';
import SalesForm from '../components/SalesForm';
import { makeSale } from '../services/salesService';

function SalesPage() {
    const [selectedProducts, setSelectedProducts] = useState([]); // Estado para productos seleccionados
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [saleConfirmed, setSaleConfirmed] = useState(false); // Estado para confirmar la venta
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loader
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Estado para el popup de "Compra Exitosa"

    // Función para disminuir la cantidad del producto 
    const decreaseQuantity = (index) => {
        setSelectedProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            if (updatedProducts[index].quantity > 1) {
                updatedProducts[index].quantity -= 1;
            }
            return updatedProducts;
        });
    };

    // Función para aumentar la cantidad del producto
    const increaseQuantity = (index, stock) => {
        setSelectedProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            if (updatedProducts[index].quantity < stock) {
                updatedProducts[index].quantity += 1;
            }
            return updatedProducts;
        });
    };

    // Función para eliminar un producto de la lista
    const removeProduct = (index) => {
        setSelectedProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter((_, i) => i !== index);
            return updatedProducts;
        });
    };


    // Función para redirigir a la página principal
    const goToHomePage = () => {
        window.location.href = '/'; // Redirige al inicio
    };

    // Función para agregar un producto a la lista de seleccionados
    const handleAddProduct = (product, quantity) => {
        if (product && quantity > 0) {
            setSelectedProducts([...selectedProducts, { ...product, quantity }]);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Función para manejar la acción del botón "Confirmar Compra"
    const handleConfirmSale = async () => {
        try {
            setIsLoading(true); // Activar el loader
    
            // Simular un retraso de 10 segundos (simulando la espera de la venta)
            setTimeout(async () => {
                // Aquí pasamos todos los productos seleccionados al backend para realizar la venta
                for (const product of selectedProducts) {
                    await makeSale({ productId: product.id, quantity: product.quantity });
                }
    
                // Confirmamos la venta
                setSaleConfirmed(true);
                setSelectedProducts([]); // Vaciar carrito
                setIsModalOpen(false); // Cerrar modal
                setIsLoading(false); // Desactivar el loader
                setShowSuccessPopup(true); // Mostrar popup de éxito
            }, 3000); // 3 segundos de retraso 
    
        } catch (error) {
            console.error('Error al confirmar la venta:', error);
            alert('Hubo un error al procesar la compra');
            setIsLoading(false); // Desactivar el loader en caso de error
        }
    };    

    // Función para cerrar el popup de "Compra Exitosa"
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false); // Ocultar popup
        setSelectedProducts([]); // Resetear productos seleccionados
        window.location.reload(); // Recargar la página
    };
    

    // Calcular la cantidad total de productos
    const totalQuantity = selectedProducts.reduce((total, product) => total + product.quantity, 0);

    // Calcular el precio total
    const totalPrice = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="header-text" style={{ display: 'flex', alignItems: 'center' }}>
                    <FaHome onClick={goToHomePage} style={{ cursor: 'pointer', marginRight: '10px', fontSize: '24px' }} />
                    Sistema de inventario
                </div>
            </header>

            {/* Main Content */}
            <div className="page-header">
                <h1>Venta de Productos</h1>
            </div>
            <div className="sales-container">
                <div className="selection-panel">
                    <h2>Seleccionar Producto</h2>
                    <SalesForm 
                        key={saleConfirmed ? 'reset' : 'active'}
                        onAddProduct={handleAddProduct} 
                    />
                </div>

                <div className="selected-products">
                    <h2>Productos Seleccionados</h2>
                    <div className="selected-products-table-container">
                        <table className="selected-products-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Precio Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                                        <td>{(product.price * product.quantity).toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                                        <td>
                                            <button onClick={() => decreaseQuantity(index)}>-</button>
                                            <button
                                                onClick={() => increaseQuantity(index, product.stock)}
                                                disabled={product.quantity >= product.stock}
                                                className={product.quantity >= product.stock ? 'disabled' : ''}>
                                                +
                                            </button>
                                            <button onClick={() => removeProduct(index)} className="x">X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-actions">
                        <button
                            className="checkout-button"
                            onClick={() => setIsModalOpen(true)}
                            disabled={selectedProducts.length === 0}>
                            Pagar
                        </button>
                        <button
                            className="CancelCompra-button"
                            onClick={() => setSelectedProducts([])} // Resetear el carrito
                            disabled={selectedProducts.length === 0}>
                            Cancelar Compra
                        </button>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Resumen de la Venta</h2>
                        <table className="selected-products-table">
                            <thead>
                                <tr>
                                    <th>Cantidad de Productos</th>
                                    <th>Precio Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{totalQuantity}</td>
                                    <td>{totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="modal-actions">
                            <button onClick={closeModal} className="cancel-button">Cerrar</button>
                            <button onClick={handleConfirmSale} className="confirm-button">
                                {isLoading ? 'Procesando...' : 'Confirmar compra'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loader */}
            {isLoading && (
                <div className="loader">
                    <div className="spinner"></div>
                </div>
            )}

            {/* Popup de Compra Exitosa */}
            {showSuccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>¡Compra Exitosa!</h2>
                        <button onClick={closeSuccessPopup}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SalesPage;
