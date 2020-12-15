import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/navbar";
import Welcome from "./components/welcome";
import LatestReleses from "./components/latestReleses";
import Footer from "./components/footer";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Welcome />
      <LatestReleses />
      <Footer />
    </div>
  );
}

export default App;
