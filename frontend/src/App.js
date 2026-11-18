const Header = window.Header;
const Home = window.Home;

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <footer style={{textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", borderTop: "1px solid var(--border-color)", fontSize: "0.9rem", backgroundColor: "white"}}>
        <p style={{marginBottom: "6px"}}>
          &copy; {new Date().getFullYear()} <strong>CityPulse</strong> - Türkiye 81 İl & 973 İlçe Gerçek Mekan Rehberi.
        </p>
        <p style={{fontSize: "0.8rem", color: "#94A3B8"}}>
          Canlı web verisi, Google Places API ve Foursquare desteği ile gerçek işletme bilgileri.
        </p>
      </footer>
    </>
  );
};

window.App = App;
