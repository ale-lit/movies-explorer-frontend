import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ movies, loadMoreMovies, moreButtonVisible }) {
    return (
        <main className="main">
            <SearchForm />
            <MoviesCardList
                movies={movies}
                loadMoreMovies={loadMoreMovies}
                moreButtonVisible={moreButtonVisible}
            />
        </main>
    );
}

export default Movies;
