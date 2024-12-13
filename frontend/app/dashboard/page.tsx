'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/dashboard.module.css'; 
import { FaArrowLeft } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/favicon.ico" alt="Logo" />
        </div>
        <button className={styles.button}>Anexar Arquivo</button>
        <button className={styles.button}>Extrair Texto</button>
      </aside>
      <main className={styles.mainContent}>
        {/* Aqui você pode adicionar os gráficos, informações e outros componentes */}
      </main>
    </div>
  );
}
