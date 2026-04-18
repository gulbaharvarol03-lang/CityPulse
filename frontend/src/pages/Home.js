const { useState } = window.React;
const PlaceCard = window.PlaceCard;
const mockCities = window.mockCities;
const fetchPlaces = window.fetchPlaces;

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("İstanbul");
  const [selectedDistrict, setSelectedDistrict] = useState("Kadıköy");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gpsCoords, setGpsCoords] = useState(null); // {lat, lng} array/object
  
  const selectedCityData = mockCities.find(c => c.name === selectedCity) || mockCities[0];
  const currentDistricts = selectedCityData.districts || [];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Pass coordinates if GPS was used, otherwise null
      let results;
      if (gpsCoords) {
        results = await fetchPlaces(query, null, null, gpsCoords.lat, gpsCoords.lng);
      } else {
        results = await fetchPlaces(query, selectedCity, selectedDistrict, null, null);
      }
      setPlaces(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSelectedCity("Tümü");
          setSelectedDistrict("Tümü");
          setLoading(false);
          alert(`Harika! Konumunuz alındı. Seçtiğiniz alanlar devre dışı bırakıldı, artık arama sonuçları bulunduğunuz yere göre getirilecek (Gerçek API aktifse).`);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Konum izni alınamadı (veya tarayıcınız engelledi), lütfen listelerden manuel seçiniz.");
          setGpsCoords(null);
          setLoading(false);
        }
      );
    } else {
      alert("Tarayıcınız konum özelliğini desteklemiyor.");
    }
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Ne arıyorsun? <span style={{color: 'var(--primary)'}}>Nerede arıyorsun?</span></h1>
          <p className="hero-subtitle">
            {window.FOURSQUARE_API_KEY ? 
              "Gerçek Veri Modu Aktif! Etrafınızdaki binlerce noktayı anında keşfedin." : 
              "Öğrenci dostu mekan rehberi (Şu an Demo/Mock Veri sürümündesiniz)."
            }
          </p>
          
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-field" style={{flex: '1.5'}}>
              <label className="search-label">Ne Arıyorsun?</label>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Örn: pizzacı, kafe, kütüphane, market..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            
            <div className="search-field" style={{flex: '1', opacity: gpsCoords ? 0.5 : 1}}>
              <label className="search-label">İl</label>
              <select className="search-select" value={selectedCity} disabled={gpsCoords !== null} onChange={(e) => { setSelectedCity(e.target.value); if(e.target.value !== "Tümü") setSelectedDistrict(mockCities.find(c => c.name === e.target.value).districts[0]); }}>
                <option value="Tümü">Tüm İller</option>
                {mockCities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="search-field" style={{flex: '1', opacity: gpsCoords ? 0.5 : 1}}>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                 <label className="search-label">İlçe</label>
                 <i onClick={getUserLocation} className={`ph-fill ph-crosshair ${gpsCoords ? '' : 'ph'}`} style={{cursor: 'pointer', color: gpsCoords ? 'var(--secondary)' : 'var(--primary)', fontSize: '1.2rem'}} title={gpsCoords ? "Konum Açık" : "Konumumu Bul"}></i>
              </div>
              <select className="search-select" value={selectedDistrict} disabled={gpsCoords !== null} onChange={e => setSelectedDistrict(e.target.value)}>
                <option value="Tümü">Tüm İlçeler</option>
                {!gpsCoords && currentDistricts && currentDistricts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary search-submit" disabled={loading}>
               {loading ? 'Aranıyor...' : <><i className="ph ph-magnifying-glass"></i> Ara</>}
            </button>
          </form>
          {gpsCoords && <p style={{fontSize:'0.85rem', color: 'var(--secondary)', marginTop: '8px'}}><i className="ph ph-check-circle"></i> GPS ile arama yapılacak.</p>}
        </div>
      </section>

      <section className="container" style={{paddingBottom: '60px'}}>
        {places.length > 0 ? (
          <>
            <h2 style={{marginBottom: '16px'}}>Popüler Sonuçlar {gpsCoords ? "(Yakınınızda)" : ""}</h2>
            <div className="filters-bar">
               <button className="filter-chip active"><i className="ph ph-trend-up"></i> Tümü</button>
               <button className="filter-chip"><i className="ph ph-wallet"></i> Bütçe Dostu (₺)</button>
               <button className="filter-chip"><i className="ph ph-laptop"></i> Çalışmaya Uygun</button>
            </div>
            <div className="places-grid">
              {places.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </>
        ) : (
          query && !loading && (
             <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
                <i className="ph ph-ghost" style={{fontSize: '3rem', marginBottom: '16px'}}></i>
                <h3>Sonuç bulunamadı</h3>
                <p>Başka bir arama terimi veya konum deneyin.</p>
             </div>
          )
        )}
      </section>
    </main>
  );
};
window.Home = Home;
