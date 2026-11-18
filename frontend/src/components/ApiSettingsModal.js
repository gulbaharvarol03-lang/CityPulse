const { useState, useEffect } = window.React;

const ApiSettingsModal = ({ isOpen, onClose, onSave }) => {
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

  const handleSave = (e) => {
    e.preventDefault();
    if (window.setProviderConfig) {
      window.setProviderConfig(provider, googleKey, fsqKey);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onSave) onSave({ provider, googleKey, fsqKey });
      onClose();
    }, 900);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-card settings-modal animate-scale-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <i className="ph ph-sliders" style={{fontSize: "1.5rem", color: "var(--primary)"}}></i>
            <div>
              <h2 className="modal-title">Veri Kaynağı ve API Ayarları</h2>
              <p style={{fontSize: "0.8rem", color: "var(--text-muted)"}}>Gerçek mekan verilerinin çekileceği sağlayıcıyı seçin.</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>
            <i className="ph ph-x"></i>
          </button>
        </div>

        <form onSubmit={handleSave} style={{display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px"}}>
          <div className="provider-options">
            <label className={`provider-card ${provider === "live" ? "active" : ""}`}>
              <input 
                type="radio" 
                name="provider" 
                value="live" 
                checked={provider === "live"} 
                onChange={() => setProvider("live")} 
              />
              <div className="provider-info">
                <div style={{display: "flex", alignItems: "center", gap: "8px", fontWeight: "600"}}>
                  <i className="ph-fill ph-broadcast" style={{color: "var(--primary)"}}></i>
                  Canlı Gerçek Arama Motoru (Önerilen)
                </div>
                <p style={{fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px"}}>
                  Ücretsiz ve sıfır kurulum! Türkiye'nin 81 il ve 973 ilçesindeki (Afyonkarahisar Sandıklı dahil) tüm gerçek mekanları otomatik bulur.
                </p>
              </div>
            </label>

            <label className={`provider-card ${provider === "google" ? "active" : ""}`}>
              <input 
                type="radio" 
                name="provider" 
                value="google" 
                checked={provider === "google"} 
                onChange={() => setProvider("google")} 
              />
              <div className="provider-info">
                <div style={{display: "flex", alignItems: "center", gap: "8px", fontWeight: "600"}}>
                  <i className="ph-fill ph-map-pin" style={{color: "#4285F4"}}></i>
                  Google Places API (Google Haritalar)
                </div>
                <p style={{fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px"}}>
                  En kapsamlı resmi Google Haritalar verisi. Kendi Google Cloud API anahtarınızı girerek doğrudan Google verilerine erişebilirsiniz.
                </p>
              </div>
            </label>

            <label className={`provider-card ${provider === "foursquare" ? "active" : ""}`}>
              <input 
                type="radio" 
                name="provider" 
                value="foursquare" 
                checked={provider === "foursquare"} 
                onChange={() => setProvider("foursquare")} 
              />
              <div className="provider-info">
                <div style={{display: "flex", alignItems: "center", gap: "8px", fontWeight: "600"}}>
                  <i className="ph-fill ph-navigation-arrow" style={{color: "#F94877"}}></i>
                  Foursquare Places API (Yeni 2026 Sürümü)
                </div>
                <p style={{fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px"}}>
                  Foursquare Geliştirici anahtarınızı kullanarak FSQ OS küresel mekan veritabanına bağlanır.
                </p>
              </div>
            </label>
          </div>

          {provider === "google" && (
            <div className="form-group animate-fade-in">
              <label style={{fontSize: "0.85rem", fontWeight: "600"}}>Google Maps API Anahtarı</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="AIzaSy..." 
                value={googleKey} 
                onChange={e => setGoogleKey(e.target.value)} 
              />
              <span style={{fontSize: "0.75rem", color: "var(--text-muted)"}}>Anahtar tarayıcınızın yerel depolama alanında (localStorage) güvenle saklanır.</span>
            </div>
          )}

          {provider === "foursquare" && (
            <div className="form-group animate-fade-in">
              <label style={{fontSize: "0.85rem", fontWeight: "600"}}>Foursquare API Anahtarı (FSQ OS)</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="fsq3..." 
                value={fsqKey} 
                onChange={e => setFsqKey(e.target.value)} 
              />
              <span style={{fontSize: "0.75rem", color: "var(--text-muted)"}}>X-Places-Api-Version 2025-06-17 protokolü ile çağrılır.</span>
            </div>
          )}

          {savedSuccess && (
            <div style={{padding: "10px", backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid var(--primary)", borderRadius: "8px", color: "var(--primary)", fontSize: "0.85rem", textAlign: "center"}}>
              <i className="ph-fill ph-check-circle"></i> Ayarlar başarıyla kaydedildi!
            </div>
          )}

          <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px"}}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Kapat
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="ph ph-check"></i> Kaydet ve Uygula
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.ApiSettingsModal = ApiSettingsModal;

