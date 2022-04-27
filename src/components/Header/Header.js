import React from "react";
import "./Header.css";

function Header() {
    return (
        <header className="header project__wrapper blue-background">
            <img src="./images/logo.svg" alt="Логотип" className="header__logo" />
            <div className="header__auth">
                <a href="" className="header__link project__link">Регистрация</a>
                <button className="header__login-butt">Войти</button>
            </div>
        </header>
    );
}

export default Header;
