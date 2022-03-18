import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import AppRoutes from "./app-routes";

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById("root")
);
