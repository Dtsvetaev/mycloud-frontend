import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const access = useSelector((state) => state.auth.access);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!file) return setError('Выберите файл для загрузки');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    try {
      const response = await fetch('/api/files/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage('Файл успешно загружен!');
        setFile(null);
        setComment('');
      } else {
        const data = await response.json();
        setError(data.detail || data.file || 'Ошибка при загрузке файла');
      }
    } catch (err) {
      setError('Ошибка сети. Повторите попытку позже.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h3>Загрузка файла</h3>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button type="submit">Загрузить</button>
    </form>
  );
};

export default Upload;