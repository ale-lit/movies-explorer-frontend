import React from 'react';
import { useHistory } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {
    const history = useHistory();

    return (
        <main className="main">
            <section className="error project__wrapper">
                <div className="error__wrapper">
                    <h1 className="error__title">404</h1>
                    <p className="error__description">Страница не найдена</p>
                </div>
                <button className="project__link error__backlink" onClick={() => history.goBack()}>Назад</button>
            </section>
        </main>
    );
}

export default PageNotFound;