import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_MOVIES_URL } from "../../../constants";

function MoviesCard({ title, duration, image, saved }) {

    const location = useLocation().pathname;

    function convertTime(duration) {
        let hours = parseInt(duration / 60);
        let mins = duration % 60;
        return hours + 'ч ' + mins + 'м';
    }

    return (
        <li className="films__item">
            <div className="films__item-header">
                <div className="films__item-info">
                    <p className="films__title" title={title}>{title}</p>
                    <p className="films__duration">{convertTime(duration)}</p>
                </div>
                {location === "/saved-movies" ? (
                    <button className="films__save-button films__save-button_type_remove"></button>
                ) : (
                    <button className={`films__save-button ${saved ? 'films__save-button_type_active' : ''}`}></button>
                )}
                
            </div>
            <img src={BASE_MOVIES_URL + image} className="films__poster" alt={title} title={title} />
        </li>
    );
}

export default MoviesCard;