import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // se criou o CSS, importe aqui

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Erro ao fazer login');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/creatures');
    } catch {
      setError('Erro na comunicação com o servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            className="login-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
          />
        </div>
       <div className="margin-top-10">
          <label htmlFor="password">Senha:</label><br />
          <input
            id="password"
            className="login-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit">Entrar</button>
      </form>
    </div>
  );
}
