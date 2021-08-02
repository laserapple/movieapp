import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MovieList from "../src/components/MovieList";
import MovieListHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=121caba3`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavs = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (localStorage.getItem("react-movie-app-favourites") !== null) {
      setFavourites(movieFavs);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavList = [...favourites, movie];
    const currentMovieID = movie.imdbID;
    if (newFavList.filter((fav) => fav.imdbID === currentMovieID).length < 2) {
      setFavourites(newFavList);
      saveToLocalStorage(newFavList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavList = favourites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavourites(newFavList);
    saveToLocalStorage(newFavList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading headings="Movie" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          handleFavouritesClick={addFavouriteMovie}
          movies={movies}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading headings="Favourites" />
      </div>
      <div className="row">
        <MovieList
          handleFavouritesClick={removeFavouriteMovie}
          movies={favourites}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
