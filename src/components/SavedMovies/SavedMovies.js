import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
    onSearchForm,
    searchText,
    onError,
    movies,
    loggedIn,
    isLoading,
}) {
    return (
        <main className="main">
            <SearchForm
                onSearchForm={onSearchForm}
                searchText={searchText}
                onError={onError}
            />
            {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
        </main>
    );
}

export default SavedMovies;
