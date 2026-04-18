# CityPulse 🌆

CityPulse, özellikle öğrenciler ve dijital göçebeler için geliştirilmiş, bütçe dostu ve çalışmaya uygun mekanları bulmayı sağlayan modern bir React web uygulamasıdır. 

Kullanıcılar bulundukları konumu (GPS) kullanarak etraflarındaki kafeleri, pizzacıları, marketleri ve kütüphaneleri fiyat seviyeleriyle birlikte listeleyebilirler.

## 🚀 Özellikler

- **Modern ve Premium Tasarım**: Glassmorphism detayları ve uyumlu renk paleti ile göze hitap eden UI.
- **Canlı Konum Entegrasyonu**: Tarayıcı GPS servisiyle kullanıcının konumunu anında algılama.
- **Mock Veri & Foursquare API Uyumluluğu**: Foursquare API anahtarınız yoksa bile içerisinde barındırdığı kendi yerel taslak verileriyle (Mock) harika bir şekilde çalışır.
- **Kategori Bazlı Listeleme**: Bütçe Dostu (₺) ve Çalışmaya Uygun (kütüphane, kafe vb.) filtreleri içerir.
- **Giriş Yap Animasyonu**: Auth simülasyonu sağlayan şık bir giriş penceresi modülü.

## 📁 Proje Klasör Yapısı

Modern gelişime uygun profesyonel klasör yapısı kullanılmıştır:

```text
CityPulse/
├── frontend/
│   ├── index.html          # Ana uygulama iskeleti (React/Babel yükleyicisi)
│   └── src/
│       ├── assets/         # Medya, ikon vb. kaynaklar (gelecek güncellemeler için)
│       ├── components/     # Yeniden kullanılabilir parçalar (Header.js, PlaceCard.js, vb.)
│       ├── pages/          # Tam ekran bileşenler (Home.js vb.)
│       ├── services/       # Veri çekme & API işlemleri (mockData.js)
│       └── styles/         # Global stiller (index.css)
```


## 📸 Ekran Görüntüleri

<img width="1919" height="1087" alt="Ekran görüntüsü 2026-04-18 040939" src="https://github.com/user-attachments/assets/37c9b524-3efd-4cb6-9668-49c71af00016" />

<img width="1909" height="1025" alt="Ekran görüntüsü 2026-04-18 040802" src="https://github.com/user-attachments/assets/8a1278f7-4a17-4f39-ac24-bfd53ae1a59d" />


---
*Bu proje modern frontend ekosistemini (React Bileşen Yapısı) kavramak ve kullanıcılara faydalı yerel servisler üretmek amacıyla açık kaynaklı olarak geliştirilmiştir.*
