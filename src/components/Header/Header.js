import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavTab from "./NavTab/NavTab";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header({ loggedIn }) {
    const [showMenu, setShowMenu] = useState(false);

    const location = useLocation().pathname;

    function toggleMenu() {
        if(showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }

    function closeMenu() {
        setShowMenu(false);
    }

    return (
        <header className={`header ${location === '/' ? ' blue-background' : ''}`}>
            <Link to="/movies-explorer/" className="project__link" title="На главную">
                <img src={logo} alt="Логотип" className="header__logo" />
            </Link>
                    {loggedIn ? (
                        <>
                            <div className={`header__cover ${showMenu ? 'header__cover_active' : ''}`}>
                                <button className={`header__mob-menu-button ${showMenu ? 'header__mob-menu-button_active' : ''}`} onClick={toggleMenu}><span></span></button>
                                <div className={`header__menu ${showMenu ? 'header__menu_visible' : ''}`}>
                                <NavTab closeMenu={closeMenu} />
                                <Link to='/movies-explorer/profile' className='header__profile-link project__link' onClick={closeMenu}>Аккаунт</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="header__auth">
                            <Link to="/movies-explorer/signup" className="header__link project__link-border">
                                Регистрация
                            </Link>
                            <Link to="/movies-explorer/signin" className="header__login-link">
                                Войти
                            </Link>
                        </div>
                    )}
        </header>
    );
}

export default Header;
