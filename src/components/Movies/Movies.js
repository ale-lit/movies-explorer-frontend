import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({
    onSearchForm,
    movies,
    searchText,
    loadMoreMovies,
    moreButtonVisible,
}) {
    return (
        <main className="main">
            <SearchForm onSearchForm={onSearchForm} searchText={searchText} />
            <MoviesCardList
                movies={movies}
                loadMoreMovies={loadMoreMovies}
                moreButtonVisible={moreButtonVisible}
            />
        </main>
    );
}

export default Movies;
