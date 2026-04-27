# Finansialin Frontend (Next.js)

Frontend ini terintegrasi dengan backend Laravel di folder `../finansialin-backend-laravel`.

## 1) Setup Backend Laravel

Masuk ke folder backend:

```bash
cd ../finansialin-backend-laravel
```

Siapkan environment backend:

```bash
copy .env.example .env
```

Pastikan minimal variabel berikut ada di `.env` backend:

```env
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001
```

Jalankan backend:

```bash
composer install
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

## 2) Setup Frontend Next.js

Masuk ke folder frontend ini:

```bash
cd ../finansialin-v2-main
```

Buat environment frontend:

```bash
copy .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Install dependency dan jalankan frontend:

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`  
Backend API: `http://127.0.0.1:8000/api`

## 3) Alur Jalankan Bareng

Gunakan dua terminal:

1. Terminal 1: jalankan Laravel di port `8000`.
2. Terminal 2: jalankan Next.js di port `3000`.

Kalau login/register masih gagal, cek:

- URL API di `.env.local` frontend.
- CORS origin di `.env` backend.
- Endpoint backend bisa diakses: `http://127.0.0.1:8000/api/documentation`.
