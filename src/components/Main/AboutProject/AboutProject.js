import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about project__wrapper">
            <h2 className="main__title">О проекте</h2>

            <div className="about__inner">
                <div className="about__inner-block">
                    <h3 className="about__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about__description">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>

                <div className="about__inner-block">
                    <h3 className="about__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about__description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>

            <div className="about__timeline">
                <div className="about__timeline-backend">
                    <span className="about__timeline-blackbg">1 неделя</span>
                    Back-end
                </div>

                <div className="about__timeline-frontend">
                    <span className="about__timeline-graybg">4 недели</span>
                    Front-end
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
