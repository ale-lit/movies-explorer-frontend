import React from "react";
import { useLocation } from "react-router-dom";
import { ShortMoviesContext } from '../../../../contexts/ShortMoviesContext';
import { ShortSavedMoviesContext } from '../../../../contexts/ShortSavedMoviesContext';
import "./FilterCheckbox.css";

function FilterCheckbox() {

    const location = useLocation().pathname;

    return (
        location === '/saved-movies' ? (
            <ShortSavedMoviesContext.Consumer>
                {({savedState, toggleSavedCheckbox}) => (
                    <div className="search__setting">
                        <label className="search__checkbox-label">
                            <input
                                type="checkbox"
                                checked={savedState}
                                onChange={toggleSavedCheckbox}
                            />
                            <span>Короткометражки</span>
                        </label>
                    </div>
                )}
            </ShortSavedMoviesContext.Consumer>
        ) : (
            <ShortMoviesContext.Consumer>
                {({state, toggleCheckbox}) => (
                    <div className="search__setting">
                        <label className="search__checkbox-label">
                            <input
                                type="checkbox"
                                checked={state}
                                onChange={toggleCheckbox}
                            />
                            <span>Короткометражки</span>
                        </label>
                    </div>
                )}
            </ShortMoviesContext.Consumer>
        )   
    );
}

export default FilterCheckbox;
