import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SharedFile = () => {
  const { uuid } = useParams();
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const response = await fetch(`/api/files/shared/${uuid}/`);
        if (!response.ok) {
          throw new Error('Ошибка при получении файла');
        }
        const blob = await response.blob();
        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
        const filename = filenameMatch ? decodeURIComponent(filenameMatch[1]) : 'downloaded-file';

        const url = window.URL.createObjectURL(blob);
        setFileData({ url, filename });
      } catch (err) {
        setError(err.message || 'Не удалось загрузить файл');
      }
    };

    fetchShared();
  }, [uuid]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!fileData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h2>Скачивание файла</h2>
      <a
        href={fileData.url}
        download={fileData.filename}
        target="_blank"
        rel="noreferrer"
      >
        📥 Скачать файл: {fileData.filename}
      </a>
    </div>
  );
};

export default SharedFile;