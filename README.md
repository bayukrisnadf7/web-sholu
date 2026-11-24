# Sholu landing page

Landing page ReactJS + Vite untuk aplikasi Sholu. Materi dan aset bersumber dari proyek lokal `SalatBuddy`: panduan gerakan dan bacaan, personalisasi, dan refleksi. Copy dicocokkan dengan implementasi dan lokalisasi aplikasi pada `/Users/bayudf/Documents/GitHub/SalatBuddy`, serta tagline resmi yang diberikan pemilik proyek. Pemetaan sumber dan batas klaim ada di `CONTENT_SOURCES.md`.

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

- Konten bahasa Inggris dan Indonesia, dengan toggle EN/ID di navbar desktop dan seluler. Pilihan disimpan di localStorage; bahasa awal adalah Inggris.
- Navigasi responsif dan menu seluler. Label aksesibilitas, judul halaman, serta deskripsi metadata mengikuti bahasa yang dipilih.
- Screenshot asli dari materi SalatBuddy yang diberikan pemilik proyek; sumber setiap crop dicatat di `public/assets/screens/SOURCES.md`. Tidak ada UI aplikasi yang digambar ulang.
- Galeri screenshot panduan Takbiratul Ihram dan home yang dapat diganti.
- Video demo `sholu-story.mp4` dari pemilik proyek, disimpan sebagai `public/assets/sholu-demo.mp4`, dalam dialog dengan kontrol pemutar dan dukungan tombol Escape.
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

## Panduan coding dan desain

Skill [Ponytail](https://github.com/DietrichGebert/ponytail) dan [Impeccable](https://github.com/pbakaus/impeccable) tersedia lokal di `.agents/skills/` beserta lisensinya. `AGENTS.md` mengarahkan penggunaan skill untuk perubahan berikutnya; skill tersedia bagi Codex pada giliran berikutnya. Keduanya tidak menambah dependency atau JavaScript ke situs yang dipublikasikan.

`PRODUCT.md` mencatat batasan produk dan `DESIGN.md` mencatat sistem visual. Blok fitur dan langkah memakai data bersama; styling memakai satu rangkaian breakpoint. Refinement menghapus label dekoratif di atas judul, bingkai lengkung, kotak ikon fitur, serta kartu yang tidak diperlukan.

Pemuat konteks CLI Impeccable membutuhkan engine terpisah dan akses cache di luar workspace. Pada implementasi ini digunakan fallback membaca panduan langsung; detector/engine CLI belum dijalankan. Tidak ada lifecycle hook atau konfigurasi global yang dipasang.

## Tim Sholu

Bagian `#team` menampilkan enam foto yang diberikan pemilik proyek. Nama dan peran mengikuti data tim yang sudah diperbarui pemilik proyek pada array `team` di `src/main.jsx`; teks peran Indonesia ada di `src/translations.js`. Foto disimpan di `public/assets/team/`, diperkecil ke sisi terpanjang 1000 px dan dikompres JPEG kualitas 70, tanpa mengubah file sumber. Total keenam foto adalah 810.978 byte (di bawah 1 MB), dan masing-masing juga di bawah 1 MB.

Bagian personalisasi (`#how-it-works`) memiliki galeri empat tampilan: gerakan, Al-Fatihah, Tasyahud Akhir, dan bacaan lainnya. Teks menjelaskan penilaian kemampuan awal dan tingkat kelancaran bacaan, dengan dukungan EN/ID. Tiga screenshot bacaan dari 24 November 2026 disalin tanpa modifikasi; sumber dicatat di `public/assets/screens/SOURCES.md`.

Konten situs tidak menjanjikan perubahan panduan otomatis setelah setiap salat. Refleksi bersifat pilihan; tawaran penggalan lebih panjang atau tahap berikutnya mengikuti rekaman refleksi dan perlu diterima pengguna. Untuk personalisasi, pengguna yang baru mulai langsung masuk tahap 1; pertanyaan bacaan dilanjutkan bagi pengguna yang sudah mengenal gerakan.
