import React from 'react';
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register() {
    return (
        <main className="main">
            <section className="register project__wrapper">
                <Link to="/"><img src={logo} alt="Логотип" className="register__logo" /></Link>

                <h1 className="register__title">Добро пожаловать!</h1>

                <form className="register__form">
                    <label for="" className="register__label">Имя</label>
                    <input type="text" className="register__input" placeholder="Ваше имя" />                

                    <label for="" className="register__label">E-mail</label>
                    <input type="email" className="register__input" placeholder="Ваш E-mail" />                

                    <label for="" className="register__label">Пароль</label>
                    <input type="password" className="register__input input-error" placeholder="Ваш пароль" value="13243453245" />                
                    <p className="register__error">Что-то пошло не так...</p>

                    <button className="register__button">Зарегистрироваться</button>

                    <p className="register__login-link">Уже зарегистрированы? <Link to="/signin" class="project__link">Войти</Link></p>                
                </form>
            </section>
        </main>
    );
}

export default Register;