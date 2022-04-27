import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';

import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
      <>        
        <Link to="/movies">
          Фильмы
        </Link>
        <Link to="/saved-movies">
          Сохранённые фильмы
        </Link>
        <Link to="/profile">
          Профиль пользователя
        </Link>
        <Link to="/">
          О проекте
        </Link>

        <Header />

        <Switch>
          <Route path="/movies">
            <h1>Фильмы</h1>
          </Route>
          <Route path="/saved-movies">
            <h1>Сохранённые фильмы</h1>
          </Route>
          <Route path="/profile">
            <h1>Профиль пользователя</h1>
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>

        <Footer />   
      </>
  );
}

export default App;
