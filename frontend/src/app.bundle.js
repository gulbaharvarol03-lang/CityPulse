// CityPulse Pre-compiled Application Bundle (Classic UMD)
var React = window.React;
var ReactDOM = window.ReactDOM;

// --- LoginModal.js ---
(function () {
  const {
    useState
  } = window.React;
  const LoginModal = ({
    isOpen,
    onClose,
    onLogin
  }) => {
    if (!isOpen) return null;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = e => {
      e.preventDefault();
      // Simulate login
      if (email && password) {
        onLogin({
          email,
          name: email.split('@')[0]
        });
        onClose();
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      className: "modal-close",
      onClick: onClose
    }, "×"), /*#__PURE__*/React.createElement("h2", {
      className: "modal-title"
    }, "Giriş Yap"), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "email",
      className: "form-input",
      placeholder: "E-posta",
      value: email,
      onChange: e => setEmail(e.target.value),
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "password",
      className: "form-input",
      placeholder: "Şifre",
      value: password,
      onChange: e => setPassword(e.target.value),
      required: true
    })), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary btn-block"
    }, "Giriş Yap")), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
      }
    }, "Hesabınız yok mu? ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: 'var(--primary)'
      }
    }, "Kayıt Ol"))));
  };
  window.LoginModal = LoginModal;
})();

