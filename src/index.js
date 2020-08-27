import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import history from "./helpers/History";
import { Router } from "react-router-dom";
import store from "./store";
import LoginRequiredRoute from "./routers/LoginRequiredRoute";
import Login from "./views/Login";
import App from "./App";
import { Route, Switch } from "react-router-dom";
import Notifier from "./components/Notifier";
import ModalManager from "./components/modal/ModalManager";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <Router history={history}>
        <Notifier />
        <ModalManager />
        <Switch>
          <Route exact path="/login/" component={Login} />
          <LoginRequiredRoute path="/" component={App} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
