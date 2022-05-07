import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({
    onSearchForm,
    movies,
    searchText,
    loadMoreMovies,
    moreButtonVisible,
    message,
    onError
}) {
    useEffect(() => {
        if(movies.length === 0) {
            onError("Ничего не найдено");
        } else {
            onError("");
        }
    }, [movies]);

    return (
        <main className="main">
            <SearchForm
                onSearchForm={onSearchForm}
                searchText={searchText}
                onError={onError}
            />
            <MoviesCardList
                movies={movies}
                loadMoreMovies={loadMoreMovies}
                moreButtonVisible={moreButtonVisible}
                message={message}
            />
        </main>
    );
}

export default Movies;
