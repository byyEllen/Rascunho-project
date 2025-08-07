import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Criaturas from './pages/Criaturas';
import NovaCriatura from './pages/NovaCriatura';
import DetalhesCriatura from './pages/DetalhesCriatura';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/criaturas" element={<Criaturas />} />
      <Route path="/nova" element={<NovaCriatura />} />
      <Route path="/criaturas/:id" element={<DetalhesCriatura />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
