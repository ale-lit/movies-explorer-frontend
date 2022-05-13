import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

import { REGEXP_EMAIL_CHECK } from "../../regexp";

function Profile({ onEditUser, formError, isLoading, onLogoutUser }) {
    // TODO
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [isValid, setIsValid] = useState(false);

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function checkValid() {
        if (
            !nameError &&
            !emailError &&
            name &&
            email &&
            (name !== currentUser.name || email !== currentUser.email)
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    useEffect(() => {
        checkValid();
    }, [name, email, currentUser]);

    function handleNameChange(e) {
        let value = e.target.value;

        if ((value.length < 2 && value.length > 0) || value.length > 30) {
            setNameError("Ошибка!");
            setIsValid(false);
        } else {
            setNameError("");
        }

        setName(value);
    }
    function handleEmailChange(e) {
        let value = e.target.value;

        if (!REGEXP_EMAIL_CHECK.test(value) && value.length > 0) {
            setEmailError("Ошибка!");
            setIsValid(false);
        } else {
            setEmailError("");
        }

        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onEditUser({
            name,
            email,
        });
    }

    return (
        <main className="main">
            <section className="user project__wrapper">
                <h1 className="user__hello">Привет, {currentUser.name}!</h1>
                <form onSubmit={handleSubmit}>
                    <p className="user__name">
                        <span className="user__name-title">Имя</span>
                        <input
                            onChange={handleNameChange}
                            type="text"
                            className="user__input"
                            value={name || ""}
                        ></input>
                    </p>
                    <p className="user__email">
                        <span className="user__email-title">E-mail</span>
                        <input
                            onChange={handleEmailChange}
                            type="text"
                            className="user__input"
                            value={email || ""}
                        ></input>
                    </p>

                    <div className="user__links">
                        <p className="form-error">{formError}</p>
                        <button
                            className="user__edit-button"
                            disabled={!isValid || isLoading}
                        >
                            Редактировать
                        </button>
                        <Link
                            onClick={onLogoutUser}
                            to="#"
                            className="project__link user__link-logout"
                        >
                            Выйти из аккаунта
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Profile;
