import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SharedFile = () => {
  const { uuid } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/files/shared/${uuid}/`)
      .then((res) => res.json())
      .then((data) => setFileData(data))
      .catch(() => alert('Ошибка загрузки файла по ссылке'));
  }, [uuid]);

  if (!fileData) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Файл: {fileData.original_name}</h2>
      <p>Комментарий: {fileData.comment}</p>
      <p>Размер: {fileData.size} байт</p>
      <p>Загружен: {new Date(fileData.upload_date).toLocaleString()}</p>
      <a
        href={`http://127.0.0.1:8000${fileData.file}`}
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
