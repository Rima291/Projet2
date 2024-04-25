import React from "react";
import { createRoot } from "react-dom/client"; // Importez createRoot au lieu de ReactDOM
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";

const persistedStore = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Utilisez createRoot pour créer la racine

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
