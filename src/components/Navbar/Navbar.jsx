import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMulti } from "../../util/API";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation(); // To monitor route changes

  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = (menu) => (e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Fetch suggestions after user stops typing (debounced search)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchMulti(searchQuery).then((results) => {
        // Filter out TV shows from the suggestions
        const filtered = results.filter(
          (item) => item.media_type === "movie" || item.media_type === "person"
        );
        setSuggestions(filtered);
      });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    setOpenDropdown(null); // Close dropdown on route change
  }, [location]);

  // Handle click on suggestion item
  const handleSuggestionClick = (item) => {
    setSearchQuery("");
    setShowSuggestions(false);

    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "person") {
      navigate(`/actors/${item.id}`);
    }
  };

  return (
    <div className="container">
      <div className="header-container" onClick={() => navigate("/")}>
        <h1 className="header">DB Movies</h1>
      </div>

      <div className="nav-container">
        <nav>
          <ul>
            <li className="movies">
              <a href="#" onClick={toggleDropdown("movies")}>
                Movies ▼
              </a>
              <ul
                className={
                  openDropdown === "movies"
                    ? "DropDownMenu open"
                    : "DropDownMenu"
                }
              >
                <li onClick={() => navigate("/movies/now-playing")}>
                  Now Playing
                </li>
                <li onClick={() => navigate("/movies/popular")}>Popular</li>
                <li onClick={() => navigate("/movies/top-rated")}>Top Rated</li>
                <li onClick={() => navigate("/movies/upcoming")}>Upcoming</li>
              </ul>
            </li>

            <li className="actors">
              <a href="/actors">Actors</a>
            </li>

            <li className="search-bar" style={{ position: "relative" }}>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                />
                <button type="submit">Go</button>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestion-box">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item.title || item.name}
                      <span className="suggestion-type">
                        {item.media_type === "movie"
                          ? " (Movie)"
                          : item.media_type === "person"
                          ? " (Person)"
                          : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
