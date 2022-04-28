import React from "react";
import "./MoviesCard.css";

import image from '../../../images/example.jpg';

function MoviesCard({ saved }) {
    return (
        <li className="films__item">
            <div className="films__item-header">
                <div className="films__item-info">
                    <p className="films__title">33 слова о дизайне</p>
                    <p className="films__duration">1ч 47м</p>
                </div>                        
                <button className={`films__save-button ${saved === 'true' ? 'films__save-button_type_active' : ''}`}></button>
            </div>
            <img src={image} className="films__poster" alt="" />
        </li>
    );
}

export default MoviesCard;