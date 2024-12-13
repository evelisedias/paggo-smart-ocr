'use client'
import { useRouter } from 'next/navigation';
import styles from './styles/page.module.css';

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); 
  };

  return (
    <>
      <header className={styles.bgwite}>
        <div className={styles.text2xl}>Paggo Smart OCR</div>
        <button className={styles.button} onClick={handleLoginClick}>Login</button>
      </header>
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo à Paggo Smart OCR</h1>
        <p className={styles.subtitle}>
          Extraia texto de imagens de forma simples, fácil e inteligente!
        </p>
      </div>
    </>
  );
}
