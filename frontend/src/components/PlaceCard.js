const PlaceCard = ({ place }) => {
  const mapsSearchUrl = place.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + (place.address || ""))}`;

  return (
    <div className="card animate-fade-in place-card">
      <div className="place-img-wrapper">
        <img src={place.image} alt={place.name} className="place-img" loading="lazy" />
        
        {place.isWorkFriendly && (
          <div className="badge work">
             <i className="ph ph-laptop"></i> Çalışmaya Uygun
          </div>
        )}

        <div className="badge real-data">
          <i className="ph-fill ph-check-circle"></i> Gerçek Veri
        </div>
      </div>

      <div className="place-info">
        <div className="place-header">
          <h3 className="place-title" title={place.name}>{place.name}</h3>
          <div className="place-rating" title="Kullanıcı Puanı">
            <i className="ph-fill ph-star" style={{color: "#FFB800"}}></i>
            <span>{place.rating || "4.5"}</span>
            {place.reviewCount && (
              <span style={{fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "2px"}}>
                ({place.reviewCount})
              </span>
            )}
          </div>
        </div>

        <div className="place-meta">
          <span className="place-category">{place.type ? place.type.charAt(0).toUpperCase() + place.type.slice(1) : "Mekan"}</span>
          <span>•</span>
          <span>{place.distanceKm ? `${place.distanceKm} km` : "Yakında"}</span>
          <span>•</span>
          <span style={{color: "var(--primary)", fontWeight: "600"}}>{place.priceLevel || "₺₺"}</span>
        </div>

        <p className="place-address" title={place.address}>
          <i className="ph ph-map-pin" style={{color: "var(--text-muted)", marginRight: "4px"}}></i>
          {place.address}
        </p>

        {place.phone && (
          <p style={{fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px"}}>
            <i className="ph ph-phone" style={{marginRight: "4px"}}></i>
            <a href={`tel:${place.phone.replace(/\s+/g, '')}`} style={{color: "inherit", textDecoration: "none"}}>
              {place.phone}
            </a>
          </p>
        )}

        {place.offersMenu && place.menu && place.menu.length > 0 && (
          <div className="place-menu-box">
            <p style={{fontSize: "0.75rem", fontWeight: "700", marginBottom: "6px", color: "var(--text-main)"}}>
              <i className="ph ph-fork-knife" style={{marginRight: "4px"}}></i> Öne Çıkan Menü:
            </p>
            <ul style={{fontSize: "0.75rem", color: "var(--text-muted)", paddingLeft: "16px", margin: 0}}>
              {place.menu.map((item, idx) => (
                <li key={idx} style={{marginBottom: "3px"}}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="card-actions">
          <a 
            href={mapsSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-maps"
          >
            <i className="ph ph-arrow-square-out"></i> Haritada Gör
          </a>
          {place.phone && (
            <a 
              href={`tel:${place.phone.replace(/\s+/g, '')}`} 
              className="btn btn-outline-call"
              title="Telefon ile Ara"
            >
              <i className="ph ph-phone-call"></i> Ara
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

window.PlaceCard = PlaceCard;
