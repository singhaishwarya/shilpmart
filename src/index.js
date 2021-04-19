import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import "./index.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Dashboard />
    </BrowserRouter>,
    document.getElementById("root")
);

// ReactDOM.render(<Dashboard />, document.getElementById("root"));
