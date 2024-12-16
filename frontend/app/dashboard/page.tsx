'use client';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/dashboard.module.css';
import api from '../services/api';

export default function Dashboard() {

  // Variáveis de estado
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [extractedText, setExtratedText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');




  // Abrir o explorador e selecionar arquivo
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Lidar com a mudança do arquivo
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
      setImages(prevImages => [...prevImages, response.data]);


    } catch (error) {
      console.log('Erro ao enviar arquivo: ', error);
      alert('Erro ao enviar arquivo.');
    }
  };

  // Buscar as imagens
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get('/img');  
        setImages(response.data);
      } catch (error) {
        console.error('Erro ao carregar as imagens: ', error);
      }
    };
    fetchImages();
  }, []);


  //selecionar imagem
  const handleSelectImage = (id: string) => {
    console.log(id)
    setSelectedId(id);
  }

  //extrair texto

  const handleExtractText = async () => {
    if (!selectedId){
      setMessage('Selecione uma imagem primeiro!');
      return
  };

  try {
    const response = await api.get(`/img${selectedId}/extract-text`);
    setExtratedText(response.data.text);
    setMessage('Texto Extraído com sucesso!')
  } catch (error){
    console.error('Erro ao extrair texto: ', error)
    setMessage('Erro ao extrair texto da imagem.')
  }
}

  return (
    <div className={styles.dashboard}>

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/favicon.ico" alt="Logo" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*, .pdf"
          className={styles.fileInput}
        />
        <button onClick={handleButtonClick} className={styles.button}>
          Anexar Arquivo
        </button>
                <button onClick={handleExtractText} className={styles.button}>
          Extrair Texto
        </button>     

      </aside>

      <main className={styles.mainContent}>
        <div>
          {images.map((image) => (
            <div key={image.id} className={styles.imageContainer}>
              <img src='/recibo.ico' className={styles.imgRecibo} />
              <input
                type="radio"
                className={styles.radioSelected}
                checked={selectedId === image.id}
                onChange={() => handleSelectImage(image.id)}
              />
              <p className={styles.imageName}>{image.title}</p>
            </div>
          ))}
        </div>
        <div>
        {}
        {message && <p className={styles.success}>{message}</p>}
        </div>
      </main>
    </div>
  );
}

