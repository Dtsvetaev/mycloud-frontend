import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    const token = localStorage.getItem('access');

    const response = await fetch('/api/files/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert('Файл успешно загружен!');
    } else {
      alert('Ошибка загрузки файла');
    }
  };

  return (
    <form onSubmit={handleUpload} role="form">
      <h3>Загрузка файла</h3>
      <input
        type="file"
        data-testid="file-input"
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



