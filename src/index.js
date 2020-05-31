import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

import MainPage from "views/MainPage.js";
import CalendarPage from "views/CalendarPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/main" component={MainPage} />
      <Route path="/cal/:roomname" render={(props) => <CalendarPage {...props} set={false}/>}/>
      <Redirect from="/" to="/main" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
