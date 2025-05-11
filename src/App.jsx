import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MovieDetails from "./pages/Movies/MovieDetails";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import PopularActors from "./pages/Actors/Actors";
import ActorDetails from "./pages/ActorDetails/ActorDetails";
import Popular from "./pages/DropDownPages/Popular";
import NowPlaying from "./pages/DropDownPages/NowPlaying";
import TopRated from "./pages/DropDownPages/TopRated";
import Upcoming from "./pages/DropDownPages/Upcoming";
// import TestAPI from "./test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/actors" element={<PopularActors />} />
        <Route path="/actors/:id" element={<ActorDetails />} />
        <Route path="/movies/now-playing" element={<NowPlaying />} />
        <Route path="/movies/popular" element={<Popular />} />
        <Route path="/movies/top-rated" element={<TopRated />} />
        <Route path="/movies/upcoming" element={<Upcoming />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
