import React from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search project__wrapper">
            <div className="search__form">
                <input type="search" className="search__input" name="" id="" placeholder="Фильм" />
                <input type="button" className="search__button" aria-label="Найти" />
            </div>
            <FilterCheckbox />
        </section>
    );
}

export default SearchForm;
