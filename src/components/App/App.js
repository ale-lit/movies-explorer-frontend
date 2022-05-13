import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ShortMoviesContext } from "../../contexts/ShortMoviesContext";
import { ShortSavedMoviesContext } from "../../contexts/ShortSavedMoviesContext";
import ProtectedRoute from "../../utils/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
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

import {
    SHORT_MOVIE_DURATION,
    COUNT_DISPLAYED_MOVIES_DESKTOP,
    COUNT_PERROW_MOVIES_DESKTOP,
    COUNT_DISPLAYED_MOVIES_LAPTOP,
    COUNT_PERROW_MOVIES_LAPTOP,
    COUNT_DISPLAYED_MOVIES_MOBILE,
    COUNT_PERROW_MOVIES_MOBILE,
    SERVER_OK_MESSAGE,
    SERVER_ERROR_MESSAGE,
} from "../../constants";

import { REGEXP_URL_CHECK, REGEXP_ESCAPE_SPECIALS } from "../../regexp";

function App() {
    // Все фильмы
    const [allMovies, setAllMovies] = useState([]);
    // Все сохраненные фильмы
    const [allSavedMovies, setAllSavedMovies] = useState([]);
    // Все сохраненные фильмы (ID)
    const [allSavedMoviesIds, setAllSavedMoviesIds] = useState([]);
    // Все отфильтрованные фильмы
    const [filteredMovies, setFilteredMovies] = useState([]);
    // Количество отфильтрованных фильмов
    const [countFilteredMovies, setCountFilteredMovies] = useState(0);
    // Отображаемые фильмы
    const [displayedMovies, setDisplayedMovies] = useState([]);
    // Отображаемые сохраненные фильмы
    const [displayedSavedMovies, setDisplayedSavedMovies] = useState([]);
    // Количество отображаемых фильмов
    const [countDisplayedMovies, setCountDisplayedMovies] = useState(0);
    // Фильмов в 1 ряду
    const [moviesPerRow, setMoviesPerRow] = useState(0);
    // Показ кнопки "Ещё"
    const [moreButtonVisible, setMoreButtonVisible] = useState(false);
    // Поисковый запрос
    const [searchText, setSearchText] = useState("");
    // Поисковый запрос по сохраненным фильмам
    const [searchSavedText, setSearchSavedText] = useState("");
    // Новый поиск или нет
    const [newSearch, setNewSearch] = useState(false);
    // Ошибка при поиске фильмов
    const [moviesMessage, setMoviesMessage] = useState("");
    // Прелоадер
    const [isLoading, setIsLoading] = useState(false);
    // Пользователь
    const [currentUser, setCurrentUser] = useState({});
    // Залогинен ли пользователь?
    const [loggedIn, setLoggedIn] = useState(false);
    // Текущая локация
    const location = useLocation().pathname;
    // Ошибка формы
    const [formError, setFormError] = useState("");
    // Некорректный токен
    const [wrongToken, setWrongToken] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(wrongToken) handleLogOut();
    }, [wrongToken])

    // Меняем кол-во выводимых фильмов в зав-ти от размера экрана
    function changeDisplayedMoviesNum() {
        let displayWidth = window.screen.width;

        if (displayWidth >= 1280) {
            if (countDisplayedMovies === 0)
                setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_DESKTOP);
            setMoviesPerRow(COUNT_PERROW_MOVIES_DESKTOP);
        } else if (displayWidth > 767 && displayWidth < 1280) {
            if (countDisplayedMovies === 0)
                setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_LAPTOP);
            setMoviesPerRow(COUNT_PERROW_MOVIES_LAPTOP);
        } else {
            if (countDisplayedMovies === 0)
                setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_MOBILE);
            setMoviesPerRow(COUNT_PERROW_MOVIES_MOBILE);
        }
    }

    // переключатель поиска по коротким видео
    function toggleCheckbox(e) {
        setShortMovies({ ...shortMovies, state: e.target.checked });
    }
    const [shortMovies, setShortMovies] = useState({
        state: true,
        toggleCheckbox: toggleCheckbox,
    });

    // переключатель поиска по коротким видео (сохраненные)
    function toggleSavedCheckbox(e) {
        setShortSavedMovies({ ...shortSavedMovies, savedState: e.target.checked });
    }
    const [shortSavedMovies, setShortSavedMovies] = useState({
        savedState: true,
        toggleSavedCheckbox: toggleSavedCheckbox,
    });

    // Начальная инициализация
    useEffect(() => {
        if (localStorage.getItem("token")) {
            mainApi
                .getAllSavedMovies()
                .then((movies) => {
                    if(movies.message) {
                        // Если токен некорректный - разлогиниваем
                        setWrongToken(true);
                    }
                    
                    setAllSavedMovies(movies);
                })
                .catch((err) => {                    
                    console.log(err);
                });
        }

        // Проверяем токен (если он есть)
        checkToken();
        // Рассчитываем начальное кол-во отображаемых фильмов и подгружаемых
        changeDisplayedMoviesNum();
        // Проверяем и подгружаем старые результаты поиска если они есть из localStorage
        if (!newSearch && localStorage.searchText) {
            setSearchText(localStorage.getItem("searchText"));
            setShortMovies({
                ...shortMovies,
                state:
                    localStorage.getItem("shortSearch") === "true"
                        ? true
                        : false,
            });
            setFilteredMovies(
                JSON.parse(localStorage.getItem("filteredMovies"))
            );
        }
    }, []);

    useEffect(() => {
        getIdsAllSavedMovies();
    }, [allSavedMovies]);

    function getIdsAllSavedMovies() {
        let arrIds = [];
        allSavedMovies.forEach((movie) => {
            arrIds.push(movie.movieId);
        });
        setAllSavedMoviesIds(arrIds);
    }

    // Поиск фильмов
    function handleSearch(searchText) {
        setNewSearch(true);
        setSearchText(searchText);
    }

    function handleSavedSearch(searchText) {
        setSearchSavedText(searchText);
    }

    // Получаем все фильмы
    useEffect(() => {
        if (allMovies.length === 0) {
            // Запускаем прелоадер
            setIsLoading(true);
            // Получаем все фильмы по API
            getAllMovies()
                .then((data) => {
                    let allMoviesFixed = [];
                    data.forEach((movie) => {
                        allMoviesFixed.push(fixMovieUrl(movie));
                    });
                    // Помещаем все фильмы в переменную
                    setAllMovies(allMoviesFixed);
                })
                .catch((err) => {
                    handleMoviesErrorMessage(SERVER_ERROR_MESSAGE);
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (newSearch) {
            // Фильтруем результаты по запросу
            setFilteredMovies(
                allMovies.filter((movie) => {
                    // Фильтруем на короткометражки
                    if (!shortMovies.state) {
                        if (movie.duration <= SHORT_MOVIE_DURATION)
                            return false;
                    }

                    // Экранируем спецсимволы
                    function regexpEsape(text) {
                        return text.replace(REGEXP_ESCAPE_SPECIALS, "\\$&");
                    }

                    let re = new RegExp(regexpEsape(searchText), "i");
                    return re.test(movie.nameRU);
                })
            );
        }
    }, [searchText, shortMovies]);

    // Вывод ошибок пользователю при поиске фильмов
    function handleMoviesErrorMessage(message) {
        setMoviesMessage(message);
        setTimeout(() => {
            setMoviesMessage("");
        }, 2000);
    }

    // Вывод ошибок в формах
    function handleFormsErrorMessage(message) {
        setFormError(message);
        setTimeout(() => {
            setFormError("");
        }, 2000);
    }

    function checkToken() {
        const token = localStorage.getItem("token");
        if (token) handleLogin(token);
    }

    function handleLogin(token) {
        mainApi
            .getUserInfo(token)
            .then((res) => {
                if (res && !res.message) {
                    setCurrentUser(res);
                    setLoggedIn(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Вывод сохраненных фильмов
    useEffect(() => {
        // Фильтруем сохраненные результаты по запросу
        setDisplayedSavedMovies(
            allSavedMovies.filter((movie) => {
                // Фильтруем на короткометражки
                if (!shortMovies.state) {
                    if (movie.duration <= SHORT_MOVIE_DURATION) return false;
                }

                // Экранируем спецсимволы
                function regexpEsape(text) {
                    return text.replace(REGEXP_ESCAPE_SPECIALS, "\\$&");
                }

                let re = new RegExp(regexpEsape(searchSavedText), "i");
                return re.test(movie.nameRU);
            })
        );
    }, [allSavedMovies, searchSavedText, shortMovies]);

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

    // Регистрация нового пользователя
    function handleRegisterUser(newUser) {
        // Запускаем прелоадер
        setIsLoading(true);
        mainApi
            .register(newUser.name, newUser.password, newUser.email)
            .then((res) => {
                if (res.message) {
                    handleFormsErrorMessage(res.message);
                } else {
                    // При успехе авторизуем пользователя
                    handleLoginUser(newUser);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Авторизация пользователя
    function handleLoginUser(user) {
        setIsLoading(true);
        mainApi
            .authorize(user.email, user.password)
            .then((res) => {
                if (res.message) {
                    handleFormsErrorMessage(res.message);
                }

                if (res.token) {
                    localStorage.setItem("token", res.token);
                    handleLogin(res.token);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Редактирование пользователя
    function handleUpdateUser(newUser) {
        // Запускаем прелоадер
        setIsLoading(true);
        mainApi
            .editUserInfo(newUser.name, newUser.email)
            .then((res) => {
                if (res.message) {
                    handleFormsErrorMessage(res.message);
                } else {
                    setCurrentUser(res);
                    handleFormsErrorMessage(SERVER_OK_MESSAGE);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Разлогинивание пользователя
    function handleLogOut() {
        // Сбрасываем все стейты
        setAllMovies([]);
        setAllSavedMovies([]);
        setAllSavedMoviesIds([]);
        setFilteredMovies([]);
        setCountFilteredMovies(0);
        setDisplayedMovies([]);
        setDisplayedSavedMovies([]);
        setCountDisplayedMovies(0);
        setMoviesPerRow(0);
        setMoreButtonVisible(false);
        setSearchText("");
        setSearchSavedText("");
        setNewSearch(false);
        setMoviesMessage("");
        setCurrentUser({});
        setLoggedIn(false);
        setShortMovies({
            state: true,
            toggleCheckbox: toggleCheckbox,
        });
        setWrongToken(false);

        // Очищаем localstorage
        localStorage.removeItem("token");
        localStorage.removeItem("filteredMovies");
        localStorage.removeItem("searchText");
        localStorage.removeItem("shortSearch");

        // Редиректим на главную
        history.push("/");
    }

    // Проверка и исправление ссылки на ролик (при ее отсутствии)
    function fixMovieUrl(movie) {
        let regex = new RegExp(REGEXP_URL_CHECK);

        if (!movie.trailerLink || !movie.trailerLink.match(regex)) {
            let encodeName = encodeURI(movie.nameRU.replace(/ /g, "+"));
            movie.trailerLink =
                "https://www.youtube.com/results?search_query=" + encodeName;
        }
        return movie;
    }

    // Сохранение фильмов
    function handleMovieSave(movie) {
        mainApi
            .postMovie(movie)
            .then((savedMovie) => {
                setAllSavedMovies([...allSavedMovies, savedMovie]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleMovieDelete(id) {
        let newSavedMoviesArr = [];
        allSavedMovies.forEach((movie) => {
            if (movie.movieId === id) {
                mainApi
                    .deleteMovie(movie._id)
                    .then()
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                newSavedMoviesArr.push(movie);
            }
        });
        setAllSavedMovies(newSavedMoviesArr);
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <ShortMoviesContext.Provider value={shortMovies}>
                    <ShortSavedMoviesContext.Provider value={shortSavedMovies}>
                        {location === "/" ||
                        location === "/movies" ||
                        location === "/saved-movies" ||
                        location === "/profile" ? (
                            <Header loggedIn={loggedIn} />
                        ) : (
                            ""
                        )}
                        <Switch>
                            <ProtectedRoute
                                path="/movies"
                                component={Movies}
                                onSearchForm={handleSearch}
                                movies={displayedMovies}
                                searchText={searchText}
                                loadMoreMovies={loadMoreMovies}
                                moreButtonVisible={moreButtonVisible}
                                message={moviesMessage}
                                onError={handleMoviesErrorMessage}
                                isLoading={isLoading}
                                loggedIn={loggedIn}
                                onMovieSave={handleMovieSave}
                                onMovieDelete={handleMovieDelete}
                                savedIds={allSavedMoviesIds}
                            />
                            <ProtectedRoute
                                path="/saved-movies"
                                component={SavedMovies}
                                onSearchForm={handleSavedSearch}
                                movies={displayedSavedMovies}
                                searchText={searchSavedText}
                                onError={handleMoviesErrorMessage}
                                isLoading={isLoading}
                                loggedIn={loggedIn}
                                onMovieDelete={handleMovieDelete}
                                savedIds={allSavedMoviesIds}
                            />
                            <ProtectedRoute
                                path="/profile"
                                component={Profile}
                                loggedIn={loggedIn}
                                onEditUser={handleUpdateUser}
                                formError={formError}
                                isLoading={isLoading}
                                onLogoutUser={handleLogOut}
                            />
                            <Route path="/signup">
                                <Register
                                    onRegisterUser={handleRegisterUser}
                                    isLoading={isLoading}
                                    formError={formError}
                                />
                            </Route>
                            <Route path="/signin">
                                <Login
                                    onLoginUser={handleLoginUser}
                                    isLoading={isLoading}
                                    formError={formError}
                                />
                            </Route>
                            <Route exact path="/">
                                <Main />
                            </Route>
                            <Route path="*">
                                <PageNotFound />
                            </Route>
                        </Switch>
                        {location === "/" ||
                        location === "/movies" ||
                        location === "/saved-movies" ? (
                            <Footer />
                        ) : (
                            ""
                        )}
                    </ShortSavedMoviesContext.Provider>
                </ShortMoviesContext.Provider>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
