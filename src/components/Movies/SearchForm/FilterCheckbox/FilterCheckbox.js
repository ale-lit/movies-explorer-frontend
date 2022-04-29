import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
        <div className="search__setting">
            <label className="search__checkbox-label">
                <input type="checkbox" />
                <span>Короткометражки</span>                
            </label>
        </div>
    );
}

export default FilterCheckbox;