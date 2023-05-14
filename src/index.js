import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import { router } from "./routing";
import { RouterProvider } from "react-router-dom";
import { theme } from "./chakra/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Fonts from "./components/Fonts";
import GPSProvider from "./components/GPSProvider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GPSProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router}></RouterProvider>
          </GPSProvider>
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
