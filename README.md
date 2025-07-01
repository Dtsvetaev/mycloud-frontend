# MyCloud

**MyCloud** — это полнофункциональное облачное хранилище, разработанное с использованием Django (backend) и React (frontend). Проект поддерживает регистрацию, авторизацию через JWT, загрузку, просмотр, скачивание, удаление и переименование файлов, а также доступ к файлам по специальной ссылке без авторизации.

## 🔧 Стек технологий

- **Backend**: Django, Django REST Framework, SimpleJWT
- **Frontend**: React, Vite
- **База данных**: SQLite (можно заменить на PostgreSQL)
- **Хранилище**: Локальное (MEDIA)
- **Аутентификация**: JWT (access/refresh)
- **Развёртывание**: GitHub + планируется публикация на reg.ru

## ⚙️ Возможности

- 👤 Регистрация и авторизация пользователей
- 📥 Загрузка файлов с комментариями
- 📄 Просмотр списка загруженных файлов
- ✏️ Редактирование имени файла и комментария
- 🗑 Удаление файлов
- 🔗 Получение публичной ссылки и скачивание файла без авторизации
- 📦 Скачивание файлов через интерфейс
- 🚪 Выход из системы (очистка токенов)

## 🚀 Установка и запуск

### Backend

```bash
cd mycloud-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd mycloud-frontend
npm install
npm run dev
```

## 📁 Структура проекта

```
mycloud-backend/
├── storage/
├── mycloud_backend/
├── db.sqlite3
└── manage.py

mycloud-frontend/
├── src/components/
├── src/
├── public/
└── index.html
```


