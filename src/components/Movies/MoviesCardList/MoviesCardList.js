import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, loadMoreMovies, moreButtonVisible }) {

    const [message, setMessage] = useState("");
    
    useEffect(() => {        
        setMessage("123");
    }, []);

    return (
        <section className="films project__wrapper">
            {!movies.length ? (
                <p className="films__message">{message}</p>
            ) : (
                <ul className="films__list">
                    {movies.map((movie, i) =>
                        <MoviesCard movie={movie} key={movie.id} />
                    )}
                </ul>
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
