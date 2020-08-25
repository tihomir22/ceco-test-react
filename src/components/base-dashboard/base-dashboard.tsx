import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navbar/navbar";
import "./base-dashboard.scss";
import Sidebar from "./sidebar/sidebar";
import DefaultView from "./default-view/default-view";
import FichaProducto from "./ficha-producto/ficha-producto";
function DashboardRouting() {
  return (
    <div>
      <Navbar />
      <div className="sidebarMain">
        <div className="sidebarList">
          <Sidebar />
        </div>
        <div className="mainContent">
          <Switch>
            <Route path="/dashboard" exact component={DefaultView}></Route>
            <Route path="/dashboard/fichaProducto" exact component={FichaProducto}></Route>
            <Route path="/dashboard/fichaProducto/:id" exact component={FichaProducto}></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default DashboardRouting;
