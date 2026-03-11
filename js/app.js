// ============================================
// KONFIGURASI API
// ============================================
// Ganti URL_API_ANDA dengan URL Google Apps Script yang sudah di-deploy
// Contoh: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
const API_URL = 'URL_API_ANDA';

// Mode demo: set true untuk menggunakan data dummy, false untuk API real
const USE_DEMO_DATA = true;

// Data dummy untuk testing (hapus setelah API siap)
const DEMO_DATA = [
    {
        id: 1,
        namaProduk: 'Tebu Segar',
        stok: 120,
        harga: 5000,
        petani: 'Pak Budi',
        lokasi: 'Mojokerto'
    },
    {
        id: 2,
        namaProduk: 'Gula Merah',
        stok: 50,
        harga: 15000,
        petani: 'Pak Slamet',
        lokasi: 'Kediri'
    },
    {
        id: 3,
        namaProduk: 'Sirup Tebu',
        stok: 80,
        harga: 12000,
        petani: 'Bu Ani',
        lokasi: 'Malang'
    },
    {
        id: 4,
        namaProduk: 'Tebu Manis',
        stok: 95,
        harga: 6000,
        petani: 'Pak Budi',
        lokasi: 'Mojokerto'
    },
    {
        id: 5,
        namaProduk: 'Gula Aren',
        stok: 30,
        harga: 18000,
        petani: 'Bu Siti',
        lokasi: 'Blitar'
    },
    {
        id: 6,
        namaProduk: 'Tebu Hitam',
        stok: 65,
        harga: 7000,
        petani: 'Pak Joko',
        lokasi: 'Pasuruan'
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let allProducts = []; // Menyimpan semua data produk
let filteredProducts = []; // Menyimpan produk yang sudah difilter

// ============================================
// FUNGSI UNTUK MENGAMBIL DATA DARI API
// ============================================
async function fetchData() {
    try {
        // Tampilkan loading indicator
        document.getElementById('loading').style.display = 'block';
        document.getElementById('produkGrid').innerHTML = '';
        
        let data;
        
        // Cek apakah menggunakan demo data atau API real
        if (USE_DEMO_DATA) {
            // Simulasi delay loading
            await new Promise(resolve => setTimeout(resolve, 500));
            data = DEMO_DATA;
        } else {
            // Fetch data dari Google Apps Script API
            const response = await fetch(API_URL);
            
            // Cek apakah response berhasil
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }
            
            // Parse response menjadi JSON
            data = await response.json();
        }
        
        // Simpan data ke state
        allProducts = data;
        filteredProducts = data;
        
        // Sembunyikan loading
        document.getElementById('loading').style.display = 'none';
        
        // Tampilkan data
        displayProducts(filteredProducts);
        displayPetani(allProducts);
        displayStatistics(allProducts);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').innerHTML = 
            '<p class="text-xl text-red-600">Gagal memuat data. Pastikan API URL sudah benar dan USE_DEMO_DATA = false.</p>';
    }
}

// ============================================
// FUNGSI UNTUK MENAMPILKAN PRODUK
// ============================================
function displayProducts(products) {
    const produkGrid = document.getElementById('produkGrid');
    const noProduk = document.getElementById('noProduk');
    
    // Kosongkan grid
    produkGrid.innerHTML = '';
    
    // Cek apakah ada produk
    if (products.length === 0) {
        noProduk.classList.remove('hidden');
        return;
    }
    
    noProduk.classList.add('hidden');
    
    // Loop setiap produk dan buat card
    products.forEach(product => {
        const card = createProductCard(product);
        produkGrid.appendChild(card);
    });
}

// ============================================
// FUNGSI UNTUK MEMBUAT CARD PRODUK
// ============================================
function createProductCard(product) {
    // Buat elemen div untuk card
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl';
    
    // Tentukan badge stok
    const stockBadge = product.stok > 50 
        ? '<span class="badge badge-success">Stok Banyak</span>'
        : '<span class="badge badge-warning">Stok Terbatas</span>';
    
    // Format harga ke Rupiah
    const formattedPrice = formatRupiah(product.harga);
    
    // Isi HTML card
    card.innerHTML = `
        <div class="mb-4">
            <h4 class="text-2xl font-bold text-hijau-tebu mb-2">${product.namaProduk}</h4>
            ${stockBadge}
        </div>
        <div class="space-y-2">
            <p class="price">${formattedPrice}</p>
            <p class="text-gray-600">
                <span class="font-semibold">Stok:</span> ${product.stok} unit
            </p>
            <p class="text-gray-600">
                <span class="font-semibold">Petani:</span> ${product.petani}
            </p>
            <p class="text-gray-600">
                <span class="font-semibold">Lokasi:</span> ${product.lokasi}
            </p>
        </div>
        <button class="mt-4 w-full bg-kuning-tebu hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded transition">
            Lihat Detail
        </button>
    `;
    
    return card;
}

// ============================================
// FUNGSI UNTUK MENAMPILKAN DAFTAR PETANI
// ============================================
function displayPetani(products) {
    const petaniList = document.getElementById('petaniList');
    
    // Ambil daftar petani unik dari produk
    const petaniSet = new Set();
    const petaniData = [];
    
    products.forEach(product => {
        if (!petaniSet.has(product.petani)) {
            petaniSet.add(product.petani);
            petaniData.push({
                nama: product.petani,
                lokasi: product.lokasi
            });
        }
    });
    
    // Kosongkan list
    petaniList.innerHTML = '';
    
    // Tampilkan setiap petani
    petaniData.forEach(petani => {
        const card = document.createElement('div');
        card.className = 'petani-card bg-white rounded-lg shadow-md p-6 text-center';
        card.innerHTML = `
            <div class="text-4xl mb-3">👨‍🌾</div>
            <h5 class="text-xl font-bold text-hijau-tebu mb-1">${petani.nama}</h5>
            <p class="text-gray-600">${petani.lokasi}</p>
        `;
        petaniList.appendChild(card);
    });
}

// ============================================
// FUNGSI UNTUK MENAMPILKAN STATISTIK
// ============================================
function displayStatistics(products) {
    // Hitung total produk
    const totalProduk = products.length;
    
    // Hitung total stok
    const totalStok = products.reduce((sum, product) => sum + parseInt(product.stok), 0);
    
    // Tampilkan di UI
    document.getElementById('totalProduk').textContent = totalProduk;
    document.getElementById('totalStok').textContent = totalStok.toLocaleString('id-ID');
}

// ============================================
// FUNGSI UNTUK SEARCH/FILTER PRODUK
// ============================================
function searchProducts(keyword) {
    // Convert keyword ke lowercase untuk case-insensitive search
    const searchTerm = keyword.toLowerCase();
    
    // Filter produk berdasarkan nama produk atau nama petani
    filteredProducts = allProducts.filter(product => {
        return product.namaProduk.toLowerCase().includes(searchTerm) ||
               product.petani.toLowerCase().includes(searchTerm) ||
               product.lokasi.toLowerCase().includes(searchTerm);
    });
    
    // Tampilkan hasil filter
    displayProducts(filteredProducts);
}

// ============================================
// FUNGSI HELPER: FORMAT RUPIAH
// ============================================
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Event listener untuk search input
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchProducts(e.target.value);
});

// Event listener untuk smooth scroll pada navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INISIALISASI
// ============================================
// Panggil fetchData saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
