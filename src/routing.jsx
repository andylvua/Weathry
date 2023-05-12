import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/screens/HomePage/HomePage";
import FeedbackPage from "./components/screens/FeedbackPage/FeedbackPage";
import FavoriteCitiesPage from "./components/screens/FavouriteCitiesPage/FavoriteCitiesPage";
import SettingsPage from "./components/screens/Settings/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/feedback", element: <FeedbackPage /> },
  { path: "/favourite", element: <FavoriteCitiesPage /> },
  { path: "/settings", element: <SettingsPage /> }
]);
