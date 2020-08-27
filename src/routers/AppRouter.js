import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import history from "../helpers/History";

import Employee from "../views/Employee";

const AppRouter = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path="/employee" component={Employee} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AppRouter;
