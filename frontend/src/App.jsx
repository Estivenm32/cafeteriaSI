import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageProductsPage from './pages/ManageProductsPage';
import SalesPage from './pages/SalesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manage-products" element={<ManageProductsPage />} />
                <Route path="/sales" element={<SalesPage />} />
            </Routes>
        </Router>
    );
}

export default App;