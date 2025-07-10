import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFiles } from '../slices/fileSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Files = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.access);
  const files = useSelector((state) => state.files.list);

  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const checkAuth = (response) => {
    if ([401, 403].includes(response.status)) {
      dispatch(logout());
      navigate('/login');
      return false;
    }
    return true;
  };

  const fetchFiles = async () => {
    const response = await fetch('/api/files/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      const data = await response.json();
      dispatch(setFiles(data));
    } else {
      alert('Ошибка при получении списка файлов');
    }
  };

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Выберите файл');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    const response = await fetch('/api/files/', {
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

  const handleDownload = async (id, originalName) => {
    const response = await fetch(`/api/files/${id}/download/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = originalName || 'file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Ошибка при скачивании файла');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Удалить файл?');
    if (!confirmed) return;

    const response = await fetch(`/api/files/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!checkAuth(response)) return;

    if (response.ok) {
      fetchFiles();
    } else {
      alert('Ошибка удаления файла');
    }
  };

  const handleUpdate = async (id, newName, newComment) => {
    const response = await fetch(`/api/files/${id}/`, {
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
      alert('Ошибка обновления файла');
    }
  };

  const handleCopyLink = (uuid) => {
    if (!uuid) {
      alert('Ошибка: ссылка недоступна. Попробуйте позже.');
      return;
    }

    const link = `${window.location.origin}/api/files/shared/${uuid}/`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        alert('Ссылка скопирована');
      }).catch(() => {
        fallbackCopy(link);
      });
    } else {
      fallbackCopy(link);
    }
  };

  const fallbackCopy = (text) => {
    const temp = document.createElement('input');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    alert('Скопировано резервным способом');
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Список файлов</h2>
      <form onSubmit={handleUpload} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Загрузить</button>
      </form>
      <ul>
        {files.map((f) => (
          <li key={f.id} style={{ marginTop: '1em' }}>
            <strong>{f.original_name || f.file}</strong> ({f.size} байт)<br />
            Комментарий: {f.comment || '—'}<br />
            <button onClick={() => handleDownload(f.id, f.original_name)}>📥 Скачать</button>{' '}
            <button onClick={() => handleDelete(f.id)}>🗑 Удалить</button>{' '}
            <button onClick={() => {
              const newName = prompt('Новое имя файла:', f.original_name);
              const newComment = prompt('Новый комментарий:', f.comment);
              if (newName !== null && newComment !== null) {
                handleUpdate(f.id, newName, newComment);
              }
            }}>✏️ Изменить</button>{' '}
            <button onClick={() => handleCopyLink(f.special_link)}>🔗 Копировать ссылку</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;