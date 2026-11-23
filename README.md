# Sholu landing page

Landing page ReactJS + Vite untuk aplikasi Sholu. Materi dan aset bersumber dari proyek lokal `SalatBuddy`: panduan gerakan dan bacaan, personalisasi, dan refleksi. Copy mengikuti deskripsi produk yang diberikan pemilik proyek.

## Menjalankan

```sh
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite.

```sh
npm run build
npm run preview
```

Hasil build ada di `dist/` dan dapat dihosting sebagai situs statis.

## Konten dan interaksi

- Copy bahasa Inggris, navigasi responsif, dan menu seluler.
- Screenshot asli dari materi SalatBuddy yang diberikan pemilik proyek; sumber setiap crop dicatat di `public/assets/screens/SOURCES.md`. Tidak ada UI aplikasi yang digambar ulang.
- Galeri screenshot panduan Takbiratul Ihram dan home yang dapat diganti.
- Video demo asli dalam dialog dengan kontrol pemutar dan dukungan tombol Escape.
- FAQ menggunakan elemen disclosure native.
- Dukungan keyboard, focus visible, dan preferensi reduced motion.

Tautan App Store/TestFlight belum ditemukan dalam materi proyek, sehingga CTA mengarah ke demo. Tambahkan tautan resmi setelah tersedia. Warna tombol utama `#070346`. Font DM Sans dan Lora dimuat dari Google Fonts dengan fallback sans-serif.

## GitHub Pages

Repository: `https://github.com/bayukrisnadf7/web-sholu`.
Alamat setelah deployment berhasil: `https://bayukrisnadf7.github.io/web-sholu/`.

1. Buka repository di GitHub, lalu **Settings → Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
3. Commit dan push perubahan proyek ke branch `main`.
4. Buka tab **Actions**, pilih **Deploy Sholu to GitHub Pages**, dan tunggu berhasil.
5. Buka alamat situs yang ditampilkan pada hasil deployment.

Workflow `.github/workflows/deploy.yml` memasang dependensi, membuat build, dan menerbitkan `dist/` secara otomatis setiap push ke `main`. Workflow mengambil base path dari konfigurasi GitHub Pages. Build lokal memakai `/web-sholu/`; jalankan `VITE_BASE_PATH=/ npm run build` untuk hosting pada root domain.
