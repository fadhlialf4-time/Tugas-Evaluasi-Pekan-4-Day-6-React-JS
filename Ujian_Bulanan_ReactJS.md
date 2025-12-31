# 🧾 **Ujian Bulanan React JS — Product Dashboard (E-Commerce Lite)**

## 🗓️ Durasi

**Waktu pengerjaan:** 1 hari (maksimal 8 jam efektif)  
**Batas pengumpulan:** sesuai instruksi mentor  

---

## 🎯 **Tujuan Pembelajaran**

Ujian bulanan ini bertujuan untuk mengukur kemampuanmu dalam membangun aplikasi React.js yang lengkap dengan alur data nyata.  
Melalui project ini, kamu diharapkan mampu mengintegrasikan seluruh konsep yang telah dipelajari selama satu bulan terakhir, meliputi:

1. **Komponen & Props**
2. **State Management (useState, useContext, Custom Hook)**
3. **useEffect & Fetching API**
4. **React Routing (Link, NavLink, Route, Nested Route, Private Route)**
5. **Performance Optimization (useMemo, useCallback)**
6. **Error Handling (Error Boundary)**
7. **Clean Code & UI/UX Implementation**

---

## 🛒 **Deskripsi Proyek**

Buat aplikasi **Product Dashboard (E-Commerce Lite)** — sebuah aplikasi katalog produk dengan halaman publik dan halaman admin sederhana.  
Aplikasi ini menampilkan daftar produk dari API publik dan menyediakan fitur CRUD simulasi, login sederhana, serta navigasi antar halaman menggunakan React Router.

---

## ⚙️ **Ketentuan Teknis**

1. Gunakan **React.js** (Vite atau Create React App).  
2. Gunakan **React Router DOM v6** untuk routing dan navigasi.  
3. Gunakan **Context API** untuk state global (auth & product management).  
4. Gunakan **Custom Hooks** untuk logika reusable (misal `useProducts`, `useAuth`).  
5. Gunakan **API**: [https://fakestoreapi.com/products](https://fakestoreapi.com/products)  
6. Implementasikan **Private Route** untuk halaman admin/dashboard.  
7. Gunakan **useMemo** dan **useCallback** untuk optimisasi performa.  
8. Buat **Error Boundary** untuk menangani error pada komponen tertentu.  
9. Styling bebas (Tailwind, CSS, Bootstrap, dsb.) — utamakan kerapian dan keterbacaan.  
10. Wajib menggunakan **Typescript** untuk semua component dan function
11. Pastikan aplikasi **tidak error di console** dan dapat dijalankan dengan:  

   ```bash
   npm run dev
   ```  
   atau  
   ```bash
   npm start
   ```


---

## 🧱 **Fitur yang Harus Dibuat**

### 1. 🛍️ Halaman Daftar Produk (Public)
* Fetch data produk dari API `https://fakestoreapi.com/products`.
* Tampilkan data dalam bentuk *product card* berisi gambar, nama, harga, dan tombol **Detail**.
* Saat diklik, arahkan ke halaman detail produk (`/products/:id`).
* Tampilkan state **Loading** dan **Error** jika terjadi kegagalan fetch.

---

### 2. 🧾 Halaman Detail Produk
* Gunakan **dynamic route** untuk menampilkan detail produk berdasarkan ID.  
* Tampilkan informasi produk lengkap (image, title, category, description, price).  
* Sediakan tombol **Add to Cart** atau **Edit (jika login sebagai admin)**.

---

### 3. 🔐 Login Simulasi
* Buat halaman `/login` untuk simulasi login sederhana (tanpa backend).  
* Gunakan **AuthContext** untuk menyimpan status login.  
* Setelah login, redirect user ke halaman `/dashboard`.  
* Tambahkan tombol **Logout** di navbar.

---

### 4. 🧭 Dashboard (Admin Only)
* Buat halaman `/dashboard` yang hanya bisa diakses oleh pengguna login.  
* Dashboard berisi daftar produk yang bisa di-*manage* (CRUD simulasi):
  - Tambah produk baru (disimpan di state lokal)
  - Edit data produk (form modal)
  - Hapus produk dari daftar
* Tidak perlu menyimpan ke server — cukup gunakan state lokal sebagai simulasi.

---

### 5. 🧩 Routing
* Gunakan `react-router-dom` v6:
  - `/` → redirect ke `/products`
  - `/products` → halaman publik daftar produk
  - `/products/:id` → detail produk
  - `/login` → halaman login
  - `/dashboard` → halaman admin (Private Route)
* Gunakan `Link`, `NavLink`, `useNavigate`, dan `useLocation` sesuai kebutuhan.

---

### 6. ⚡ Performance Optimization
* Gunakan `useMemo` untuk menghitung total produk atau filtering data.
* Gunakan `useCallback` untuk event handler yang sering dipanggil (misal tombol edit/delete).

---

### 7. 💥 Error Boundary
* Buat komponen `ErrorBoundary` untuk menangani error pada area produk.
* Saat error terjadi, tampilkan pesan fallback seperti “Terjadi kesalahan, coba lagi nanti.”

---

## 📁 **Struktur Folder yang Direkomendasikan**

```
src/
│
├── contexts/
│   ├── AuthContext.tsx
│   └── ProductContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── useProducts.ts
│
├── pages/
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Dashboard.tsx
│   └── Login.tsx
│
├── components/
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── ErrorBoundary.tsx
│
└── App.tsx
```

---

## 🧮 **Kriteria Penilaian (Total: 100 poin)**

| Aspek | Deskripsi | Bobot |
|-------|------------|--------|
| **Context Implementation** | Context API digunakan dengan benar untuk state global | 15 |
| **Custom Hook** | Hook reusable (`useProducts`, `useAuth`) dibuat dengan logika terpisah | 15 |
| **Routing System** | Semua route berjalan sesuai alur, termasuk PrivateRoute | 15 |
| **Performance Optimization** | `useMemo` & `useCallback` diterapkan dengan tepat | 15 |
| **Error Handling** | ErrorBoundary berfungsi tanpa mematikan aplikasi | 10 |
| **Code Quality** | Struktur, naming, dan kerapian kode | 10 |
| **UI/UX Simplicity** | Antarmuka sederhana tapi fungsional | 10 |

> 💬 Nilai maksimum **90 poin**.  
> Tambahan **+10 poin bonus** diberikan jika hasil proyek melebihi ekspektasi (misalnya menambah fitur search, dark mode, atau dokumentasi yang sangat rapi).

---

## 💾 **Cara Pengumpulan**

1. Upload project ke **GitHub (public repository)**.  
2. Deploy ke **Vercel** atau **GitHub Pages**.  
3. Tambahkan link deploy di deskripsi repository.  
4. Kirim link repository GitHub ke mentor sebelum batas waktu.  

---

## 🧠 **Tips Sebelum Mulai**

* Buat dulu struktur proyek dan setup routing dasar.  
* Buat Context (Auth dan Product) sebelum mengerjakan komponen utama.  
* Kerjakan fitur secara bertahap (fetch data → routing → dashboard → optimisasi).  
* Gunakan `useMemo` hanya untuk perhitungan yang kompleks atau filter data.  
* Gunakan `useCallback` untuk fungsi event yang dikirim ke child components.  
* Lakukan testing kecil setiap kali menyelesaikan satu fitur.  