// --- ApiSettingsModal.js ---
(function () {
  const {
    useState,
    useEffect
  } = window.React;
  const ApiSettingsModal = ({
    isOpen,
    onClose,
    onSave
  }) => {
    const [provider, setProvider] = useState("live");
    const [googleKey, setGoogleKey] = useState("");
    const [fsqKey, setFsqKey] = useState("");
    const [savedSuccess, setSavedSuccess] = useState(false);
    useEffect(() => {
      if (isOpen && window.getProviderConfig) {
        const config = window.getProviderConfig();
        setProvider(config.provider || "live");
        setGoogleKey(config.googleApiKey || "");
        setFsqKey(config.fsqApiKey || "");
        setSavedSuccess(false);
      }
    }, [isOpen]);
    if (!isOpen) return null;
    const handleSave = e => {
      e.preventDefault();
      if (window.setProviderConfig) {
        window.setProviderConfig(provider, googleKey, fsqKey);
      }
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        if (onSave) onSave({
          provider,
          googleKey,
          fsqKey
        });
        onClose();
      }, 900);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-backdrop animate-fade-in",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-card settings-modal animate-scale-up",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-sliders",
      style: {
        fontSize: "1.5rem",
        color: "var(--primary)"
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "modal-title"
    }, "Veri Kaynağı ve API Ayarları"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)"
      }
    }, "Gerçek mekan verilerinin çekileceği sağlayıcıyı seçin."))), /*#__PURE__*/React.createElement("button", {
      className: "btn-close",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-x"
    }))), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSave,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "provider-options"
    }, /*#__PURE__*/React.createElement("label", {
      className: `provider-card ${provider === "live" ? "active" : ""}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "provider",
      value: "live",
      checked: provider === "live",
      onChange: () => setProvider("live")
    }), /*#__PURE__*/React.createElement("div", {
      className: "provider-info"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "600"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-broadcast",
      style: {
        color: "var(--primary)"
      }
    }), "Canlı Gerçek Arama Motoru (Önerilen)"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginTop: "4px"
      }
    }, "Ücretsiz ve sıfır kurulum! Türkiye'nin 81 il ve 973 ilçesindeki (Afyonkarahisar Sandıklı dahil) tüm gerçek mekanları otomatik bulur."))), /*#__PURE__*/React.createElement("label", {
      className: `provider-card ${provider === "google" ? "active" : ""}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "provider",
      value: "google",
      checked: provider === "google",
      onChange: () => setProvider("google")
    }), /*#__PURE__*/React.createElement("div", {
      className: "provider-info"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "600"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-map-pin",
      style: {
        color: "#4285F4"
      }
    }), "Google Places API (Google Haritalar)"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginTop: "4px"
      }
    }, "En kapsamlı resmi Google Haritalar verisi. Kendi Google Cloud API anahtarınızı girerek doğrudan Google verilerine erişebilirsiniz."))), /*#__PURE__*/React.createElement("label", {
      className: `provider-card ${provider === "foursquare" ? "active" : ""}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "provider",
      value: "foursquare",
      checked: provider === "foursquare",
      onChange: () => setProvider("foursquare")
    }), /*#__PURE__*/React.createElement("div", {
      className: "provider-info"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "600"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-navigation-arrow",
      style: {
        color: "#F94877"
      }
    }), "Foursquare Places API (Yeni 2026 Sürümü)"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginTop: "4px"
      }
    }, "Foursquare Geliştirici anahtarınızı kullanarak FSQ OS küresel mekan veritabanına bağlanır.")))), provider === "google" && /*#__PURE__*/React.createElement("div", {
      className: "form-group animate-fade-in"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: "0.85rem",
        fontWeight: "600"
      }
    }, "Google Maps API Anahtarı"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      className: "input-field",
      placeholder: "AIzaSy...",
      value: googleKey,
      onChange: e => setGoogleKey(e.target.value)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.75rem",
        color: "var(--text-muted)"
      }
    }, "Anahtar tarayıcınızın yerel depolama alanında (localStorage) güvenle saklanır.")), provider === "foursquare" && /*#__PURE__*/React.createElement("div", {
      className: "form-group animate-fade-in"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: "0.85rem",
        fontWeight: "600"
      }
    }, "Foursquare API Anahtarı (FSQ OS)"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      className: "input-field",
      placeholder: "fsq3...",
      value: fsqKey,
      onChange: e => setFsqKey(e.target.value)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.75rem",
        color: "var(--text-muted)"
      }
    }, "X-Places-Api-Version 2025-06-17 protokolü ile çağrılır.")), savedSuccess && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        border: "1px solid var(--primary)",
        borderRadius: "8px",
        color: "var(--primary)",
        fontSize: "0.85rem",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-check-circle"
    }), " Ayarlar başarıyla kaydedildi!"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "8px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: onClose
    }, "Kapat"), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-check"
    }), " Kaydet ve Uygula")))));
  };
  window.ApiSettingsModal = ApiSettingsModal;
})();

// --- Header.js ---
(function () {
  const {
    useState,
    useEffect
  } = window.React;
  const LoginModal = window.LoginModal;
  const ApiSettingsModal = window.ApiSettingsModal;
  const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [providerName, setProviderName] = useState("Canlı Gerçek Veri");
    const updateProviderLabel = () => {
      if (window.getProviderConfig) {
        const config = window.getProviderConfig();
        if (config.provider === "google") setProviderName("Google Places");else if (config.provider === "foursquare") setProviderName("Foursquare");else setProviderName("Canlı Gerçek Veri");
      }
    };
    useEffect(() => {
      updateProviderLabel();
    }, []);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "app-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container header-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo",
      style: {
        cursor: "pointer"
      },
      onClick: () => window.location.reload()
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-buildings",
      style: {
        color: "var(--primary)",
        fontSize: "1.6rem"
      }
    }), /*#__PURE__*/React.createElement("span", null, "CityPulse")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "provider-badge-btn",
      onClick: () => setIsSettingsOpen(true),
      title: "Veri Kaynağı ve API Ayarlarını Değiştir"
    }, /*#__PURE__*/React.createElement("span", {
      className: "live-dot"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.85rem",
        fontWeight: "500"
      }
    }, providerName), /*#__PURE__*/React.createElement("i", {
      className: "ph ph-sliders",
      style: {
        fontSize: "1rem"
      }
    })), /*#__PURE__*/React.createElement("nav", null, user ? /*#__PURE__*/React.createElement("div", {
      className: "user-profile"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-user-circle",
      style: {
        fontSize: "1.3rem",
        color: "var(--primary)"
      }
    }), /*#__PURE__*/React.createElement("span", null, "Merhaba, ", user.name)) : /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      onClick: () => setIsLoginOpen(true)
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-user"
    }), " Giriş Yap"))))), /*#__PURE__*/React.createElement(LoginModal, {
      isOpen: isLoginOpen,
      onClose: () => setIsLoginOpen(false),
      onLogin: userData => setUser(userData)
    }), /*#__PURE__*/React.createElement(ApiSettingsModal, {
      isOpen: isSettingsOpen,
      onClose: () => setIsSettingsOpen(false),
      onSave: () => updateProviderLabel()
    }));
  };
  window.Header = Header;
})();

// --- PlaceCard.js ---
(function () {
  const PlaceCard = ({
    place
  }) => {
    const mapsSearchUrl = place.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + (place.address || ""))}`;
    return /*#__PURE__*/React.createElement("div", {
      className: "card animate-fade-in place-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "place-img-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: place.image,
      alt: place.name,
      className: "place-img",
      loading: "lazy"
    }), place.isWorkFriendly && /*#__PURE__*/React.createElement("div", {
      className: "badge work"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-laptop"
    }), " Çalışmaya Uygun"), /*#__PURE__*/React.createElement("div", {
      className: "badge real-data"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-check-circle"
    }), " Gerçek Veri")), /*#__PURE__*/React.createElement("div", {
      className: "place-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "place-header"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "place-title",
      title: place.name
    }, place.name), /*#__PURE__*/React.createElement("div", {
      className: "place-rating",
      title: "Kullanıcı Puanı"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-star",
      style: {
        color: "#FFB800"
      }
    }), /*#__PURE__*/React.createElement("span", null, place.rating || "4.5"), place.reviewCount && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        marginLeft: "2px"
      }
    }, "(", place.reviewCount, ")"))), /*#__PURE__*/React.createElement("div", {
      className: "place-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "place-category"
    }, place.type ? place.type.charAt(0).toUpperCase() + place.type.slice(1) : "Mekan"), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("span", null, place.distanceKm ? `${place.distanceKm} km` : "Yakında"), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--primary)",
        fontWeight: "600"
      }
    }, place.priceLevel || "₺₺")), /*#__PURE__*/React.createElement("p", {
      className: "place-address",
      title: place.address
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-map-pin",
      style: {
        color: "var(--text-muted)",
        marginRight: "4px"
      }
    }), place.address), place.phone && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginBottom: "8px"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-phone",
      style: {
        marginRight: "4px"
      }
    }), /*#__PURE__*/React.createElement("a", {
      href: `tel:${place.phone.replace(/\s+/g, '')}`,
      style: {
        color: "inherit",
        textDecoration: "none"
      }
    }, place.phone)), place.offersMenu && place.menu && place.menu.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "place-menu-box"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.75rem",
        fontWeight: "700",
        marginBottom: "6px",
        color: "var(--text-main)"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-fork-knife",
      style: {
        marginRight: "4px"
      }
    }), " Öne Çıkan Menü:"), /*#__PURE__*/React.createElement("ul", {
      style: {
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        paddingLeft: "16px",
        margin: 0
      }
    }, place.menu.map((item, idx) => /*#__PURE__*/React.createElement("li", {
      key: idx,
      style: {
        marginBottom: "3px"
      }
    }, item)))), /*#__PURE__*/React.createElement("div", {
      className: "card-actions"
    }, /*#__PURE__*/React.createElement("a", {
      href: mapsSearchUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn btn-outline-maps"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-arrow-square-out"
    }), " Haritada Gör"), place.phone && /*#__PURE__*/React.createElement("a", {
      href: `tel:${place.phone.replace(/\s+/g, '')}`,
      className: "btn btn-outline-call",
      title: "Telefon ile Ara"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-phone-call"
    }), " Ara"))));
  };
  window.PlaceCard = PlaceCard;
})();

