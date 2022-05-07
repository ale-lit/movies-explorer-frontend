import React, { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ onSearchForm, searchText, onError }) {
    const [searchInputText, setSearchInputText] = useState("");

    useEffect(() => {
        if(searchText !== "") {
            setSearchInputText(searchText);
        }
    }, [searchText])

    function handleSearchTextChange(e) {
        setSearchInputText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(searchInputText === "") {
            onError("Нужно ввести ключевое слово");
        } else {
            onError();
            onSearchForm(searchInputText);
        }
    }

    return (
        <form className="search project__wrapper" onSubmit={handleSubmit}>
            <div className="search__form">
                <input
                    type="search"
                    className="search__input"
                    placeholder="Фильм"
                    value={searchInputText || ""}
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
