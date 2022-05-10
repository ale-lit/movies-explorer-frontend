import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register({ onRegisterUser, isLoading, formError }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isValid, setIsValid] = useState(false);

    function checkValid() {
        if (
            !nameError &&
            !emailError &&
            !passwordError &&
            name &&
            email &&
            password
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    useEffect(() => {
        checkValid();
    }, [name, email, password]);

    function handleNameChange(e) {
        let value = e.target.value;

        if (value.length < 2 && value.length > 0) {
            setNameError("Длина имени менее 2 символов!");
            setIsValid(false);
        } else if (value.length > 30) {
            setNameError("Длина имени более 30 символов!");
            setIsValid(false);
        } else {
            setNameError("");
        }

        setName(value);
    }
    function handleEmailChange(e) {
        let value = e.target.value;
        let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (!re.test(value)) {
            setEmailError("Введите корректный Email!");
            setIsValid(false);
        } else {
            setEmailError("");
        }

        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        let value = e.target.value;

        if (value.length < 3 && value.length > 0) {
            setPasswordError("Длина пароля менее 3 символов!");
            setIsValid(false);
        } else if (value.length > 20) {
            setPasswordError("Длина пароля более 20 символов!");
            setIsValid(false);
        } else {
            setPasswordError("");
        }

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
                    <label htmlFor="input-name" className="input-label">
                        Имя
                    </label>
                    <input
                        id="input-name"
                        type="text"
                        className={`register__input ${
                            nameError ? "error" : ""
                        }`}
                        placeholder="Ваше имя"
                        value={name || ""}
                        onChange={handleNameChange}
                        required
                        disabled={isLoading}
                    />
                    <p className="input-error">{nameError}</p>

                    <label htmlFor="input-email" className="input-label">
                        E-mail
                    </label>
                    <input
                        id="input-email"
                        type="email"
                        className={`register__input ${
                            emailError ? "error" : ""
                        }`}
                        placeholder="Ваш E-mail"
                        value={email || ""}
                        onChange={handleEmailChange}
                        required
                        disabled={isLoading}
                    />
                    <p className="input-error">{emailError}</p>

                    <label htmlFor="input-password" className="input-label">
                        Пароль
                    </label>
                    <input
                        id="input-password"
                        type="password"
                        className={`register__input ${
                            passwordError ? "error" : ""
                        }`}
                        placeholder="Ваш пароль"
                        value={password || ""}
                        onChange={handlePasswordChange}
                        required
                        disabled={isLoading}
                    />
                    <p className="input-error">{passwordError}</p>

                    <p className="form-error">{formError}</p>
                    <button
                        className="register__button"
                        disabled={!isValid || isLoading}
                    >
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
