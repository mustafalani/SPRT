import React, { Component, useState }from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequireNoAuth from "./components/RequireNoAuth";
import RequireAuth from "./components/RequireAuth";
import CookiesHelper from './utils/CookiesHelper';
import MongoQueries from './utils/api/mongoQueries';
import './scss/style.scss';
import './scss/bootstrap.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


class App extends Component {
  componentDidMount() {
    // this.authenticate()
  }

  render() {
  return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" component={RequireNoAuth(Login)} />
              <Route
                exact
                path="/register"
                name="Register Page"
                component={RequireNoAuth(Register)}
              />
              <Route exact path="/404" name="Page 404" component={RequireNoAuth(Page404)} />
              <Route exact path="/500" name="Page 500" component={RequireNoAuth(Page500)} />
              <Route path="/" name="Home" component={RequireAuth(TheLayout)} />
          </Switch>
          </React.Suspense>
           <ToastContainer
                position="top-center"
                autoClose={10000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
           />
      </BrowserRouter>
    );
  }
}

export default App;
