import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
    movies,
    loadMoreMovies,
    moreButtonVisible,
    message,
    onMovieSave,
    onMovieDelete,
    savedIds,
}) {
    return (
        <section className="films project__wrapper">
            {message ? <p className="films__message">{message}</p> : ""}

            {movies.length ? (
                <ul className="films__list">
                    {movies.map((movie, i) => (
                        <MoviesCard
                            movie={movie}
                            key={movie.id || movie._id || movie.movieId}
                            onMovieSave={onMovieSave}
                            onMovieDelete={onMovieDelete}
                            saved={savedIds.includes(movie.id)}
                        />
                    ))}
                </ul>
            ) : (
                ""
            )}

            <div className="films__more-block">
                {moreButtonVisible ? (
                    <button
                        className="films__more-button"
                        onClick={loadMoreMovies}
                    >
                        Ещё
                    </button>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}

export default MoviesCardList;
