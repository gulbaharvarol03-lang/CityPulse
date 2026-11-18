const { useState, useEffect } = window.React;
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
      if (config.provider === "google") setProviderName("Google Places");
      else if (config.provider === "foursquare") setProviderName("Foursquare");
      else setProviderName("Canlı Gerçek Veri");
    }
  };

  useEffect(() => {
    updateProviderLabel();
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="container header-content">
          <div className="logo" style={{cursor: "pointer"}} onClick={() => window.location.reload()}>
            <i className="ph-fill ph-buildings" style={{color: "var(--primary)", fontSize: "1.6rem"}}></i>
            <span>CityPulse</span>
          </div>

          <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
            <button 
              className="provider-badge-btn" 
              onClick={() => setIsSettingsOpen(true)}
              title="Veri Kaynağı ve API Ayarlarını Değiştir"
            >
              <span className="live-dot"></span>
              <span style={{fontSize: "0.85rem", fontWeight: "500"}}>{providerName}</span>
              <i className="ph ph-sliders" style={{fontSize: "1rem"}}></i>
            </button>

            <nav>
              {user ? (
                <div className="user-profile">
                  <i className="ph-fill ph-user-circle" style={{fontSize: "1.3rem", color: "var(--primary)"}}></i>
                  <span>Merhaba, {user.name}</span>
                </div>
              ) : (
                <button className="btn btn-secondary" onClick={() => setIsLoginOpen(true)}>
                  <i className="ph ph-user"></i> Giriş Yap
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={(userData) => setUser(userData)} 
      />

      <ApiSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onSave={() => updateProviderLabel()} 
      />
    </>
  );
};

window.Header = Header;
