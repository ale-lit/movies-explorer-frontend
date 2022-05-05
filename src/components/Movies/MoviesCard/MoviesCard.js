import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ title, duration, image, saved }) {

    const location = useLocation().pathname;

    return (
        <li className="films__item">
            <div className="films__item-header">
                <div className="films__item-info">
                    <p className="films__title">{title}</p>
                    <p className="films__duration">{duration}</p>
                </div>
                {location === "/saved-movies" ? (
                    <button className="films__save-button films__save-button_type_remove"></button>
                ) : (
                    <button className={`films__save-button ${saved ? 'films__save-button_type_active' : ''}`}></button>
                )}
                
            </div>
            <img src={image} className="films__poster" alt={title} />
        </li>
    );
}

export default MoviesCard;