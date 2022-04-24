// import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import Header from '../Header';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Link to="/movies">
        Фильмы
      </Link>
      <Link to="/saved-movies">
        Сохранённые фильмы
      </Link>
      <Link to="/profile">
        Профиль пользователя
      </Link>
      <Link to="/signin">
        Авторизация
      </Link>
      <Link to="/signup">
        Регистрация
      </Link>
      <Link to="/">
        О проекте
      </Link>

      <Switch>
        <Route path="/movies">
          Фильмы
        </Route>
        <Route path="/saved-movies">
          Сохранённые фильмы
        </Route>
        <Route path="/profile">
          Профиль пользователя
        </Route>
        <Route path="/signin">
          Авторизация
        </Route>
        <Route path="/signup">
          Регистрация
        </Route>
        <Route exact path="/">
          О проекте
        </Route>
      </Switch>      
    </div>
  );
}

export default App;
