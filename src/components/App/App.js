import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ShortMoviesContext } from "../../contexts/ShortMoviesContext";
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

function App() {
    // Все фильмы
    const [allMovies, setAllMovies] = useState([]);
    // Все сохраненные фильмы (ID)
    const [allSavedMovies, setAllSavedMovies] = useState([]);
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

    const history = useHistory();

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
        setShortMovies({ ...shortMovies, state: e.target.checked });
    }

    const [shortMovies, setShortMovies] = useState({
        state: true,
        toggleCheckbox: toggleCheckbox,
    });

    // Начальная инициализация
    useEffect(() => {
        if (localStorage.getItem("token")) {
            mainApi.getAllSavedMovies()
                .then((movies) => {
                    // console.log('movies saved!', movies);
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
            // setAllSavedMoviesId(localStorage.getItem("allSavedMoviesId"));
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

    // Поиск фильмов
    function handleSearch(searchText) {
        setNewSearch(true);
        setSearchText(searchText);
    }

    // Получаем фильмы по поисковому запросу
    useEffect(() => {
        if (newSearch) {
            // Запускаем прелоадер
            setIsLoading(true);
            // Получаем все фильмы по API
            getAllMovies()
                .then((data) => {
                    // Помещаем все фильмы в переменную
                    setAllMovies(data);
                })
                .catch((err) => {
                    handleMoviesErrorMessage(
                        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
                    );
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });

            // TODO: ПРОВЕРИТЬ КАК БУДЕТ ПРИ ПЕРЕХОДАХ ПО СТРАНИЧКАМ
            // setNewSearch(false);
        }
    }, [searchText, shortMovies]);

    // Вывод ошибок пользователю при поиске фильмов
    function handleMoviesErrorMessage(message) {
        if (message) {
            setMoviesMessage(message);
        } else {
            setMoviesMessage("");
        }
    }

    function checkToken() {
        const token = localStorage.getItem("token");
        if (token) handleLogin(token);
    }

    function handleLogin(token) {
        mainApi
            .getContent(token)
            .then((res) => {
                if (res && !res.message) {
                    setCurrentUser(res);
                    setLoggedIn(true);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (newSearch) {
            // Фильтруем результаты по запросу
            setFilteredMovies(
                allMovies.filter((movie) => {
                    // Фильтруем на короткометражки
                    if (!shortMovies.state) {
                        if (movie.duration <= 40) return false;
                    }

                    // Экранируем спецсимволы
                    function regexpEsape(text) {
                        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                    }

                    let re = new RegExp(regexpEsape(searchText), "i");
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

    // Регистрация нового пользователя
    function handleRegisterUser(newUser) {
        // Запускаем прелоадер
        setIsLoading(true);
        mainApi
            .register(newUser.name, newUser.password, newUser.email)
            .then((res) => {
                if (res.message) {
                    setFormError(res.message);
                } else {
                    setFormError("");
                }
                // При успехе авторизуем пользователя
                if (res) handleLoginUser(newUser);
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
        console.log("user", user);
        setIsLoading(true);
        mainApi
            .authorize(user.email, user.password)
            .then((data) => {
                if (data.message) {
                    setFormError(data.message);
                } else {
                    setFormError("");
                }

                if (data.token) {
                    console.log("data", data);
                    localStorage.setItem("token", data.token);
                    handleLogin(data.token);
                }
            })
            .catch((res) => {
                console.log("res", res);
                // TODO доделать
                // запускается, если пользователь не найден
                console.log("запускается, если пользователь не найден");
                // handleInfoTooltipPopupOpen("fail");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Сохранение фильмов
    function handleMovieSave(movie) {
        console.log("movie", movie);

        mainApi
            .postMovie(movie)
            .then((newCard) => {
                console.log("newCard", newCard);
                // setCards([newCard, ...cards]);
                // closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });

        // mainApi.changeSaveMovieStatus(movie._id, !isSaved)
        //     .then((newCard) => {
        //         setCards((state) =>
        //             state.map((c) => (c._id === card._id ? newCard : c))
        //         );
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    // function handleCardLike(card) {
    //     // Снова проверяем, есть ли уже лайк на этой карточке
    //     const isSaved = card.likes.some((i) => i === currentUser._id);

    //     // Отправляем запрос в API и получаем обновлённые данные карточки
    //     api.changeLikeCardStatus(card._id, !isSaved)
    //       .then((newCard) => {
    //         setCards((state) =>
    //           state.map((c) => (c._id === card._id ? newCard : c))
    //         );
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <ShortMoviesContext.Provider value={shortMovies}>
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
                        />
                        <ProtectedRoute
                            path="/saved-movies"
                            component={SavedMovies}
                            onSearchForm={handleSearch}
                            movies={allSavedMovies}
                            searchText={searchText}
                            onError={handleMoviesErrorMessage}
                            isLoading={isLoading}
                            loggedIn={loggedIn}
                        />
                        <ProtectedRoute
                            path="/profile"
                            component={Profile}
                            loggedIn={loggedIn}
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
                </ShortMoviesContext.Provider>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
