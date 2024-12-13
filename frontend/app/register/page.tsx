'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';

export default function Register() {

  // Direcionar para a página anterior
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  // Trabalhar com campos de input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Estado de erro
  const [error, setError] = useState('');

  //validar se senhas são iguais e enviar para bkend
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

      try {
        const response = await axios.post('api/register', {
          name: formData.name,
          email: formData.email,
          password: formData.confirmPassword
        })

        if (response.status === 200){
          alert('Cadastro realizado com sucesso!')
        }
      } catch (error) {
        setError('Erro ao cadastrar')
      }

  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        <FaArrowLeft />
      </button>      
      <h1 className={styles.title}>Cadastre-se</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome e Sobrenome"
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          required
          className={styles.input}
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme a senha"
          required
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>


    </div>
  );
}
