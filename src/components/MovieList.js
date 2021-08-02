import React from "react";

const MovieList = (props) => {
  const FavComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          key={index}
          className="d-flex justify-content-start m-3 image-container"
        >
          <img src={movie.Poster} alt="movie" />

          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="overlay d-flex align-item-cener justify-content-center"
          >
            <FavComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
