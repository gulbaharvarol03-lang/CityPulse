// Foursquare API Key (Kullanıcı buraya yapıştıracak)
// ÖRN: "fsq3abcdefghijklmnop..."
window.FOURSQUARE_API_KEY = "fsq3rIb+7rhCR2J3ZrMhgKaqOOo3erBFatu6i+X12g7YcSk=";

const mockCities = [
  {
    id: 34,
    name: "İstanbul",
    districts: ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar", "Beyoğlu", "Maltepe"],
  },
  {
    id: 6,
    name: "Ankara",
    districts: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut"],
  },
  {
    id: 35,
    name: "İzmir",
    districts: ["Karşıyaka", "Bornova", "Konak", "Buca", "Çiğli"],
  },
  {
    id: 16,
    name: "Bursa",
    districts: ["Osmangazi", "Nilüfer", "Yıldırım", "Mudanya"],
  },
  {
    id: 7,
    name: "Antalya",
    districts: ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya"],
  }
];

const mockPlaces = [
  {
    id: "p1",
    name: "Pizza Locale",
    type: "pizzacı",
    address: "Kadıköy, İstanbul",
    city: "İstanbul",
    district: "Kadıköy",
    distanceKm: 0.5,
    rating: 4.8,
    priceLevel: "₺₺",
    isWorkFriendly: false,
    offersMenu: true,
    menu: ["Margherita - 200₺", "Pepperoni - 250₺", "Mushroom - 220₺"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "p2",
    name: "Napoli Pizza",
    type: "pizzacı",
    address: "Beşiktaş, İstanbul",
    city: "İstanbul",
    district: "Beşiktaş",
    distanceKm: 2.1,
    rating: 4.5,
    priceLevel: "₺",
    isWorkFriendly: false,
    offersMenu: true,
    menu: ["Sade Pizza - 150₺", "Karışık Pizza - 200₺"],
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "c1",
    name: "Workstation Cafe",
    type: "kafe",
    address: "Şişli, İstanbul",
    city: "İstanbul",
    district: "Şişli",
    distanceKm: 1.2,
    rating: 4.9,
    priceLevel: "₺₺",
    isWorkFriendly: true,
    offersMenu: true,
    menu: ["Filtre Kahve - 80₺", "Latte - 100₺", "Cheesecake - 150₺"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "c2",
    name: "EspressoLab",
    type: "kafe",
    address: "Çankaya, Ankara",
    city: "Ankara",
    district: "Çankaya",
    distanceKm: 0.8,
    rating: 4.6,
    priceLevel: "₺₺",
    isWorkFriendly: true,
    offersMenu: true,
    menu: ["Americano - 90₺", "Mocha - 110₺", "Brownie - 130₺"],
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "m1",
    name: "Migros Jet",
    type: "market",
    address: "Kadıköy, İstanbul",
    city: "İstanbul",
    district: "Kadıköy",
    distanceKm: 0.3,
    rating: 4.2,
    priceLevel: "₺₺",
    isWorkFriendly: false,
    offersMenu: false,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  }
];

const fetchPlaces = async (query, city, district, lat, lng) => {
  // Eğer API KEY girilmişse Foursquare'den çek!
  if (window.FOURSQUARE_API_KEY && window.FOURSQUARE_API_KEY.length > 5) {
    console.log("Gerçek Foursquare API kullanılıyor...");
    try {
      const searchParams = new URLSearchParams({
        query: query || '',
        limit: 10,
        fields: 'fsq_id,name,location,rating,price,distance,photos,categories'
      });

      if (lat && lng) {
        searchParams.append('ll', `${lat},${lng}`);
        searchParams.append('radius', 5000); // 5km
      } else {
        searchParams.append('near', `${district}, ${city}, TR`);
      }

      const response = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: window.FOURSQUARE_API_KEY
        }
      });

      if (response.status === 401 || response.status === 403 || response.status === 410) {
        alert(`Foursquare API Anahtarınız geçersiz veya engellenmiş (Hata: ${response.status})!\n\nSebepleri:\n1. Anahtarı yeni mi aldınız? Foursquare àsılsız hesapları engelleyebiliyor.\n2. Yanlış mı yazdınız?\n\nHiç sorun değil, demo kesintiye uğramasın diye sistem otomatik olarak 'Taslak Verilere (Mock Data)' geçiş yapıyor.`);
        throw new Error("API_REJECTED_" + response.status); // Catch it below to fallback
      }
      
      if (!response.ok) {
        console.error("API Hatası:", response.status);
        throw new Error("API Hatası: " + response.status);
      }

      const data = await response.json();

      if (!data.results) return [];

      return data.results.map(place => {
        // Map Foursquare data to our App's structure
        const categoryName = place.categories && place.categories.length > 0 ? place.categories[0].name.toLowerCase() : "mekan";
        const isWorkFriendly = categoryName.includes('cafe') || categoryName.includes('coffee') || categoryName.includes('library');

        let imageUrl = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"; // Default image
        if (place.photos && place.photos.length > 0) {
          imageUrl = `${place.photos[0].prefix}Original${place.photos[0].suffix}`;
        }

        let priceStr = "₺";
        if (place.price === 2) priceStr = "₺₺";
        if (place.price === 3) priceStr = "₺₺₺";
        if (place.price === 4) priceStr = "₺₺₺₺";

        return {
          id: place.fsq_id,
          name: place.name,
          type: categoryName,
          address: place.location.address || place.location.formatted_address,
          city: place.location.region || city,
          district: place.location.locality || district,
          distanceKm: place.distance ? (place.distance / 1000).toFixed(1) : 0,
          rating: place.rating ? (place.rating / 2).toFixed(1) : "Yeni", // FSQ is out of 10, ours is out of 5
          priceLevel: priceStr,
          isWorkFriendly: isWorkFriendly,
          offersMenu: false, // FSQ doesn't provide menus in free search
          image: imageUrl
        };
      });
    } catch (error) {
      console.error("Foursquare API Hatası (veya Anahtar Reddedildi):", error);
      // Fallback to mock data below instead of returning [] early
      console.log("Hata nedeniyle Mock Sisteme geçiliyor...");
    }
  }

  // API KEY YOKSA MOCK KULLAN:
  console.log("Mock Veri kullanılıyor...");
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...mockPlaces];

      if (query) {
        results = results.filter(p => p.type.includes(query.toLowerCase()) || p.name.toLowerCase().includes(query.toLowerCase()));
      }

      // Eğer lat/lng gelmişse mock verilerde konuma göre filtrelemeyi atla
      // Sadece manuel seçilmişse şehir/ilçe filtrele
      if (!lat) {
        if (city && city !== "Tümü") {
          results = results.filter(p => p.city === city);
        }
        if (district && district !== "Tümü") {
          results = results.filter(p => p.district === district);
        }
      }

      resolve(results);
    }, 800);
  });
};

window.mockCities = mockCities;
window.fetchPlaces = fetchPlaces;
