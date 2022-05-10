import React from 'react';
import { useHistory } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {
    const history = useHistory();

    return (
        <main className="main">
            <section className="notfound project__wrapper">
                <div className="notfound__wrapper">
                    <h1 className="notfound__title">404</h1>
                    <p className="notfound__description">Страница не найдена</p>
                </div>
                <button className="project__link notfound__backlink" onClick={() => history.goBack()}>Назад</button>
            </section>
        </main>
    );
}

export default PageNotFound;