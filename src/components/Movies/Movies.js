import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ onSearchForm, movies, loadMoreMovies, moreButtonVisible }) {
    return (
        <main className="main">
            <SearchForm onSearchForm={onSearchForm} />
            <MoviesCardList
                movies={movies}
                loadMoreMovies={loadMoreMovies}
                moreButtonVisible={moreButtonVisible}
            />
        </main>
    );
}

export default Movies;
