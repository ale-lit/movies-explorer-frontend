import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register({ onRegisterUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onRegisterUser({
            name,
            email,
            password,
        });
    }

    return (
        <main className="main">
            <section className="register project__wrapper">
                <Link to="/" className="project__link" title="На главную">
                    <img src={logo} alt="Логотип" className="register__logo" />
                </Link>

                <h1 className="register__title">Добро пожаловать!</h1>

                <form onSubmit={handleSubmit} className="register__form">
                    <label htmlFor="name" className="register__label">
                        Имя
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="register__input"
                        placeholder="Ваше имя"
                        value={name || ""}
                        onChange={handleNameChange}
                        required
                    />

                    <label htmlFor="email" className="register__label">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="register__input"
                        placeholder="Ваш E-mail"
                        value={email || ""}
                        onChange={handleEmailChange}
                        required
                    />

                    <label htmlFor="password" className="register__label">
                        Пароль
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="register__input input-error"
                        placeholder="Ваш пароль"
                        value={password || ""}
                        onChange={handlePasswordChange}
                        required
                    />
                    <p className="register__error">Что-то пошло не так...</p>

                    <button className="register__button">
                        Зарегистрироваться
                    </button>

                    <p className="register__login-link">
                        Уже зарегистрированы?{" "}
                        <Link to="/signin" className="project__link">
                            Войти
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Register;
