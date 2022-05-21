import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_MOVIES_URL } from "../../../constants";

function MoviesCard({ movie, onMovieSave, onMovieDelete, saved }) {
    const location = useLocation().pathname;

    function convertTime(duration) {
        let hours = parseInt(duration / 60);
        let mins = duration % 60;
        return hours + "ч " + mins + "м";
    }

    function handleSaveClick(e) {
        let saveButton = e.target;
        if(saveButton.classList.contains('films__save-button_type_active')) {
            saveButton.classList.remove('films__save-button_type_active');
            onMovieDelete(movie.id);
        } else {
            saveButton.classList.add('films__save-button_type_active');
            onMovieSave(movie);
        }
    }

    function handleDeleteClick() {
        onMovieDelete(movie.movieId);
    }    

    return (
        <li className="films__item">
            <div className="films__item-header">
                <div className="films__item-info">
                    <p className="films__title" title={movie.nameRU}>
                        {movie.nameRU}
                    </p>
                    <p className="films__duration">
                        {convertTime(movie.duration)}
                    </p>
                </div>
                {location === "/saved-movies" ? (
                    <button
                        className="films__save-button films__save-button_type_remove"
                        onClick={handleDeleteClick}
                    ></button>
                ) : (
                    <button
                        className={`films__save-button ${
                            saved ? "films__save-button_type_active" : ""
                        }`}
                        onClick={handleSaveClick}
                    ></button>
                )}
            </div>
            <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={movie.image.url ? BASE_MOVIES_URL + movie.image.url : movie.image}
                    className="films__poster"
                    alt={movie.nameRU}
                    title={movie.nameRU}
                />
            </a>
        </li>
    );
}

export default MoviesCard;
