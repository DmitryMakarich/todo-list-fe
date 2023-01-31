import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./modules/auth/auth.reducer";
import { todoReducer } from "./modules/todo/todo.reducer";

export const reducers = combineReducers({
  todo: todoReducer,
  auth: authReducer,
});

export type RootState = StateType<typeof reducers>;
