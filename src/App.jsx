import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MovieDetails from "./pages/Movies/MovieDetails";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import PopularActors from "./pages/Actors/Actors";
// import TestAPI from "./test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/actors" element={<PopularActors />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
