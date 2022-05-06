import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ movies }) {
    return (
        <main className="main">
            <SearchForm />
            <MoviesCardList movies={movies} items="13" />
        </main>
    );
}

export default Movies;
