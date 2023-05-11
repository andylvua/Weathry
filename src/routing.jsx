import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/screens/HomePage/HomePage";
import FeedbackPage from "./components/screens/FeedbackPage/FeedbackPage";
import FavoriteCitiesPage from "./components/screens/FavouriteCitiesPage/FavoriteCitiesPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/feedback", element: <FeedbackPage /> },
  { path: "/favourite", element: <FavoriteCitiesPage /> }
]);
