import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header() {
    return (
        <header className="header project__wrapper blue-background">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__auth">
                <Link to="/signup" className="header__link project__link">
                    Регистрация
                </Link>
                <Link to="/signin" className="header__login-link">
                    Войти
                </Link>
            </div>
        </header>
    );
}

export default Header;
