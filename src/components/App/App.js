import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ShortMoviesContext } from "../../contexts/ShortMoviesContext";
import "./App.css";

import Header from "../Header/Header";
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
    // Все отфильтрованные фильмы
    const [filteredMovies, setFilteredMovies] = useState([]);
    // Количество отфильтрованных фильмов
    const [countFilteredMovies, setCountFilteredMovies] = useState(0);
    // Отображаемые фильмы
    const [displayedMovies, setDisplayedMovies] = useState([]);
    // Количество отображаемых фильмов
    const [countDisplayedMovies, setCountDisplayedMovies] = useState(0);
    // Фильмов в 1 ряду
    const [moviesPerRow, setMoviesPerRow] = useState(0);
    // Показ кнопки "Ещё"
    const [moreButtonVisible, setMoreButtonVisible] = useState(false);
    // Поисковый запрос
    const [searchText, setSearchText] = useState("");
    // Новый поиск или нет
    const [newSearch, setNewSearch] = useState(false);
    // Ошибка при поиске фильмов
    const [moviesMessage, setMoviesMessage] = useState("");

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

    // переключатель поиска по коротким видео
    function toggleCheckbox(e) {
        setShortMovies({...shortMovies,
            state: e.target.checked,
        });        
    };

    const [shortMovies, setShortMovies] = useState({
        state: true,
        toggleCheckbox: toggleCheckbox,
    });

    // Начальная инициализация
    useEffect(() => {
        // Рассчитываем начальное кол-во отображаемых фильмов и подгружаемых
        changeDisplayedMoviesNum();
        // Проверяем и подгружаем старые результаты поиска если они есть из localStorage
        if (!newSearch && localStorage.searchText) {
            setSearchText(localStorage.getItem("searchText"));
            setShortMovies({...shortMovies,
                state: localStorage.getItem("shortSearch") === 'true' ? true : false,
            });            
            setFilteredMovies(
                JSON.parse(localStorage.getItem("filteredMovies"))
            );
        }
    }, []);

    // Поиск фильмов
    function handleSearch(searchText) {
        setNewSearch(true);
        setSearchText(searchText);
    }

    // Получаем фильмы по поисковому запросу
    useEffect(() => {
        if (newSearch) {
            // Получаем все фильмы по API
            getAllMovies()
                .then((data) => {
                    // Помещаем все фильмы в переменную
                    setAllMovies(data);
                })
                .catch((err) => {
                    console.log(err);
                });

            // TODO: ПРОВЕРИТЬ КАК БУДЕТ ПРИ ПЕРЕХОДАХ ПО СТРАНИЧКАМ
            // setNewSearch(false);
        }
    }, [searchText]);

    // Вывод ошибок пользователю при поиске фильмов
    function handleMoviesErrorMessage(message) {
        if(message) {
            setMoviesMessage(message);
        } else {
            setMoviesMessage("");
        }        
    }

    useEffect(() => {
        if (newSearch) {
            // Фильтруем результаты по запросу
            setFilteredMovies(
                allMovies.filter((movie) => {
                    let re = new RegExp(searchText, "i");
                    return re.test(movie.nameRU);
                })
            );
        }
    }, [allMovies]);

    // Формируем первичый набор отображаемых фильмов
    useEffect(() => {
        // Вычисляем общее кол-во найденых фильмов
        const countMovies = filteredMovies.length;
        setCountFilteredMovies(countMovies);
        // Сохраняем данные в localStorage
        if (newSearch && countMovies > 0) {
            localStorage.setItem("searchText", searchText);
            localStorage.setItem("shortSearch", shortMovies.state);
            localStorage.setItem(
                "filteredMovies",
                JSON.stringify(filteredMovies)
            );
        }
        // Показываем кнопку "Ещё"?
        checkMoreButton(countDisplayedMovies, countMovies);
        // Добавляем новые фильмы к отображению
        setDisplayedMovies(filteredMovies.slice(0, countDisplayedMovies));
    }, [filteredMovies]);

    // Добавляем новые фильмы к отображению при нажатии кнопки "Ещё"
    function loadMoreMovies() {
        let newСountDisplayedMovies = countDisplayedMovies + moviesPerRow;

        // Корректируем кол-во подгружаемых фильмов для последней подгрузки
        if (newСountDisplayedMovies > countFilteredMovies)
            newСountDisplayedMovies = countFilteredMovies;

        // Пересобираем отображаемый массив фильмов
        setDisplayedMovies(
            displayedMovies.concat(
                filteredMovies.slice(
                    countDisplayedMovies,
                    newСountDisplayedMovies
                )
            )
        );
        // Добавляем новые фильмы в отображаемый массив
        setCountDisplayedMovies(newСountDisplayedMovies);

        // Показываем кнопку "Ещё"?
        checkMoreButton(newСountDisplayedMovies, countFilteredMovies);
    }

    // Проверяем показывать ли кнопку для подгрузки
    function checkMoreButton(currMoviesNum, allMoviesNum) {
        if (currMoviesNum < allMoviesNum) {
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
                    <ShortMoviesContext.Provider value={shortMovies}>
                        <Movies
                            onSearchForm={handleSearch}
                            movies={displayedMovies}
                            searchText={searchText}
                            loadMoreMovies={loadMoreMovies}
                            moreButtonVisible={moreButtonVisible}
                            message={moviesMessage}
                            onError={handleMoviesErrorMessage}
                        />
                    </ShortMoviesContext.Provider>
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
