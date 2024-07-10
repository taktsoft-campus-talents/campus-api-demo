import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  async function handleLoadMovies(page = 1) {
    const { data, status } = await axios.get(
      `https://campus-api-movies.onrender.com/movies?page=${page}`
    );
    console.log(data.result);
    console.log("totalCount", data.totalCount);
    console.log("Status", status);
    setMovies(data.result);
  }

  async function handleLoadMovie(movieId) {
    try {
      const { data } = await axios.get(
        `https://campus-api-movies.onrender.com/movies/${movieId}`
      );
      console.log("Hallo");
      console.log(data);
      setMovieDetails(data);
    } catch (err) {
      alert("An error occurred!");
      console.log(err);
    }
  }

  async function loadNextPage() {
    setCurrentPage((prev) => prev + 1);
    handleLoadMovies(currentPage + 1);
  }

  async function loadPrevPage() {
    setCurrentPage((prev) => prev - 1);
    handleLoadMovies(currentPage - 1);
  }

  return (
    <main>
      <h1>API Demo - Movies</h1>
      <button onClick={handleLoadMovies}>Load Movies</button>

      <div className="flex-container">
        <div className="flex-child">
          <p>Current Page: {currentPage}</p>
          <ul>
            {movies.map((movie) => {
              return (
                <li onClick={() => handleLoadMovie(movie.id)} key={movie.id}>
                  {movie.title}
                </li>
              );
            })}
          </ul>
          <div className="list-navigation">
            <button onClick={loadPrevPage}>Prev</button>
            <button onClick={loadNextPage}>Next</button>
          </div>
        </div>
        <div className="flex-child movie-details">
          {movieDetails ? (
            <>
              <h2>{movieDetails.title}</h2>
              <p>{movieDetails.plot}</p>
              <img src={movieDetails.poster} alt="poster" />
              <a href={movieDetails.imdbLink}>Mehr auf IMDB</a>
            </>
          ) : (
            <>
              <h2>No movie selected</h2>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
