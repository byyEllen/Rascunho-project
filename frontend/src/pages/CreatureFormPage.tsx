// src/pages/CreatureFormPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreatureFormPage.css';

const CreatureFormPage: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/creatures', {
        name,
        type,
        description,
      });

      setMessage('Criatura cadastrada com sucesso!');
      setName('');
      setType('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao cadastrar criatura:', error);
      setMessage('Erro ao cadastrar criatura.');
    }
  };

  return (
    <div className="creature-form-container">
      <h2>Cadastrar Criatura</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="type">Tipo</label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default CreatureFormPage;
