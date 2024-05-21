import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

const {VITE_API_URL} = import.meta.env

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:hash",
    loader: async ({params}) => {
      const clientUrl = "/" + params.hash
      const apiUrl = new URL(clientUrl, VITE_API_URL)
      throw redirect(apiUrl.href)
    }
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
