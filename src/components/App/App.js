import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';

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

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <>
        <Switch>
          <Route path="/movies">
            <Header />
            <Movies movies={movies} />
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
