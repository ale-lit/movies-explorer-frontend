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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae tenetur illum et nobis accusamus dignissimos
                        ab corrupti assumenda adipisci numquam quod autem, ullam
                        aut veniam natus tempora atque dolore modi! Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Lorem ipsum
                        dolor sit amet...
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
