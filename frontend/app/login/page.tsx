'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';


export default function Login() {

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }
  const handleLoginClick = () => {
    router.push('/register'); 
    
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


   const delayRedirect = (time: number) => {
   setTimeout(() => {
         router.push('/dashboard');
       }, time)
 };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    } 

    try {
      const response = await api.post('/users/login', {
        email: email,
        password: password
      });

      if (response.status === 201) {
        setSuccessMessage('Iniciando...')
        delayRedirect(3000)
        
        router.push('/dashboard')
      }

    } catch (error: any) {
      console.log('Erro ao fazer login: ', error);
      setError('Credenciais inválidas. Tente novamente.')
    }
  };
  

  return (
    <div className={styles.container}>
    <button onClick={handleGoBack} className={styles.backButton}>
      <FaArrowLeft/>
     </button> 
      <h1 className={styles.title}>Faça Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className={styles.input}
        />
        {}
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
      <div className={styles.registerLink}>
        <a href="/register">Ainda não tem uma conta? <span>Registre-se</span></a>
      </div>
    </div>
  );
}
