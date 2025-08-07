import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Pode criar estilos similares ao LoginPage.css

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Erro ao cadastrar');
        return;
      }

      // Se deu certo, redireciona para login
      navigate('/login');
    } catch {
      setError('Erro na comunicação com o servidor');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label><br />
          <input
            id="name"
            className="register-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Seu nome"
          />
        </div>
        <div className="margin-top-10">
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            className="register-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Seu email"
          />
        </div>
        <div className="margin-top-10">
          <label htmlFor="password">Senha:</label><br />
          <input
            id="password"
            className="register-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Sua senha"
          />
        </div>
        {error && <p className="register-error">{error}</p>}
        <button className="register-button" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
