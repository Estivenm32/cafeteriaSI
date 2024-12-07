import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import '../styles/managerProducts.css';
import { FaHome, FaPlus } from 'react-icons/fa';

function ManageProductsPage() {
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

    const openModal = () => setShowModal(true); // Función para abrir el modal
    const closeModal = () => setShowModal(false); // Función para cerrar el modal

    // Función para redirigir a la página principal
    const goToHomePage = () => {
        window.location.href = '/'; // Redirige al inicio
    };

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
            <div className="content">
                <div className="page-header">
                    <h1>Administrar Productos</h1>
                    <button className="addButton" onClick={openModal}>
                        <FaPlus style={{ marginRight: '5px' }} /> Agregar
                    </button>
                </div>

                {/* Listado de productos */}
                <ProductList />

                {/* Modal con el formulario */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="close-button" onClick={closeModal}>X</button>
                            <h2>Agrega un producto nuevo</h2>
                            <br />
                            <ProductForm onProductAdded={() => { 
                                window.location.reload();
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageProductsPage;
