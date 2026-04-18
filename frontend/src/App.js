const Header = window.Header;
const Home = window.Home;

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <footer style={{textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem'}}>
        &copy; {new Date().getFullYear()} CityPulse. Öğrenci dostu mekan rehberi.
      </footer>
    </>
  );
};
window.App = App;