// --- Home.js ---
(function () {
  const {
    useState,
    useEffect
  } = window.React;
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
    const currentCityObj = turkeyCities.find(c => c.name.toLowerCase() === selectedCity.toLowerCase()) || turkeyCities[0] || {
      name: "Afyonkarahisar",
      districts: []
    };
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
    const handleSearch = e => {
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
    const handleCityChange = newCity => {
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
      navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setGpsCoords({
          lat,
          lng
        });

        // Reverse geocoding via Nominatim
        try {
          const revUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
          const resp = await fetch(revUrl, {
            headers: {
              "Accept-Language": "tr"
            }
          });
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
        performSearch(query, selectedCity, selectedDistrict, {
          lat,
          lng
        });
      }, err => {
        console.error("GPS hatası:", err);
        alert("Konum izni alınamadı. Manuel olarak il ve ilçe seçebilirsiniz.");
        setLoading(false);
      });
    };
    return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
      className: "hero-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-badge"
    }, /*#__PURE__*/React.createElement("span", {
      className: "live-pulse"
    }), "81 İl & 973 İlçe Gerçek Mekan Veritabanı"), /*#__PURE__*/React.createElement("h1", {
      className: "hero-title"
    }, "Ne arıyorsun? ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--primary)"
      }
    }, "Nerede arıyorsun?")), /*#__PURE__*/React.createElement("p", {
      className: "hero-subtitle"
    }, "Herhangi bir il ve ilçedeki gerçek pizzacıları, kafeleri, mekanları güncel iletişim ve harita bilgileriyle bulun."), /*#__PURE__*/React.createElement("div", {
      className: "quick-presets"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.8rem",
        color: "var(--text-muted)"
      }
    }, "Hızlı Örnekler:"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `preset-btn ${selectedDistrict === "Sandıklı" && query === "pizza" ? "active" : ""}`,
      onClick: () => handleQuickPreset("pizza", "Afyonkarahisar", "Sandıklı")
    }, "🍕 Sandıklı Pizzacı"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `preset-btn ${selectedDistrict === "Sandıklı" && query === "hastane" ? "active" : ""}`,
      onClick: () => handleQuickPreset("hastane", "Afyonkarahisar", "Sandıklı")
    }, "🏥 Sandıklı Hastane"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `preset-btn ${selectedDistrict === "Sandıklı" && query === "telefoncu" ? "active" : ""}`,
      onClick: () => handleQuickPreset("telefoncu", "Afyonkarahisar", "Sandıklı")
    }, "📱 Sandıklı Telefoncu"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `preset-btn ${selectedDistrict === "Sandıklı" && query === "kafe" ? "active" : ""}`,
      onClick: () => handleQuickPreset("kafe", "Afyonkarahisar", "Sandıklı")
    }, "☕ Sandıklı Kafe")), /*#__PURE__*/React.createElement("form", {
      className: "search-form",
      onSubmit: handleSearch
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-field",
      style: {
        flex: "1.4"
      }
    }, /*#__PURE__*/React.createElement("label", {
      className: "search-label"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-magnifying-glass"
    }), " Ne Arıyorsun?"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "search-input",
      placeholder: "Örn: pizzacı, kafe, pideci, kütüphane, market...",
      value: query,
      onChange: e => setQuery(e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "search-field",
      style: {
        flex: "1"
      }
    }, /*#__PURE__*/React.createElement("label", {
      className: "search-label"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-buildings"
    }), " İl (81 İl)"), /*#__PURE__*/React.createElement("select", {
      className: "search-select",
      value: selectedCity,
      onChange: e => handleCityChange(e.target.value)
    }, turkeyCities.map(city => /*#__PURE__*/React.createElement("option", {
      key: city.id || city.name,
      value: city.name
    }, city.name)))), /*#__PURE__*/React.createElement("div", {
      className: "search-field",
      style: {
        flex: "1"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("label", {
      className: "search-label"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-map-pin"
    }), " İlçe"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: getUserLocation,
      className: "gps-btn",
      title: "Mevcut Konumumu Bul (GPS)"
    }, /*#__PURE__*/React.createElement("i", {
      className: `ph-bold ph-crosshair ${gpsCoords ? "gps-active" : ""}`
    }), /*#__PURE__*/React.createElement("span", null, "GPS"))), /*#__PURE__*/React.createElement("select", {
      className: "search-select",
      value: selectedDistrict,
      onChange: e => setSelectedDistrict(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "Tümü"
    }, "Tüm İlçeler"), currentDistricts.map(dist => /*#__PURE__*/React.createElement("option", {
      key: dist,
      value: dist
    }, dist)))), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary search-submit",
      disabled: loading
    }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "spinner-border"
    }), " Aranıyor...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
      className: "ph-bold ph-magnifying-glass"
    }), " Mekanları Bul"))), gpsCoords && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.85rem",
        color: "var(--primary)",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph-fill ph-check-circle"
    }), " GPS Konumu Algılandı: ", gpsCoords.lat.toFixed(4), ", ", gpsCoords.lng.toFixed(4)))), /*#__PURE__*/React.createElement("section", {
      className: "container",
      style: {
        paddingBottom: "80px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "20px"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "1.5rem",
        fontWeight: "700",
        marginBottom: "4px"
      }
    }, selectedDistrict !== "Tümü" ? `${selectedDistrict}, ` : "", selectedCity, " Sonuçları"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.85rem",
        color: "var(--text-muted)"
      }
    }, searchStatusInfo || "Gerçek mekanlar listeleniyor")), /*#__PURE__*/React.createElement("div", {
      className: "filters-bar"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `filter-chip ${activeFilter === "all" ? "active" : ""}`,
      onClick: () => setActiveFilter("all")
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-squares-four"
    }), " Tümü (", places.length, ")"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `filter-chip ${activeFilter === "budget" ? "active" : ""}`,
      onClick: () => setActiveFilter("budget")
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-wallet"
    }), " Bütçe Dostu (₺)"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `filter-chip ${activeFilter === "work" ? "active" : ""}`,
      onClick: () => setActiveFilter("work")
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-laptop"
    }), " Çalışmaya Uygun"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `filter-chip ${activeFilter === "highRating" ? "active" : ""}`,
      onClick: () => setActiveFilter("highRating")
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-star"
    }), " 4.5+ Puan"))), loading ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "60px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-spinner"
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        marginTop: "16px",
        fontSize: "1.2rem"
      }
    }, "Gerçek mekan verileri taranıyor..."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        marginTop: "6px"
      }
    }, selectedDistrict !== "Tümü" ? selectedDistrict : selectedCity, " bölgesindeki işletmeler analiz ediliyor.")) : filteredPlaces.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "places-grid"
    }, filteredPlaces.map(place => /*#__PURE__*/React.createElement(PlaceCard, {
      key: place.id,
      place: place
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "empty-results-box animate-fade-in"
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph ph-magnifying-glass",
      style: {
        fontSize: "3.5rem",
        color: "var(--text-muted)",
        marginBottom: "16px"
      }
    }), /*#__PURE__*/React.createElement("h3", null, "Sonuç Bulunamadı"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        marginTop: "8px",
        maxWidth: "450px",
        margin: "8px auto 20px auto"
      }
    }, "\"", query, "\" terimi için ", selectedDistrict !== "Tümü" ? `${selectedDistrict}, ` : "", selectedCity, " bölgesinde kayıt bulunamadı. Lütfen arama terimini veya ilçeyi değiştirip tekrar deneyin."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      onClick: () => handleQuickPreset("pizza", "Afyonkarahisar", "Sandıklı")
    }, "Sandıklı Pizzacı Örneğini Göster"))));
  };
  window.Home = Home;
})();

// --- App.js ---
(function () {
  const Header = window.Header;
  const Home = window.Home;
  const App = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Home, null), /*#__PURE__*/React.createElement("footer", {
      style: {
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border-color)",
        fontSize: "0.9rem",
        backgroundColor: "white"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        marginBottom: "6px"
      }
    }, "© ", new Date().getFullYear(), " ", /*#__PURE__*/React.createElement("strong", null, "CityPulse"), " - Türkiye 81 İl & 973 İlçe Gerçek Mekan Rehberi."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "0.8rem",
        color: "#94A3B8"
      }
    }, "Canlı web verisi, Google Places API ve Foursquare desteği ile gerçek işletme bilgileri.")));
  };
  window.App = App;
})();
