import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import Header from '../Header';
import './App.css';

import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Link to="/movies">
        ������
      </Link>
      <Link to="/saved-movies">
        ���������� ������
      </Link>
      <Link to="/profile">
        ������� ������������
      </Link>
      <Link to="/signin">
        �����������
      </Link>
      <Link to="/signup">
        �����������
      </Link>
      <Link to="/">
        � �������
      </Link>

      <Switch>
        <Route path="/movies">

        </Route>
        <Route path="/saved-movies">

        </Route>
        <Route path="/profile">

        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route exact path="/">

        </Route>
      </Switch>

      <Footer />   
    </div>
  );
}

export default App;
