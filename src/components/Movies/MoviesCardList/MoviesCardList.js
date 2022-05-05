import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import image from "../../../images/example.jpg";

function MoviesCardList({ items }) {
    // Временное решение
    let cards = [];

    for (let i = 0; i < items; i++) {
        cards.push({
            title: "33 слова о дизайне",
            duration: "1ч 47м",
            poster: image,
            saved: Math.floor(Math.random() * 2),
            _id: i,
        });
    }

    return (
        <section className="films project__wrapper">
            <ul className="films__list">
                {cards.map((card, i) =>
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
                )}
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
