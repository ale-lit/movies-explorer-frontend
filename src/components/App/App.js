import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";

import { getAllMovies } from "../../utils/MoviesApi";

function App() {
    // Все фильмы
    const [allMovies, setAllMovies] = useState([]);
    // Количество фильмов
    const [countAllMovies, setCountAllMovies] = useState(0);
    // Отображаемые фильмы
    const [displayedMovies, setDisplayedMovies] = useState([]);
    // Количество отображаемых фильмов
    const [countDisplayedMovies, setCountDisplayedMovies] = useState(0);
    // Фильмов в 1 ряду
    const [moviesPerRow, setMoviesPerRow] = useState(0);
    // Показ кнопки "Ещё"
    const [moreButtonVisible, setMoreButtonVisible] = useState(false);

    // Меняем кол-во выводимых фильмов в зав-ти от размера экрана
    function changeDisplayedMoviesNum() {
        let displayWidth = window.screen.width;

        if (displayWidth >= 1280) {
            if (countDisplayedMovies === 0) setCountDisplayedMovies(12);
            setMoviesPerRow(3);
        } else if (displayWidth > 767 && displayWidth < 1280) {
            // TODO: 480 по заданию
            if (countDisplayedMovies === 0) setCountDisplayedMovies(8);
            setMoviesPerRow(2);
        } else {
            if (countDisplayedMovies === 0) setCountDisplayedMovies(5);
            setMoviesPerRow(2);
        }
    }

    // Начальная инициализация
    useEffect(() => {
        // Рассчитываем начальное кол-во отображаемых фильмов и подгружаемых
        changeDisplayedMoviesNum();

        // Получаем все фильмы
        getAllMovies()
            .then((data) => {
                // Подгружаем все фильмы в localstorage
                setAllMovies(data);
                // Вычисляем общее кол-во фильмов
                setCountAllMovies(data.length);
                // Показываем кнопку "Ещё"?
                checkMoreButton(countDisplayedMovies, data.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Формируем первичый набор отображаемых фильмов
    useEffect(() => {
        // Добавляем новые фильмы к отображению
        setDisplayedMovies(allMovies.slice(0, countDisplayedMovies));
    }, [allMovies]);

    // Добавляем новые фильмы к отображению при нажатии кнопки "Ещё"
    function loadMoreMovies() {
        let newСountDisplayedMovies = countDisplayedMovies + moviesPerRow;

        // Корректируем кол-во подгружаемых фильмов для последней подгрузки
        if (newСountDisplayedMovies > countAllMovies)
            newСountDisplayedMovies = countAllMovies;

        // Пересобираем отображаемый массив фильмов
        setDisplayedMovies(
            displayedMovies.concat(
                allMovies.slice(countDisplayedMovies, newСountDisplayedMovies)
            )
        );
        // Добавляем новые фильмы в отображаемый массив
        setCountDisplayedMovies(newСountDisplayedMovies);

        // Показываем кнопку "Ещё"?
        checkMoreButton(newСountDisplayedMovies, countAllMovies);
    }

    // Проверяем показывать ли кнопку для подгрузки
    function checkMoreButton(currMoviesNum, allMoviesNum) {
        if (currMoviesNum < allMoviesNum) {
            setMoreButtonVisible(true);
        } else {
            setMoreButtonVisible(false);
        }
    }

    function handleSearch(searchText) {
        alert(searchText);
    }

    return (
        <>
            <Switch>
                <Route path="/movies">
                    <Header />
                    <Movies
                        onSearchForm={handleSearch}
                        movies={displayedMovies}
                        loadMoreMovies={loadMoreMovies}
                        moreButtonVisible={moreButtonVisible}
                    />
                    <Footer />
                </Route>
                <Route path="/saved-movies">
                    <Header />
                    <SavedMovies />
                    <Footer />
                </Route>
                <Route path="/profile">
                    <Header />
                    <Profile />
                </Route>
                <Route path="/signup">
                    <Register />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Header />
                    <Main />
                    <Footer />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </>
    );
}

export default App;
