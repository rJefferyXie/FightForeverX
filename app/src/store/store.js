import rootReducer from "./reducers/rootReducer";
import storage from './storage';

import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const persistConfig = {
  key: 'root', 
  version: 1,
  storage: storage,
  blacklist: []
};

// For persisting data when the window/tab is closed
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
  }
);

export const persistor = persistStore(store);

const makeStore = () => persistor;

export const wrapper = createWrapper(makeStore);