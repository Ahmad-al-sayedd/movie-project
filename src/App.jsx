import { useNavigate, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage/SearchPage";
import MoviesPage from "./components/MoviesPage";

import "./App.scss";
import { SearchContext } from "./contexts/SearchContext";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Pagination from "@mui/material/Pagination";
import { useContext } from "react";

function App() {
  const navigate = useNavigate();

  const { page, setPage, setSearchQuery, favoritesMovies } =
    useContext(SearchContext);

  // every time the pagination page changes  run these condition
  // the value is by default provided by material-ui pagination
  const handlePageChange = (event, value) => {
    // check if the value is not = 1 then go to the page/2 or page/4 ....
    if (value !== 1) {
      navigate(`/movies/page/${value}`);
      setPage(value); // Update the page number in the state
    }
    // if the value = 1 or the pagination num then go to home page
    else {
      navigate(`/movie-project`);
      setPage(value);
    }
  };

  return (
    <>
      <nav>
        <NavLink className="home-link" onClick={() => setPage(1)} to="/">
          Home
        </NavLink>
        <li className="favoriteElement">
          <NavLink className="fav-link" to="/movie-project/favorites">Favorites</NavLink>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>

        <NavLink className="/movie-project/top-rated" to="/top-rated">Top Rated</NavLink>
        <NavLink className="genres-link" to="/movie-project/genres">Genres</NavLink>
        <input
          className="search-input"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="search for movies ..."
        ></input>

        <NavLink to="/movie-project/search-page" className="search-link"> Search</NavLink>

        <NavLink to="/sign-in" className="sign-in-link">Sign in</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie-project" element={<HomePage />} />  {/* Handle /movie-project */}
        <Route path="/movie-project/favorites" element={<Favorites />} />
        <Route path="/movie-project/top-rated" element={<TopRated />} />
        <Route path="/movie-project/genres" element={<Genres />} />
        <Route path="/genres/:genre" element={<GenreMovies />} />
        <Route path="/sign-in" element={<LoginSignup />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie-project/search-page" element={<SearchPage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/movies/page/:page" element={<MoviesPage />} />
      </Routes>

      {/* Only show pagination on specific pages */}
      {(location.pathname.startsWith("/movies/page/") ||
        location.pathname === "/" ||
        location.pathname === "/movie-project") && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={100}
          shape="rounded"
        />
      )}
    </>
  );
}

export default App;
