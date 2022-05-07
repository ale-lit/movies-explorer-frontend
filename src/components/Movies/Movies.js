import React, { useState, useEffect } from "react";
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
    const [message, setMessage] = useState("");

    function handleErrorMessage(message) {
        if(message) {
            setMessage(message);
        } else {
            setMessage("");
        }        
    }

    useEffect(() => {
        if(movies.length === 0) {
            handleErrorMessage("Ничего не найдено");
        } else {
            handleErrorMessage("");
        }
    }, [movies]);

    return (
        <main className="main">
            <SearchForm
                onSearchForm={onSearchForm}
                searchText={searchText}
                onError={handleErrorMessage}
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
