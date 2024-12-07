import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../services/productService';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ProductList() { 
    // Componente para mostrar la lista de productos con opciones para editar, eliminar y paginar.

    const [products, setProducts] = useState([]); 
    // Estado para almacenar la lista de productos.

    const [editingProduct, setEditingProduct] = useState(null); 
    // Estado para almacenar el producto que se está editando actualmente.

    const [formData, setFormData] = useState({
        name: '',
        reference: '',
        price: '',
        weight: '',
        category: '',
        stock: ''
    }); 
    // Estado para almacenar los datos del formulario de edición.

    const [currentPage, setCurrentPage] = useState(1); 
    // Estado para la página actual en la paginación.

    const productsPerPage = 10; 
    // Número de productos por página.

    const fetchProducts = async () => {
        const data = await getProducts(); 
        // Llama al servicio para obtener la lista de productos desde el backend.

        setProducts(data); 
        // Actualiza el estado `products` con los datos obtenidos.
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Está seguro que quiere eliminar este producto?");
        // Muestra una confirmación antes de eliminar.

        if (confirmed) {
            await deleteProduct(id); 
            // Llama al servicio para eliminar el producto por su ID.

            fetchProducts(); 
            // Actualiza la lista de productos después de eliminar.
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product); 
        // Configura el producto que se va a editar.

        setFormData({
            name: product.name,
            reference: product.reference,
            price: product.price,
            weight: product.weight,
            category: product.category,
            stock: product.stock
        }); 
        // Llena el formulario con los datos del producto seleccionado.
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); 
        // Actualiza los valores del formulario mientras el usuario edita.
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Previene la recarga de la página al enviar el formulario.

        await updateProduct(editingProduct.id, formData); 
        // Llama al servicio para actualizar el producto.

        setEditingProduct(null); 
        // Cierra el formulario de edición.

        fetchProducts(); 
        // Actualiza la lista de productos después de editar.
    };

    const indexOfLastProduct = currentPage * productsPerPage; 
    // Calcula el índice del último producto visible en la página actual.

    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
    // Calcula el índice del primer producto visible en la página actual.

    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); 
    // Obtiene los productos visibles según la página actual.

    const paginate = (pageNumber) => setCurrentPage(pageNumber); 
    // Cambia la página actual al número proporcionado.

    const totalPages = Math.ceil(products.length / productsPerPage); 
    // Calcula el número total de páginas.

    useEffect(() => {
        fetchProducts(); 
        // Llama a `fetchProducts` al montar el componente para cargar los productos.

    }, []);

    return (
        <div className="table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th className="actions-header">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>${product.price}</td>
                            <td className="actions-cell">
                                <button onClick={() => handleEdit(product)} className="edit-button">
                                    <FaEdit style={{ marginRight: '5px' }} /> Editar
                                    {/* Botón para activar la edición de este producto */}
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="delete-button">
                                    <FaTrash style={{ marginRight: '5px' }} /> Eliminar
                                    {/* Botón para eliminar este producto */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                {/* Botón para ir a la página anterior */}

                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => paginate(index + 1)} 
                        className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
                {/* Botones numerados para la paginación */}

                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                {/* Botón para ir a la página siguiente */}
            </div>

            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setEditingProduct(null)}>X</button>
                        {/* Botón para cerrar el formulario de edición */}
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                placeholder="Referencia"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Precio"
                                required
                            />
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="Peso"
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Categoría"
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Cantidad"
                                required
                            />
                            <button type="submit">Actualizar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
