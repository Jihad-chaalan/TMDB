import "./Navbar.css";
import { useState } from "react";

// function MyNavbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value); // Update the search query
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     console.log("Search for:", searchQuery); // Handle the search query (for now, just log it)
//   };

//   return (
//     <nav className="navbar">
//       <h1>Movies</h1>
//       <ul>
//         {/* <li>
//           <a href="">Movies</a>
//         </li>
//         <li>
//           <a href="">Actors</a>
//         </li>
//         <li>
//           <a href="">TV Shows</a>
//         </li> */}
//         <li>
//           <a href="#home">Home</a>
//         </li>

//         {/* About Link with Dropdown */}
//         <li
//           className={`dropdown ${isDropdownOpen ? "open" : ""}`}
//           onClick={toggleDropdown} // Toggle dropdown on click
//         >
//           <a href="#about">Movies</a>
//           <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
//             <li>
//               <a href="#team">Our Team</a>
//             </li>
//             <li>
//               <a href="#history">Our History</a>
//             </li>
//             <li>
//               <a href="#mission">Our Mission</a>
//             </li>
//           </ul>
//         </li>

//         <li>
//           <a href="#contact">Actors</a>
//         </li>

//         <li
//           className={`dropdown ${isDropdownOpen ? "open" : ""}`}
//           onClick={toggleDropdown} // Toggle dropdown on click
//         >
//           <a href="#about">TV Shows</a>
//           <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
//             <li>
//               <a href="#team">Our Team</a>
//             </li>
//             <li>
//               <a href="#history">Our History</a>
//             </li>
//             <li>
//               <a href="#mission">Our Mission</a>
//             </li>
//           </ul>
//         </li>

//         {/* Search Bar */}
//         <li className="search-bar">
//           <form onSubmit={handleSearchSubmit}>
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button type="submit">Search</button>
//           </form>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default MyNavbar;

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => (e) => {
    e.preventDefault(); // Prevent unwanted behavior
    setOpenDropdown(openDropdown === menu ? null : menu); // Toggle only the clicked dropdown
  };

  return (
    <>
      <div className="container">
        <div className="header-container">
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
