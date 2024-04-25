import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit
import userSlice from "./features/userSlice"; // Feature slice
import appApi from "./services/appApi"; // API service

import storage from "redux-persist/lib/storage"; // Pour le stockage persistant
import { combineReducers } from "redux"; // Pour combiner les reducers
import { persistReducer } from "redux-persist"; // Pour créer des reducers persistants
import {thunk} from "redux-thunk"; // Redux thunk pour les actions asynchrones

// Réducteurs combinés
const reducer = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

// Configuration de la persistance
const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath], // Ajouter des exceptions à la persistance, le cas échéant
};

// Reducer persistant
const persistedReducer = persistReducer(persistConfig, reducer);

// Création du magasin Redux
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, appApi.middleware), // Assurer l'utilisation des middlewares appropriés
});

export default store; // Exporter le store pour l'utiliser dans l'application
