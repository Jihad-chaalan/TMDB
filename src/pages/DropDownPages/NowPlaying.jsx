import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../../util/API";
import { useNavigate } from "react-router-dom";
import "./NowPlaying.css";

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNowPlaying()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="now-playing-container">
      <h2>Now Playing Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
