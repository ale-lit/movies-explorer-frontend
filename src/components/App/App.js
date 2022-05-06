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
    // Количество отображаемых фильмов
    const [numViewMovies, setNumViewMovies] = useState(12);

    // Все фильмы
    const [allMovies, setAllMovies] = useState([]);

    // Отображаемые фильмы
    const [movies, setMovies] = useState([]);

    // Всего фильмов
    const [allMoviesAmount, setAllMoviesAmount] = useState(0);

    // Фильмов в 1 ряду
    const [filmsPerRow, setFilmsPerRow] = useState(3);

    // Показ кнопки "Ещё"
    const [moreButtonVisible, setMoreButtonVisible] = useState(false);

    useEffect(() => {
        getAllMovies()
            .then((data) => {
                // Подгружаем все фильмы в localstorage
                setAllMovies(data);
                // Вычисляем общее кол-во фильмов
                setAllMoviesAmount(data.length);   
                // Показываем кнопку "Ещё"?
                checkMoreButton(numViewMovies, data.length)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Добавляем новые фильмы к отображению
        setMovies(allMovies.slice(0, numViewMovies));
    }, [allMovies]);

    // Добавляем новые фильмы к отображению при нажатии кнопки "Ещё"
    function loadMoreMovies() {

        let newNumViewMovies = numViewMovies + filmsPerRow;

        // Корректируем кол-во подгружаемых фильмов
        if(newNumViewMovies > allMoviesAmount) newNumViewMovies = allMoviesAmount;

        // Пересобираем отображаемый массив фильмов
        setMovies(
            movies.concat(allMovies.slice(numViewMovies, newNumViewMovies))
        );
        // Добавляем новые фильмы в отображаемый массив
        setNumViewMovies(newNumViewMovies);

        // Показываем кнопку "Ещё"?
        checkMoreButton(newNumViewMovies, allMoviesAmount)
    }

    function checkMoreButton(currMoviesNum, allMoviesNum) {
        if(currMoviesNum < allMoviesNum) {
            setMoreButtonVisible(true);
        } else {
            setMoreButtonVisible(false);
        }
    }

    return (
        <>
            <Switch>
                <Route path="/movies">
                    <Header />
                    <Movies
                        movies={movies}
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
