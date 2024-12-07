import { useState } from 'react'; 
import { createProduct } from '../services/productService'; 

function ProductForm({ onProductAdded }) { 
    // Componente `ProductForm` que recibe la función `onProductAdded` como prop 
    // para notificar al padre que se ha agregado un producto.

    const [form, setForm] = useState({
        name: '',
        reference: '',
        price: '',
        weight: '',
        category: '',
        stock: '',
        created_at: ''
    }); 
    // Define el estado `form` para almacenar los valores de los campos del formulario. 
    // Inicializa cada propiedad con un valor vacío.

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // Función para manejar cambios en los inputs. 
    // Actualiza el estado `form` copiando el estado actual y modificando solo el campo correspondiente.

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Previene la recarga de la página al enviar el formulario.

        await createProduct(form); 
        // Llama al servicio `createProduct` pasando los datos del formulario para guardarlos en el backend.

        onProductAdded(); 
        // Notifica al componente padre que se ha agregado un producto para que actualice la lista.
    };

    return (
        <form onSubmit={handleSubmit}> 
            {/* Formulario con un evento de envío manejado por `handleSubmit` */}
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                maxLength="50"
                onChange={handleChange} 
                // Maneja cambios en este campo llamando a `handleChange`.
                required 
            />
            <input
                type="text"
                name="reference"
                placeholder="Referencia"
                maxLength="20"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Precio"
                max="9999999999"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="weight"
                placeholder="Peso"
                max="9999999999"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Categoria"
                maxLength="20"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Cantidad"
                max="9999999999"
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="created_at"
                onChange={handleChange}
                required
            />
            <button type="submit">Guardar</button> 
            {/* Botón para enviar el formulario */}
        </form>
    );
}

export default ProductForm;
