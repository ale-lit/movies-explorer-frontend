import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_MOVIES_URL } from "../../../constants";

function MoviesCard({ movie }) {
    const location = useLocation().pathname;

    // TEMP
    let saved = 0;

    function convertTime(duration) {
        let hours = parseInt(duration / 60);
        let mins = duration % 60;
        return hours + 'ч ' + mins + 'м';
    }

    return (
        <li className="films__item">
            <div className="films__item-header">
                <div className="films__item-info">
                    <p className="films__title" title={movie.nameRU}>{movie.nameRU}</p>
                    <p className="films__duration">{convertTime(movie.duration)}</p>
                </div>
                {location === "/saved-movies" ? (
                    <button className="films__save-button films__save-button_type_remove"></button>
                ) : (
                    <button className={`films__save-button ${saved ? 'films__save-button_type_active' : ''}`}></button>
                )}
                
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer"><img src={BASE_MOVIES_URL + movie.image.url} className="films__poster" alt={movie.nameRU} title={movie.nameRU} /></a>
        </li>
    );
}

export default MoviesCard;