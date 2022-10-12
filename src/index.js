import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context";
import App from "./App";
import "./styles/index.css";
import LanguageProvider from "./context/LanguageContext";
import LoadingProvider from "./context/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LanguageProvider>
      <LoadingProvider>
        <Context>
          <App />
        </Context>
      </LoadingProvider>
    </LanguageProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
