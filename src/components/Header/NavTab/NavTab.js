import React from "react";
import { NavLink } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
    return (
        <nav>
            <ul className="header__nav">
                <li className="header__nav-item">
                    <NavLink
                        to="/movies"
                        className="project__link"
                        activeClassName="project__link_active"
                    >
                        Фильмы
                    </NavLink>
                </li>
                <li className="header__nav-item">
                    <NavLink
                        to="/saved-movies"
                        className="project__link"
                        activeClassName="project__link_active"
                    >
                        Сохранённые фильмы
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
