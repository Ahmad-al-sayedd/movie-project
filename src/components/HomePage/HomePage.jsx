import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./HomePage.scss";

export default function HomePage() {

  const {
    movies,
    handleSearch,
    addingToFavorite,
    fetchFullMovieDetails
  } = useContext(SearchContext); // using context's constants...
  
  const [timeOfDay, setTimeofDay] = useState(""); // based on the current hour

  const navigate = useNavigate();
    //handlePageChangeValue 

    // const handlePageChange = (event, value) => {
      
    //   setPage(value); // Update the page number in the state
    //   navigate(`/movies/page/${value}`); // Optionally navigate to the page URL if you want
    //   console.log(value)
    // };
 
  function updateTime() {
    // used to update timeOfDay based on hours
    const now = new Date();
    const hour = now.getHours();

    let timeLabel = "";
    if (hour >= 5 && hour < 12) timeLabel = "morning";
    else if (hour >= 12 && hour < 14) timeLabel = "noon";
    else if (hour >= 14 && hour < 17) timeLabel = "afternoon";
    else if (hour >= 17 && hour < 21) timeLabel = "evening";
    else timeLabel = "night";

    setTimeofDay(timeLabel);
  }

  useEffect(() => { // updating the time of the day
    updateTime();
  }, []);

  useEffect(() => { // getting the movies depending on the time of the day
    if (!timeOfDay) return;
    handleSearch(timeOfDay);
  }, [timeOfDay]);

  // useEffect(()=>{ // updating the info of each movie
  //   if (!movies.length) return;
  //   fetchFullMovieDetails(movies); 
  // }, [movies])

  useEffect(() => {
    if (!movies.length) return;
  
    // Filter out movies that already have full details
    const moviesToFetch = movies.filter((m) => !m.Plot); 
  
    if (moviesToFetch.length > 0) {
      fetchFullMovieDetails(moviesToFetch);
    }
  }, [movies]);
  return (
    <div className="movies-container_div">
      <ul className="moviesContainer">
        {movies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <div className="expand">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
                alt={movie.Title + " Poster"}
                style={{
                  width: "80%",
                  height: "230px",
                  objectFit: "cover",
                  padding: "10px 0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              />
            </div>
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre || "N/A"}</p>
            <p>Rating: {movie.imdbRating || "N/A"}</p>
            <button
              className="favorites-button"
              onClick={() => addingToFavorite(movie)}
            >
              Add to favorites
            </button>
          </div>
        ))}
      </ul>

    </div>
  );
}
