import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CinemaPage from "./components/pages/CinemaPage";
import MovieListPage from "./components/pages/MovieListPage";

const router = createBrowserRouter([
  {
    path : "/",
    element: <App />,
    children : [
      {
        path : "",
        element : <HomePage />,
      },
      {
        path : "cinemas",
        element : <CinemaPage />,
      },
      {
        path : "movie-list",
        element : <MovieListPage />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
