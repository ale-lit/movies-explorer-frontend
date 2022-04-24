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
          { () => {
              <h2>Фильмы</h2>
            }
          }
        </Route>
        <Route path="/saved-movies">
          { () => {
              return "<h2>Сохранённые фильмы</h2>";
            }
          }
        </Route>
        <Route path="/profile">
          { () => {
              return "<h2>Профиль пользователя</h2>";
            }
          }
        </Route>
        <Route path="/signin">
          { () => {
              <h2>Авторизация</h2>
            }
          }
        </Route>
        <Route path="/signup">
          { () => {
              <h2>Регистрация</h2>
            }
          }          
        </Route>
        <Route exact path="/">
          { () => {
              <h2>О проекте</h2>
            }
          }
        </Route>
      </Switch>      
    </div>
  );
}

export default App;
