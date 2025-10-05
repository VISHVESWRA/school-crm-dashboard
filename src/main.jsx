import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { Store } from "./express/Store.js";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "@mui/material/styles";

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
