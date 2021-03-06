import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import requestsReducer from "./slices/requestsSlice";
import userInterfaceReducer from "./slices/userInterfaceSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    blacklist: ["requests"],
    storage,
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        userInterface: userInterfaceReducer,
        requests: requestsReducer,
    })
);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production', // this is not related to the .env.prod, just the npm run build version,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        })
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch