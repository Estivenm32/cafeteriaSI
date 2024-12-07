import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage">
      <h1>Bienvenido al sistema de inventario - KONECTA</h1>
      <p>Seleccione una opción para comenzar:</p>
      <div className="flex space-x-6">
        <Link to="/manage-products">
          <button className="bg-blue-500">Administrar Productos</button>
        </Link>
        <Link to="/sales">
          <button className="bg-green-500">Vender Productos</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
