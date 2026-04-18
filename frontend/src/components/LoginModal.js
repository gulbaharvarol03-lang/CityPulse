const { useState } = window.React;

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      onLogin({ email, name: email.split('@')[0] });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-input" 
              placeholder="E-posta" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-input" 
              placeholder="Şifre" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Giriş Yap</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
          Hesabınız yok mu? <a href="#" style={{color: 'var(--primary)'}}>Kayıt Ol</a>
        </p>
      </div>
    </div>
  );
};

window.LoginModal = LoginModal;
