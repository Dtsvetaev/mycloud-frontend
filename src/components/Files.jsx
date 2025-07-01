import React, { useState, useEffect } from 'react';

const Files = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);

  const getToken = () => localStorage.getItem('access');

  const checkAuth = (response) => {
    if ([401, 403].includes(response.status)) {
      alert('Сессия истекла. Авторизуйтесь снова.');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login';
      return false;
    }
    return true;
  };

  const fetchFiles = async () => {
    const token = getToken();
    const response = await fetch('http://127.0.0.1:8000/api/files/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      const data = await response.json();
      setFiles(data);
    } else {
      alert('Ошибка при получении списка файлов');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Выберите файл');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    const token = getToken();

    const response = await fetch('http://127.0.0.1:8000/api/files/', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      alert('Файл успешно загружен');
      setFile(null);
      setComment('');
      fetchFiles();
    } else {
      const result = await response.json();
      alert('Ошибка загрузки файла: ' + (result.file || result.detail || 'Неизвестная ошибка'));
    }
  };

 const handleDownload = async (id) => {
  const token = localStorage.getItem('access');
  const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/download/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Ошибка при скачивании файла');
  }
};




  const handleDelete = async (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить файл?');
    if (!confirmed) return;

    const token = getToken();
    const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      fetchFiles();
    } else {
      alert('Ошибка при удалении файла');
    }
  };

  const handleUpdate = async (id, newName, newComment) => {
    const token = getToken();
    const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original_name: newName, comment: newComment }),
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      fetchFiles();
    } else {
      alert('Ошибка при обновлении данных файла');
    }
  };

  const handleCopyLink = (uuid) => {
    const link = `http://127.0.0.1:8000/api/files/shared/${uuid}/`;
    navigator.clipboard.writeText(link);
    alert('Ссылка скопирована в буфер обмена');
  };

  return (
    <div>
      <h2>Список файлов</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
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

      <ul>
        {files.map((f) => (
          <li key={f.id} style={{ marginTop: '1em' }}>
            <strong>{f.original_name || f.file}</strong> ({f.size} байт)
            <br />
            Комментарий: {f.comment || '—'}
            <br />
            <button onClick={() => handleDownload(f.id, f.original_name)}>📥 Скачать</button>{' '}
            <button onClick={() => handleDelete(f.id)}>🗑 Удалить</button>{' '}
            <button
              onClick={() => {
                const newName = prompt('Новое имя файла:', f.original_name);
                const newComment = prompt('Новый комментарий:', f.comment);
                if (newName !== null && newComment !== null) {
                  handleUpdate(f.id, newName, newComment);
                }
              }}
            >
              ✏️ Изменить
            </button>{' '}
            <button onClick={() => handleCopyLink(f.special_link)}>🔗 Копировать ссылку</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;








