import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { Store } from "./express/Store.js";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </LocalizationProvider>
    </Provider>
  </StrictMode>
);
