import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <main className="main">
            <SearchForm />
            <MoviesCardList items="3" />
        </main>
    );
}

export default SavedMovies;
