'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';


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

  //delayzinho
  const delayRedirect = (time: number) => {
    setTimeout(() => {
        router.push('/login');
      }, time)
  };

  const [successMessage, setSuccessMessage] = useState('');


  //validar se senhas são iguais e enviar para bkend
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

      try {
        const response = await api.post('/users', {
          name: formData.name,
          email: formData.email,
          password: formData.confirmPassword
        })

        if (response.status === 201){
          setSuccessMessage('Cadastro realizado com sucesso!')
          delayRedirect(2000)
        }
      } catch (error: any) {
        console.log('Erro ao cadastrar:', error);
        // Verificar o que vem de resposta de erro
        if (error.response) {
          console.log('Resposta do servidor:', error.response);
          setError(error.response.data?.message || 'Erro ao cadastrar');
        } else {
          setError('Erro ao cadastrar');
        }

  };
}
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
        
        {}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>


    </div>
  );
}
