import { useEffect, useState } from "react";
import { fetchUpcoming } from "../../util/API";
import { useNavigate } from "react-router-dom";
import "./Upcoming.css";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcoming()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch upcoming movies");
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
    <div className="upcoming-container">
      <h2>Upcoming Movies</h2>
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
