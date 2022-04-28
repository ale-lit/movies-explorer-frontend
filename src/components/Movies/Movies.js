import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
    return (
        <main className="main">
            <SearchForm />
            <MoviesCardList items="13" />
        </main>
    );
}

export default Movies;
