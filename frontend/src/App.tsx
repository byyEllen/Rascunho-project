import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatureListPage from './pages/CreatureListPage';
import CreateCreaturePage from './pages/CreatureFormPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/creatures"
          element={isAuthenticated ? <CreatureListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-creature"
          element={isAuthenticated ? <CreateCreaturePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
