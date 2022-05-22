import React from "react";
import "./AboutMe.css";
import studentPhoto from "../../../images/student-photo.jpg";

function AboutMe() {
    return (
        <section className="student project__wrapper">
            <h2 className="main__title">Студент</h2>

            <div className="student__info">
                <div className="student__left-block">
                    <h3 className="student__name">Александр</h3>
                    <p className="student__about">
                        Фронтенд-разработчик, 36 лет
                    </p>
                    <p className="student__description">
                        Я родился и живу в Санкт-Петербурге, Веб-разработкой
                        увлекаюсь с 2006 года (в основном как хобби в свободное
                        от работы время, но также периодически выполнял
                        некоторые фриланс-заказы). Имею высшее экономическое
                        образование по направлению «Финансы и кредит». В
                        середине 2021 года решил что-то кардинально поменять в
                        своей жизни, начав профессионально заниматься тем что
                        мне действительно очень нравится, и поступил на курс
                        «Фронтенд-разработчик» в Яндекс.Практикуме (который
                        закончил, успешно защитив диплом в мае 2022 года), а
                        также на курс профессиональной переподготовки в СПбПУ по
                        направлению «Веб-разработчик. Язык PHP» (заканчиваю в
                        августе 2022г).
                    </p>
                    <ul className="student__links">
                        <li className="student__link">
                            <a
                                href="https://t.me/alelitv"
                                target="_blank"
                                className="project__link-border"
                                rel="noopener noreferrer"
                            >
                                Telegram
                            </a>
                        </li>
                        <li className="student__link">
                            <a
                                href="https://github.com/ale-lit"
                                target="_blank"
                                className="project__link-border"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="student__photo">
                    <img
                        src={studentPhoto}
                        alt="Литвиненко Александр"
                        className="student__photo-card"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
