import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SharedFile = () => {
  const { uuid } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetch(`/api/files/shared/${uuid}/`)
      .then((res) => res.json())
      .then((data) => setFileData(data))
      .catch(() => alert('Ошибка загрузки файла по ссылке'));
  }, [uuid]);

  if (!fileData) return <p>Загрузка...</p>;

  // Абсолютный путь к файлу:
  const fullFileUrl = `${window.location.origin}${fileData.file}`;

  return (
    <div>
      <h2>Файл: {fileData.original_name}</h2>
      <p>Комментарий: {fileData.comment}</p>
      <p>Размер: {fileData.size} байт</p>
      <p>Загружен: {new Date(fileData.upload_date).toLocaleString()}</p>
      <a
        href={fullFileUrl}
        download={fileData.original_name}
        target="_blank"
        rel="noreferrer"
      >
        📥 Скачать файл
      </a>
    </div>
  );
};

export default SharedFile;


