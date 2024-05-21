import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/">
        <App />
      </Route>

      <Route
        exact
        path="/:hash"
        component={(routeProps: RouteComponentProps) => {
          window.location.href = VITE_API_URL + routeProps.match.url;
          return null;
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
