import React, { useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ onSearchForm }) {
    const [searchText, setSearchText] = useState("");

    function handleSearchTextChange(e) {
        setSearchText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearchForm(searchText);
    }

    return (
        <form className="search project__wrapper" onSubmit={handleSubmit}>
            <div className="search__form">
                <input
                    type="search"
                    className="search__input"
                    placeholder="Фильм"
                    value={searchText || ""}
                    onChange={handleSearchTextChange}
                    required
                />
                <input
                    type="submit"
                    className="search__button"
                    aria-label="Найти"
                    value=""
                />
            </div>
            <FilterCheckbox />
        </form>
    );
}

export default SearchForm;
