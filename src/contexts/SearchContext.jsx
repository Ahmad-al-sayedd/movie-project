import { createContext, useState, useEffect } from "react";


const OMDBkey = import.meta.env.VITE_OMDB_APIKEY;
const TMDBkey = import.meta.env.VITE_TMDB_APIKEY;

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [movies, setMovies] = useState([]); // for 10 movies
  const [movie, setMovie] = useState(null); // for a single movie
  const [searchQuery, setSearchQuery] = useState(""); // for search bar
  const [favoritesMovies, setFavoritesMovies] = useState([]); // for favorite movies
  const [genres, setGenres] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchComponentData, SetSearchComponentData] = useState([]); //for Search Component
  const [page, setPage] = useState(2); // Tracks current page
  const [pagesMovies, setPagesMovies] = useState([]); // Rendering different movies  based on the page number in moviesPage Component

  function handleSearch(query) {
    fetch(`https://www.omdbapi.com/?apikey=${OMDBkey}&s=${query}`) // for 10 per query
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []); // Set the movies after fetching
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }
  function handlePagination(page) {
    fetch(`https://www.omdbapi.com/?apikey=${OMDBkey}&s=movie&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setPagesMovies(data.Search || []);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }

  function handleSingleSearch(id) {
    // for 1 movie per query
    fetch(`https://www.omdbapi.com/?apikey=${OMDBkey}&i=${id}`)
      .then((result) => result.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie: ", error));
  }
  // a place for orcs and their TMDB
  function handleSingleSearchTMDB(id) {

    console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBkey}&language=en-US`);
    
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBkey}&language=en-US`
    )
      .then((result) => result.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => console.error("Error fetching movie: ", error));
  }

  function fetchFullMovieDetails(moviesArray) {
    // fetch full movies' details from an array!
    if (!moviesArray.length) return;

    return Promise.all(
      moviesArray.map((movie) =>
        fetch(`https://www.omdbapi.com/?apikey=${OMDBkey}&i=${movie.imdbID}`)
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching details:", error))
      )
    ).then((fullMovies) => {
      setMovies(fullMovies); // updating movies state with full details
    });
  }

  function fetchGenres() {
    // for genres page
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDBkey}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || []))
      .catch((error) => console.error("Error fetching genres:", error));
  }

  function fetchMoviesForGenres() {
    // fetch movies for genres
    if (genres.length === 0) return;

    const moviePromises = genres.map((genre) =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDBkey}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc`
      )
        .then((response) => response.json())
        .then((data) => {
          const movies = data.results || [];
          const randomMovie =
            movies.length > 0
              ? movies[Math.floor(Math.random() * movies.length)]
              : null;
          return { genre: genre.name, movie: randomMovie };
        })
        .catch((error) => {
          console.error(`Error fetching movies for ${genre.name}:`, error);
          return null;
        })
    );

    Promise.all(moviePromises).then((resolvedMovies) => {
      setRandomMovies(resolvedMovies.filter((item) => item.movie !== null));
    });
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMoviesForGenres();
  }, [genres]);

  //Fetching Data For Search Component
  function handleSearchComponent(query) {
    fetch(`https://www.omdbapi.com/?apikey=${OMDBkey}&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        SetSearchComponentData(data.Search || []); // Set the movies after fetching
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }

  // Adding movies  to favorite  component
  const addingToFavorite = (movie) => {
    setFavoritesMovies((prev) => {
      if (!prev.some((fav) => fav.imdbID === movie.imdbID)) {
        return [...prev, movie];
      } else {
        console.log("Movie already exists in favorites");
        return prev;
      }
    });
  };
  return (
    <SearchContext.Provider
      value={{
        favoritesMovies,
        setFavoritesMovies,
        searchQuery,
        setSearchQuery,
        movies,
        handleSearch,
        movie,
        setMovie,
        handleSingleSearch,
        setMovies,
        addingToFavorite,
        genres,
        randomMovies,
        TMDBkey,
        handleSingleSearchTMDB,
        fetchFullMovieDetails,
        searchComponentData,
        handleSearchComponent,
        handlePagination,

        page,
        setPage,
        pagesMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
