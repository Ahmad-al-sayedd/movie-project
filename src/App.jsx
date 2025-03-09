import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Favorites from "./components/Favorites/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage/SearchPage";
import MoviesPage from "./components/MoviesPage";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext, useState, useEffect } from "react";
import "./App.scss";
import { SearchContext } from "./contexts/SearchContext";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Pagination from "@mui/material/Pagination";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [burgerMenu, setBurgerMenu] = useState(false); // Renamed to burgerMenu

  const { page, setPage, setSearchQuery, favoritesMovies } =
    useContext(SearchContext);

  const handlePageChange = (event, value) => {
    if (value !== 1) {
      navigate(`/movies/page/${value}`);
      setPage(value); // Update the page number in the state
    } else {
      navigate(`/movie-project`);
      setPage(value);
    }
  };

  useEffect(() => {
    // Function to close the menu when clicking outside
    const handleClickOutside = (e) => {
      if (e.target.id !== 'burgerMenueDiv' && !e.target.closest('#burgerMenueDiv')) {
        setBurgerMenu(false);
      }
    };

    // Adding event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Toggle Burger Menu onClick */}
      <div id="burgerMenueDiv" className="burgerMenuBtn">
        <RxHamburgerMenu  id="burgerMenueDiv"  onClick={() => setBurgerMenu(!burgerMenu)} />
      </div>

      <nav className={burgerMenu ? "active-nav-bar" : "Nav-Bar"}>
        <NavLink className="home-link" onClick={() => setPage(1)} to="/">
          Home
        </NavLink>
        <li className="favoriteElement">
          <NavLink className="fav-link" to="/movie-project/favorites">
            Favorites
          </NavLink>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>

        <NavLink className="genres-link" to="/movie-project/genres">
          Genres
        </NavLink>

        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="search for movies ..."
        />
        <NavLink to="/movie-project/search-page" className="search-link">
          Search
        </NavLink>
        <NavLink to="/movie-project/sign-in" className="sign-in-link">
          Sign in
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie-project" element={<HomePage />} />
        <Route path="/movie-project/favorites" element={<Favorites />} />
        <Route path="/movie-project/genres" element={<Genres />} />
        <Route path="/genres/:genre" element={<GenreMovies />} />
        <Route path="/movie-project/sign-in" element={<LoginSignup />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-project/search-page" element={<SearchPage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/movies/page/:page" element={<MoviesPage />} />
      </Routes>

      {(location.pathname.startsWith("/movies/page/") ||
        location.pathname === "/" ||
        location.pathname === "/movie-project") && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={100}
          shape="rounded"
          className="pagination"
        />
      )}
    </>
  );
}

export default App;
