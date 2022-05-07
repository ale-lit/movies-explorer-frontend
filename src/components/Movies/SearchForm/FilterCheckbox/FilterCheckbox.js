import React from "react";
import { ShortMoviesContext } from '../../../../contexts/ShortMoviesContext';
import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
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
    );
}

export default FilterCheckbox;
