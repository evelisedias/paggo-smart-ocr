'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';


export default function Register() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Lógica de registro
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        <FaArrowLeft/>
      </button>      
      <h1 className={styles.title}>Cadastre-se</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome e Sobrenome"
          required
          className={styles.input}
        />
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirme a senha"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}
