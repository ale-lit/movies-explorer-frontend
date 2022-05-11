import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
    onSearchForm,
    movies,
    searchText,
    loadMoreMovies,
    moreButtonVisible,
    message,
    onError,
    isLoading,
    onMovieSave,
}) {
    useEffect(() => {
        if (movies.length === 0) {
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
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={movies}
                    loadMoreMovies={loadMoreMovies}
                    moreButtonVisible={moreButtonVisible}
                    message={message}
                    onMovieSave={onMovieSave}
                />
            )}
        </main>
    );
}

export default Movies;
