# CityPulse 🌆 - Türkiye Gerçek Mekan Rehberi

CityPulse, Türkiye'nin **81 ili ve 973 ilçesinin tamamında** (örneğin **Afyonkarahisar / Sandıklı**, İstanbul / Kadıköy, Ankara / Çankaya vb.) dilediğiniz herhangi bir kategorideki (**pizzacı, kafe, kütüphane, pideci, market, restoran**) işletmeleri **tamamen gerçek verilerle** bulmanızı sağlayan modern bir web uygulamasıdır.

---

## 🚀 Yeni Özellikler & Gerçek Veri Entegrasyonu

1. **81 İl & 973 İlçe Tam Kapsama**:
   - Eski 5 şehir kısıtlaması kaldırıldı.
   - Türkiye'nin tüm illeri ve tüm ilçeleri entegre edildi.
   - Seçilen ile göre (örneğin *Afyonkarahisar*) ilçeler (*Sandıklı, Dinar, Bolvadin, Emirdağ...*) dinamik olarak listelenir.

2. **Gerçek Mekan Verisi (Canlı Arama & Doğrulama)**:
   - **Afyonkarahisar / Sandıklı**'da arama yapıldığında ilçedeki gerçek işletmeler (*Terra Pizza Sandıklı Ece Şubesi, Papyon Pizza & Fast Food, Pizza Mizza Sandıklı, One Pizza Cafe vb.*) listelenir.
   - Her mekan için gerçek adres, Google Haritalar linki (*"Haritada Gör"*), telefon numarası, gerçek kullanıcı puanı ve örnek menü gösterilir.

3. **Çoklu Sağlayıcı (Multi-Provider) Desteği**:
   - **Canlı Gerçek Arama Motoru (Varsayılan - Ücretsiz & Sıfır Kurulum)**: Hiçbir API anahtarına veya kredi kartına ihtiyaç duymadan gerçek işletme verilerini anında bulur.
   - **Google Places API**: Kendi Google Cloud API anahtarınızı girerek doğrudan Google Haritalar veritabanından veri çekebilme imkanı.
   - **Foursquare Places API (Yeni 2026 Sürümü)**: FSQ OS altyapısı ve `X-Places-Api-Version: 2025-06-17` başlığıyla uyumlu yeni endpoint.

4. **GPS ile Otomatik Konum Bulma**:
   - GPS butonuna tıklandığında mevcut konum koordinatlarınız alınır, ters coğrafi kodlama (Reverse Geocoding) ile bulunduğunuz il ve ilçe otomatik tespit edilir.

5. **Akıllı Filtreler**:
   - Bütçe Dostu (₺), Çalışmaya Uygun (kafe, kütüphane) ve Yüksek Puanlı (4.5+) işletmeleri tek tıkla filtreleme.

---

## 🛠️ Kurulum ve Çalıştırma

### Yöntem 1: Gerçek Veri Sunucusu ile Çalıştırma (Önerilen)

Python Flask arka uç sunucusunu başlatarak tam gerçek zamanlı veri çekme motorunu aktif hale getirebilirsiniz:

```bash
# Gerekli kütüphaneleri yükleyin (zaten yüklü olabilir)
pip install -r requirements.txt

# Sunucuyu başlatın
python server.py
```

Tarayıcınızdan **`http://localhost:5000`** adresine gidin.

### Yöntem 2: Yalnızca Ön Yüz (Statik) Olarak Çalıştırma

Python'ın yerel HTTP sunucusu ile de ön yüzü doğrudan çalıştırabilirsiniz:

```bash
cd frontend
python -m http.server 3000
```

Tarayıcınızdan **`http://localhost:3000`** adresine gidin.

---

## ⚙️ API Ayarları Nasıl Yapılır?

Uygulamanın sağ üst köşesindeki **"Canlı Gerçek Veri"** butonuna (⚙️) tıklayarak ayarlar penceresini açabilir, Google Maps veya Foursquare API anahtarlarınızı kaydedebilirsiniz. Anahtarlar tarayıcınızın `localStorage` alanında güvenle tutulur.

---

## 📁 Proje Yapısı

```text
CityPulse/
├── server.py                  # Canlı veri arama motoru, API proxy ve Flask sunucusu
├── requirements.txt           # Python bağımlılıkları (Flask, Flask-Cors, Requests)
├── README.md                  # Proje dokümantasyonu
└── frontend/
    ├── index.html             # Ana HTML iskeleti
    └── src/
        ├── services/
        │   ├── turkeyCities.js   # 81 İl ve 973 İlçe veri seti
        │   ├── placesService.js  # Birleşik mekan arama servisi
        │   └── mockData.js       # Yedek taslak veri kaynağı
        ├── components/
        │   ├── Header.js         # Başlık, veri kaynağı göstergesi ve modal tetikleyiciler
        │   ├── PlaceCard.js      # Gerçek veri rozeti, harita linki ve telefon içeren mekan kartı
        │   ├── ApiSettingsModal.js # Sağlayıcı seçimi ve API anahtarı ayarları
        │   └── LoginModal.js     # Kullanıcı giriş modülü
        ├── pages/
        │   └── Home.js           # İl/İlçe seçimi, arama formu ve sonuç listesi
        └── styles/
            └── index.css         # Modern cam (glassmorphism) ve responsive tasarım stilleri
```

---
*CityPulse - Gerçek mekan verileriyle şehrinizi ve ilçenizi keşfedin.*
