import React from "react";
import Login from "./login/login";
import Snackbar from "./popups/snackbar/snackbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardRouting from "./base-dashboard/base-dashboard";
import Dialog from "./popups/snackbar/dialog/dialog";
function Routing() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/dashboard" component={DashboardRouting}></Route>
        </Switch>
      </Router>
      <Dialog />
      <Snackbar />
    </div>
  );
}

export default Routing;
