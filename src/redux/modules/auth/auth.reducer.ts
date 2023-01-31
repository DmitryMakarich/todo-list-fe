import { createReducer } from "typesafe-actions";
import {
  removeAxiosAuthorization,
  setAxiosAuthorization,
} from "../../../api/base.api";
import { IUser, USER_ROLE } from "../../../interfaces/IUser";
import { Actions } from "../../root.actions";
import {
  logoutAction,
  setAuthenticatedAction,
  setAuthFetchingAction,
  setErrorAction,
  setShowingSuccessAuthToastAction,
} from "./auth.actions";

interface IUserReducer {
  user: Omit<IUser, "password"> | null;
  authenticated: boolean;
  fetching: boolean;
  error: string;
  showSuccessToast: boolean;
}

const initialState: IUserReducer = {
  user: null,
  authenticated: false,
  fetching: false,
  error: "",
  showSuccessToast: false,
};

export const authReducer = createReducer<IUserReducer, Actions>(initialState)
  .handleAction(setAuthenticatedAction, (state, { payload }) => {
    const tokenData: IUserTokenData = JSON.parse(atob(payload.split(".")[1]));
    localStorage.setItem("token", payload);
    setAxiosAuthorization(payload);
    
    return {
      ...state,
      user: tokenData,
      authenticated: true,
    };
  })
  .handleAction(setAuthFetchingAction, (state, { payload }) => ({
    ...state,
    fetching: payload,
  }))
  .handleAction(setErrorAction, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
  .handleAction(setShowingSuccessAuthToastAction, (state, { payload }) => ({
    ...state,
    showSuccessToast: payload,
  }))
  .handleAction(logoutAction, (state) => {
    localStorage.removeItem("token");
    removeAxiosAuthorization();

    return { ...state, authenticated: false };
  });

interface IUserTokenData {
  id: string;
  role: USER_ROLE;
  name: string;
}
