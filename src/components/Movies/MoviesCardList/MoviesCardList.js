import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, items }) {
    return (
        <section className="films project__wrapper">
            <ul className="films__list">

                {/* {cards.map((card, i) =>
                    i < 12 ? (
                        <MoviesCard
                            title={card.title}
                            duration={card.duration}
                            image={card.poster}
                            saved={card.saved}
                            key={card._id}
                        />
                    ) : (
                        ""
                    )
                )} */}

                {movies.map((movie, i) => (
                    <MoviesCard
                        title={movie.nameRU}
                        duration={movie.duration}
                        image={movie.image.url}
                        saved={0}
                        link={movie.trailerLink}
                        key={movie.id}
                    />
                ))}
            </ul>

            <div className="films__more-block">
                {items > 12 ? (
                    <button className="films__more-button">Ещё</button>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}

export default MoviesCardList;
