import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./api/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { shelterApiSlice } from "./api/features/shelter/shelterApiSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [shelterApiSlice.reducerPath],
};

const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, apiSlice.middleware],
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
