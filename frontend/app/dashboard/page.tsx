'use client';
import { useState, useRef } from 'react';
import styles from '../styles/dashboard.module.css'; 
import api from '../services/api';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null); 


  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
  };

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

  
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo!');
      return;
    }

    setFile(selectedFile); 
    setFileName(selectedFile.name); 

    const formData = new FormData(); 
    formData.append('file', selectedFile); 
    try {
      const response = await api.post('/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Upload realizado com sucesso!');
      console.log('Resposta do servidor: ', response.data);
    } catch (error) {
      console.log('Erro ao enviar arquivo: ', error);
      alert('Erro ao enviar arquivo.');
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/favicon.ico" alt="Logo" />
        </div>
        <input 
          type="file" 
          ref = {fileInputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className={styles.fileInput} 
        />
        <button onClick={handleButtonClick} className={styles.button}>
          Anexar Arquivo
        </button>
        <button className={styles.button}>Extrair Texto</button>
      </aside>
      <main className={styles.mainContent}>
        {}
      </main>
    </div>
  );
}
