import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavTab from "./NavTab/NavTab";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header() {
    const [login, setLogin] = useState(false);

    const location = useLocation().pathname;

    // Временное решение
    useEffect(() => {
        if(location === '/movies') {
            setLogin(true);
        }
    }, []);


    return (
        <header className={`header ${location === '/' ? ' blue-background' : ''}`}>
            <Link to="/">
                <img src={logo} alt="Логотип" className="header__logo" />
            </Link>
            {login ? (
                <>
                    <NavTab />
                    <Link to='/profile' className='header__profile-link project__link'>Аккаунт</Link>
                </>
            ) : (
                <div className="header__auth">
                    <Link to="/signup" className="header__link project__link">
                        Регистрация
                    </Link>
                    <Link to="/signin" className="header__login-link">
                        Войти
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
