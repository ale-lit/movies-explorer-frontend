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
    const [numViewMovies, setNumViewMovies] = useState(12);

    const [movies, setMovies] = useState([]);

    const [localMovies, setLocalMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => {
                setLocalMovies(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setMovies(localMovies.slice(0, numViewMovies));
    }, [localMovies]);

    function loadMoreMovies() {
        setMovies(movies.concat(localMovies.slice(numViewMovies, numViewMovies + 3)));        
        setNumViewMovies(numViewMovies + 3);
    }

    return (
        <>
            <Switch>
                <Route path="/movies">
                    <Header />
                    <Movies movies={movies} loadMoreMovies={loadMoreMovies} />
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
