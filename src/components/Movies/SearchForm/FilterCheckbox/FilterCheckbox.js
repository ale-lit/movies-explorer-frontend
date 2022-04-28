import React, { useState, useEffect } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
    const [shorts, setShorts] = useState(false);

    return (
        <div className="search__setting">
            <input type="checkbox" className="search__checkbox" name="" id="shorts" />
            <label for="shorts" className="search__checkbox-label">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;