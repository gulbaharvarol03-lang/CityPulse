const { useState, useEffect } = window.React;
const PlaceCard = window.PlaceCard;
const turkeyCities = window.turkeyCities || [];
const fetchPlaces = window.fetchPlaces;

const Home = () => {
  const [query, setQuery] = useState("pizza");
  const [selectedCity, setSelectedCity] = useState("Afyonkarahisar");
  const [selectedDistrict, setSelectedDistrict] = useState("Sandıklı");
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [gpsCoords, setGpsCoords] = useState(null);
  const [searchStatusInfo, setSearchStatusInfo] = useState("");

  // Get current province's districts
  const currentCityObj = turkeyCities.find(c => c.name.toLowerCase() === selectedCity.toLowerCase()) || turkeyCities[0] || { name: "Afyonkarahisar", districts: [] };
  const currentDistricts = currentCityObj.districts || [];

  // Execute search
  const performSearch = async (term, city, district, coords) => {
    setLoading(true);
    setSearchStatusInfo("");
    try {
      const results = await fetchPlaces(term, city, district, coords ? coords.lat : null, coords ? coords.lng : null);
      setPlaces(results);
      setFilteredPlaces(results);
      if (results.length > 0) {
        setSearchStatusInfo(`${district !== "Tümü" ? district + ", " : ""}${city} için ${results.length} gerçek mekan bulundu.`);
      } else {
        setSearchStatusInfo(`Sonuç bulunamadı.`);
      }
    } catch (err) {
      console.error("Arama hatası:", err);
      setSearchStatusInfo("Arama sırasında bir hata oluştu.");
    }
    setLoading(false);
  };

  // Initial load: search for Afyonkarahisar Sandıklı pizza right away!
  useEffect(() => {
    performSearch("pizza", "Afyonkarahisar", "Sandıklı", null);
  }, []);

  // Filter effect
  useEffect(() => {
    if (!places || places.length === 0) {
      setFilteredPlaces([]);
      return;
    }

    if (activeFilter === "budget") {
      setFilteredPlaces(places.filter(p => p.priceLevel === "₺"));
    } else if (activeFilter === "work") {
      setFilteredPlaces(places.filter(p => p.isWorkFriendly));
    } else if (activeFilter === "highRating") {
      setFilteredPlaces(places.filter(p => parseFloat(p.rating) >= 4.5));
    } else {
      setFilteredPlaces(places);
    }
  }, [activeFilter, places]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    performSearch(query, selectedCity, selectedDistrict, gpsCoords);
  };

  // Quick preset click
  const handleQuickPreset = (presetQuery, presetCity, presetDistrict) => {
    setQuery(presetQuery);
    setSelectedCity(presetCity);
    setSelectedDistrict(presetDistrict);
    setGpsCoords(null);
    performSearch(presetQuery, presetCity, presetDistrict, null);
  };

  // City change handler
  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    const cityObj = turkeyCities.find(c => c.name === newCity);
    if (cityObj && cityObj.districts && cityObj.districts.length > 0) {
      setSelectedDistrict(cityObj.districts[0]);
    } else {
      setSelectedDistrict("Tümü");
    }
  };

  // GPS Location handler
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setGpsCoords({ lat, lng });

        // Reverse geocoding via Nominatim
        try {
          const revUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
          const resp = await fetch(revUrl, { headers: { "Accept-Language": "tr" } });
          if (resp.ok) {
            const data = await resp.json();
            const addr = data.address || {};
            const detectedCity = addr.province || addr.city || addr.state;
            const detectedDistrict = addr.county || addr.town || addr.suburb || addr.district;
            
            if (detectedCity) {
              const matchedCity = turkeyCities.find(c => c.name.toLowerCase().includes(detectedCity.toLowerCase()));
              if (matchedCity) {
                setSelectedCity(matchedCity.name);
                if (detectedDistrict) {
                  const matchedDistrict = matchedCity.districts.find(d => d.toLowerCase().includes(detectedDistrict.toLowerCase()));
                  if (matchedDistrict) setSelectedDistrict(matchedDistrict);
                }
              }
            }
          }
        } catch (e) {
          console.warn("Reverse geocode hatası:", e);
        }

        setLoading(false);
        performSearch(query, selectedCity, selectedDistrict, { lat, lng });
      },
      (err) => {
        console.error("GPS hatası:", err);
        alert("Konum izni alınamadı. Manuel olarak il ve ilçe seçebilirsiniz.");
        setLoading(false);
      }
    );
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="live-pulse"></span>
            81 İl & 973 İlçe Gerçek Mekan Veritabanı
          </div>
          <h1 className="hero-title">
            Ne arıyorsun? <span style={{color: "var(--primary)"}}>Nerede arıyorsun?</span>
          </h1>
          <p className="hero-subtitle">
            Herhangi bir il ve ilçedeki gerçek pizzacıları, kafeleri, mekanları güncel iletişim ve harita bilgileriyle bulun.
          </p>

          {/* Quick presets */}
          <div className="quick-presets">
            <span style={{fontSize: "0.8rem", color: "var(--text-muted)"}}>Hızlı Örnekler:</span>
            <button 
              type="button" 
              className={`preset-btn ${selectedDistrict === "Sandıklı" && query === "pizza" ? "active" : ""}`}
              onClick={() => handleQuickPreset("pizza", "Afyonkarahisar", "Sandıklı")}
            >
              🍕 Sandıklı Pizzacı
            </button>
            <button 
              type="button" 
              className={`preset-btn ${selectedDistrict === "Sandıklı" && query === "hastane" ? "active" : ""}`}
              onClick={() => handleQuickPreset("hastane", "Afyonkarahisar", "Sandıklı")}
            >
              🏥 Sandıklı Hastane
            </button>
            <button 
              type="button" 
              className={`preset-btn ${selectedDistrict === "Sandıklı" && query === "telefoncu" ? "active" : ""}`}
              onClick={() => handleQuickPreset("telefoncu", "Afyonkarahisar", "Sandıklı")}
            >
              📱 Sandıklı Telefoncu
            </button>
            <button 
              type="button" 
              className={`preset-btn ${selectedDistrict === "Sandıklı" && query === "kafe" ? "active" : ""}`}
              onClick={() => handleQuickPreset("kafe", "Afyonkarahisar", "Sandıklı")}
            >
              ☕ Sandıklı Kafe
            </button>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-field" style={{flex: "1.4"}}>
              <label className="search-label">
                <i className="ph ph-magnifying-glass"></i> Ne Arıyorsun?
              </label>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Örn: pizzacı, kafe, pideci, kütüphane, market..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <div className="search-field" style={{flex: "1"}}>
              <label className="search-label">
                <i className="ph ph-buildings"></i> İl (81 İl)
              </label>
              <select 
                className="search-select" 
                value={selectedCity} 
                onChange={(e) => handleCityChange(e.target.value)}
              >
                {turkeyCities.map(city => (
                  <option key={city.id || city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="search-field" style={{flex: "1"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                <label className="search-label">
                  <i className="ph ph-map-pin"></i> İlçe
                </label>
                <button 
                  type="button"
                  onClick={getUserLocation} 
                  className="gps-btn"
                  title="Mevcut Konumumu Bul (GPS)"
                >
                  <i className={`ph-bold ph-crosshair ${gpsCoords ? "gps-active" : ""}`}></i>
                  <span>GPS</span>
                </button>
              </div>
              <select 
                className="search-select" 
                value={selectedDistrict} 
                onChange={e => setSelectedDistrict(e.target.value)}
              >
                <option value="Tümü">Tüm İlçeler</option>
                {currentDistricts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary search-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border"></span> Aranıyor...
                </>
              ) : (
                <>
                  <i className="ph-bold ph-magnifying-glass"></i> Mekanları Bul
                </>
              )}
            </button>
          </form>

          {gpsCoords && (
            <p style={{fontSize: "0.85rem", color: "var(--primary)", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px"}}>
              <i className="ph-fill ph-check-circle"></i> GPS Konumu Algılandı: {gpsCoords.lat.toFixed(4)}, {gpsCoords.lng.toFixed(4)}
            </p>
          )}
        </div>
      </section>

      <section className="container" style={{paddingBottom: "80px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px"}}>
          <div>
            <h2 style={{fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px"}}>
              {selectedDistrict !== "Tümü" ? `${selectedDistrict}, ` : ""}{selectedCity} Sonuçları
            </h2>
            <p style={{fontSize: "0.85rem", color: "var(--text-muted)"}}>
              {searchStatusInfo || "Gerçek mekanlar listeleniyor"}
            </p>
          </div>

          <div className="filters-bar">
            <button 
              type="button"
              className={`filter-chip ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <i className="ph ph-squares-four"></i> Tümü ({places.length})
            </button>
            <button 
              type="button"
              className={`filter-chip ${activeFilter === "budget" ? "active" : ""}`}
              onClick={() => setActiveFilter("budget")}
            >
              <i className="ph ph-wallet"></i> Bütçe Dostu (₺)
            </button>
            <button 
              type="button"
              className={`filter-chip ${activeFilter === "work" ? "active" : ""}`}
              onClick={() => setActiveFilter("work")}
            >
              <i className="ph ph-laptop"></i> Çalışmaya Uygun
            </button>
            <button 
              type="button"
              className={`filter-chip ${activeFilter === "highRating" ? "active" : ""}`}
              onClick={() => setActiveFilter("highRating")}
            >
              <i className="ph ph-star"></i> 4.5+ Puan
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{textAlign: "center", padding: "60px 20px"}}>
            <div className="search-spinner"></div>
            <h3 style={{marginTop: "16px", fontSize: "1.2rem"}}>Gerçek mekan verileri taranıyor...</h3>
            <p style={{color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "6px"}}>
              {selectedDistrict !== "Tümü" ? selectedDistrict : selectedCity} bölgesindeki işletmeler analiz ediliyor.
            </p>
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="places-grid">
            {filteredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="empty-results-box animate-fade-in">
            <i className="ph ph-magnifying-glass" style={{fontSize: "3.5rem", color: "var(--text-muted)", marginBottom: "16px"}}></i>
            <h3>Sonuç Bulunamadı</h3>
            <p style={{color: "var(--text-muted)", marginTop: "8px", maxWidth: "450px", margin: "8px auto 20px auto"}}>
              "{query}" terimi için {selectedDistrict !== "Tümü" ? `${selectedDistrict}, ` : ""}{selectedCity} bölgesinde kayıt bulunamadı. Lütfen arama terimini veya ilçeyi değiştirip tekrar deneyin.
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleQuickPreset("pizza", "Afyonkarahisar", "Sandıklı")}
            >
              Sandıklı Pizzacı Örneğini Göster
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

window.Home = Home;
