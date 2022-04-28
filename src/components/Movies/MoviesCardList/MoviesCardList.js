import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList() {
    return (
        <section className="films project__wrapper">
            <ul className="films__list">
                <MoviesCard saved="false" />
                <MoviesCard saved="true" />
                <MoviesCard saved="false" />
                <MoviesCard saved="true" />
                <MoviesCard saved="false" />
                <MoviesCard saved="false" />
                <MoviesCard saved="true" />
                <MoviesCard saved="false" />
                <MoviesCard saved="true" />
                <MoviesCard saved="true" />
                <MoviesCard saved="false" />
                <MoviesCard saved="false" />
            </ul>

            <button className="films__more-button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;
