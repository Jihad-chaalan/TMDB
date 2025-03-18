import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = (menu) => (e) => {
    e.preventDefault(); // Prevent unwanted behavior
    setOpenDropdown(openDropdown === menu ? null : menu); // Toggle only the clicked dropdown
  };

  return (
    <>
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
                {/* DropDown Menu */}
                <ul
                  className={
                    openDropdown === "movies"
                      ? "DropDownMenu open"
                      : "DropDownMenu"
                  }
                >
                  <li>
                    <a href="">Now Playing</a>
                  </li>
                  <li>
                    <a href="">Popular</a>
                  </li>
                  <li>
                    <a href="">Top Rated</a>
                  </li>
                  <li>
                    <a href="">Upcoming</a>
                  </li>
                </ul>
              </li>

              <li className="actors">
                <a href="">Actors</a>
              </li>
              <li className="TVshows">
                <a href="#" onClick={toggleDropdown("TVshows")}>
                  TV Shows ▼
                </a>
                {/*TVshows DropDown Menu */}
                <ul
                  className={
                    openDropdown === "TVshows"
                      ? "DropDownMenu open"
                      : "DropDownMenu"
                  }
                >
                  <li>
                    <a href="">Airing Today</a>
                  </li>
                  <li>
                    <a href="">On TV</a>
                  </li>
                  <li>
                    <a href="">Popular</a>
                  </li>
                  <li>
                    <a href="">Top Rated</a>
                  </li>
                </ul>
              </li>
              <li className="search-bar">
                <form action="">
                  <input type="text" placeholder="Search" />
                  <button>Search</button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
