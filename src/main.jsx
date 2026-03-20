import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import NotFoundPage from './components/NotFoundPage.jsx';
import PokemonPage from './components/PokemonPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/home",
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/pokemon/:pokemonName",
    element: <PokemonPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
