import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, loadMoreMovies, moreButtonVisible }) {
    return (
        <section className="films project__wrapper">
            <ul className="films__list">
                {movies.map((movie, i) =>
                    <MoviesCard movie={movie} key={movie.id} />
                )}
            </ul>

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
