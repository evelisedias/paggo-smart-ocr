'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';

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

  const handleLogin = () => {
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
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
      <div className={styles.registerLink}>
        <a href="/register">Ainda não tem uma conta? <span>Registre-se</span></a>
      </div>
    </div>
  );
}
