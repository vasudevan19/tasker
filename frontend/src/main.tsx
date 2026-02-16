import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MantineProvider>
      <PrimeReactProvider>
        <ToastContainer autoClose={5000} />
        <App />
      </PrimeReactProvider>
    </MantineProvider>
  </BrowserRouter>,
);
