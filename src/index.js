import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import 'react-alice-carousel/lib/alice-carousel.css';
ReactDOM.render(
    <BrowserRouter>
        <Dashboard />
    </BrowserRouter>,
    document.getElementById("root")
);

// ReactDOM.render(<Dashboard />, document.getElementById("root"));
