import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
    return (
        <main className="main">
            <section className="user project__wrapper">
                <h1 className="user__hello">
                    Привет, Александр!
                </h1>
                <p className="user__name">
                    <span className="user__name-title">Имя</span>
                    <span>Александр</span>
                </p>
                <p className="user__email">
                    <span className="user__email-title">E-mail</span>
                    <span>alelit@internet.ru</span>
                </p>

                <div className="user__links">
                    <Link to="/profile/edit" className="project__link">Редактировать</Link>
                    <Link to="/logout" className="project__link user__link-logout">Выйти из аккаунта</Link>
                </div>
            </section>
        </main>
    );
}

export default Profile;
