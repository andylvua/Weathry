import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/screens/HomePage";

export const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);
