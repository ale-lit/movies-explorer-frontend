import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login({ onLoginUser, isLoading, formError }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isValid, setIsValid] = useState(false);

    function checkValid() {
        if (!emailError && !passwordError && email && password) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    useEffect(() => {
        checkValid();
    }, [email, password]);

    function handleEmailChange(e) {
        let value = e.target.value;
        let re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

        if (!re.test(value) && value.length > 0) {
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

        onLoginUser({
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

                <h1 className="register__title">Рады видеть!</h1>

                <form onSubmit={handleSubmit} className="register__form">
                    <label htmlFor="input-email" className="input-label">
                        E-mail
                    </label>
                    <input
                        id="input-email"
                        type="email"
                        className={`login__input ${
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
                        className={`login__input ${
                            passwordError ? "error" : ""
                        }`}
                        placeholder="Ваш пароль"
                        value={password || ""}
                        onChange={handlePasswordChange}
                        required
                        disabled={isLoading}
                    />
                    <p className="input-error">{passwordError}</p>

                    <div className="login__space-area"></div>

                    <p className="form-error">{formError}</p>
                    <button
                        className="login__button"
                        disabled={!isValid || isLoading}
                    >
                        Войти
                    </button>

                    <p className="register__login-link">
                        Ещё не зарегистрированы?{" "}
                        <Link to="/signup" className="project__link">
                            Регистрация
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Login;
