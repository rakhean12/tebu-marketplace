# 🌾 Marketplace Hasil Petani Tebu

Website marketplace sederhana untuk menampilkan dan mengelola hasil panen tebu dari petani lokal menggunakan Google Spreadsheet sebagai database.

## 📋 Fitur

- ✅ Menampilkan daftar produk tebu dari Google Spreadsheet
- ✅ Pencarian produk secara realtime
- ✅ Daftar petani yang terdaftar
- ✅ Statistik laporan (total produk & stok)
- ✅ Desain responsive dengan Tailwind CSS
- ✅ Warna tema: Hijau (#2E7D32), Kuning (#FBC02D), Putih (#FFFFFF)

## 🛠️ Teknologi

- HTML5
- Tailwind CSS (via CDN)
- JavaScript ES6
- Google Spreadsheet (Database)
- Google Apps Script (API)

## 📁 Struktur Project

```
tebu-marketplace/
│
├── index.html          # Halaman utama
├── css/
│   └── style.css      # Custom CSS
├── js/
│   └── app.js         # JavaScript logic
└── assets/
    └── images/        # Folder untuk gambar
```

## 🚀 Cara Setup

### 1. Setup Google Spreadsheet

1. Buat Google Spreadsheet baru
2. Buat sheet dengan nama "Produk" dan kolom berikut:
   - Id (kolom A)
   - Nama Produk (kolom B)
   - Stok (kolom C)
   - Harga (kolom D)
   - Petani (kolom E)
   - Lokasi (kolom F)

3. Isi dengan data contoh:
   ```
   1 | Tebu Segar | 120 | 5000 | Pak Budi | Mojokerto
   2 | Gula Merah | 50 | 15000 | Pak Slamet | Kediri
   3 | Sirup Tebu | 80 | 12000 | Bu Ani | Malang
   ```

### 2. Setup Google Apps Script

1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus kode default dan paste kode berikut:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Produk');
  const data = sheet.getDataRange().getValues();
  
  // Ambil header (baris pertama)
  const headers = data[0];
  
  // Konversi data ke format JSON
  const jsonData = [];
  for (let i = 1; i < data.length; i++) {
    const row = {};
    row.id = data[i][0];
    row.namaProduk = data[i][1];
    row.stok = data[i][2];
    row.harga = data[i][3];
    row.petani = data[i][4];
    row.lokasi = data[i][5];
    jsonData.push(row);
  }
  
  // Return JSON
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Klik **Deploy** > **New deployment**
4. Pilih type: **Web app**
5. Setting:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Klik **Deploy**
7. Copy **Web app URL** yang diberikan

### 3. Setup Website

1. Buka file `js/app.js`
2. Ganti `URL_API_ANDA` dengan URL dari Google Apps Script:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### 4. Jalankan Website

1. Buka file `index.html` di browser
2. Website akan otomatis mengambil data dari Google Spreadsheet

## 📱 Sections Website

1. **Navbar** - Menu navigasi (Home, Produk, Petani, Laporan)
2. **Hero Section** - Judul dan deskripsi website
3. **Search Section** - Input pencarian realtime
4. **Produk Section** - Grid card produk dari database
5. **Petani Section** - Daftar petani yang terdaftar
6. **Laporan Section** - Statistik total produk dan stok

## 🎨 Warna Tema

- Hijau: `#2E7D32` (navbar, heading)
- Kuning: `#FBC02D` (hero section, button)
- Putih: `#FFFFFF` (background card)

## 💡 Tips Penggunaan

- Data di Google Spreadsheet akan otomatis ter-update di website setelah refresh
- Gunakan fitur search untuk mencari produk atau petani
- Website responsive dan bisa diakses dari mobile

## 📝 Catatan

- Pastikan Google Apps Script sudah di-deploy dengan akses "Anyone"
- Jika data tidak muncul, cek console browser (F12) untuk error
- Pastikan nama sheet di Google Spreadsheet adalah "Produk"

## 🤝 Kontribusi

Website ini dibuat untuk memudahkan petani tebu dalam mengelola dan menampilkan hasil panen mereka secara digital.

---

Dibuat dengan ❤️ untuk Petani Tebu Indonesia
