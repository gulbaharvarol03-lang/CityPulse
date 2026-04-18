const { useState } = window.React;
const LoginModal = window.LoginModal;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">
            <i className="ph ph-buildings"></i>
            CityPulse
          </div>
          <nav>
            {user ? (
              <div className="user-profile">
                <i className="ph ph-user-circle" style={{fontSize: '1.2rem', color: 'var(--primary)'}}></i>
                <span>Merhaba, {user.name}</span>
              </div>
            ) : (
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                <i className="ph ph-user"></i> Giriş Yap
              </button>
            )}
          </nav>
        </div>
      </header>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={(userData) => setUser(userData)} 
      />
    </>
  );
};
window.Header = Header;
