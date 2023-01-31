import { createAction } from "typesafe-actions";
import { IUser } from "../../../interfaces/IUser";
import { ACTIONS_CONSTANTS } from "../../action-constants";

export const loginAction = createAction(
  ACTIONS_CONSTANTS.LOGIN,
  (userAttributes: Pick<IUser, "name" | "password">) => userAttributes
)();

export const registerAction = createAction(
  ACTIONS_CONSTANTS.REGISTER,
  (
    userAttributes: Pick<IUser, "name" | "password"> & {
      confirmPassword: string;
    }
  ) => userAttributes
)();

export const setAuthenticatedAction = createAction(
  ACTIONS_CONSTANTS.SET_AUTH,
  (token: string) => token
)();

export const setAuthFetchingAction = createAction(
  ACTIONS_CONSTANTS.SET_AUTH_FETCHING,
  (fetching: boolean) => fetching
)();

export const setShowingSuccessAuthToastAction = createAction(
  ACTIONS_CONSTANTS.SET_SUCCESS_AUTH_TOAST,
  (status: boolean) => status
)();

export const setErrorAction = createAction(
  ACTIONS_CONSTANTS.SET_ERROR,
  (error: string) => error
)();

export const logoutAction = createAction(ACTIONS_CONSTANTS.LOGOUT)();
