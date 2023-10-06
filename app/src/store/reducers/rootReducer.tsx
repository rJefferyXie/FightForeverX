// Redux
import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import WrestlerReducer from "./wrestlerReducer";

const rootReducer = combineReducers({
  wrestler: WrestlerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;