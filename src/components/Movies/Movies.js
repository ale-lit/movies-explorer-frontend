import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ movies, loadMoreMovies }) {
    return (
        <main className="main">
            <SearchForm />
            <MoviesCardList
                movies={movies}
                loadMoreMovies={loadMoreMovies}
            />
        </main>
    );
}

export default Movies;
