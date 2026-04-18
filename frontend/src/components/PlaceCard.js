const PlaceCard = ({ place }) => {
  return (
    <div className="card animate-fade-in">
      <div className="place-img-wrapper">
        <img src={place.image} alt={place.name} className="place-img" />
        {place.isWorkFriendly && (
          <div className="badge work">
             <i className="ph ph-laptop"></i> Çalışmaya Uygun
          </div>
        )}
      </div>
      <div className="place-info">
        <div className="place-header">
          <h3 className="place-title">{place.name}</h3>
          <div className="place-rating">
            <i className="ph-fill ph-star" style={{color: '#FFB800'}}></i>
            {place.rating}
          </div>
        </div>
        <div className="place-meta">
          <span>{place.type.charAt(0).toUpperCase() + place.type.slice(1)}</span>
          <span>•</span>
          <span>{place.distanceKm} km yakında</span>
          <span>•</span>
          <span style={{color: 'var(--secondary)', fontWeight: '600'}}>{place.priceLevel}</span>
        </div>
        <p style={{fontSize: '0.85rem', marginBottom: '12px'}}>{place.address}</p>
        
        {place.offersMenu && place.menu && (
          <div style={{marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px'}}>
            <p style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px'}}>Örnek Menü:</p>
            <ul style={{fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '16px'}}>
              {place.menu.map((item, idx) => (
                <li key={idx} style={{marginBottom: '4px'}}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
window.PlaceCard = PlaceCard;
