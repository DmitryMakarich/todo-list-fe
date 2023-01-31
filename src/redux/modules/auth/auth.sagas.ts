import { AxiosResponse } from "axios";
import { all, takeLatest, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { authApi, LoginResult, RegisterResult } from "../../../api/auth.api";
import { ERROR_MESSAGES } from "../../../interfaces/ToastMessages";
import {
  loginAction,
  registerAction,
  setAuthenticatedAction,
  setAuthFetchingAction,
  setErrorAction,
  setShowingSuccessAuthToastAction,
} from "./auth.actions";

function* LoginSaga({ payload }: ActionType<typeof loginAction>) {
  try {
    yield put(setAuthFetchingAction(true));

    const { data }: AxiosResponse<LoginResult> = yield authApi.login({
      ...payload,
    });

    if ("token" in data && data.token) {
      yield put(setAuthenticatedAction(data.token));
      localStorage.setItem("token", data.token);
      yield put(setShowingSuccessAuthToastAction(true));
    } else if ("notFound" in data && data.notFound)
      yield put(setErrorAction(ERROR_MESSAGES.USER_NOT_EXISTS));
  } catch (error: any) {
    if ("inCorrectPassword" in error?.response.data)
      yield put(setErrorAction(ERROR_MESSAGES.INCORRECT_PASSWORD));
    else yield put(setErrorAction(ERROR_MESSAGES.UNEXPECTED_ERROR));
  } finally {
    yield put(setAuthFetchingAction(false));
  }
}

function* RegisterSaga({ payload }: ActionType<typeof registerAction>) {
  try {
    yield put(setAuthFetchingAction(true));

    const { data }: AxiosResponse<RegisterResult> = yield authApi.register({
      ...payload,
    });

    if ("token" in data && data.token) {
      yield put(setAuthenticatedAction(data.token));
      localStorage.setItem("token", data.token);
      yield put(setShowingSuccessAuthToastAction(true));
    } else if ("exists" in data && data.exists)
      throw new Error(ERROR_MESSAGES.USER_EXISTS);
  } catch (error: any) {
    yield put(
      setErrorAction(error?.message || ERROR_MESSAGES.UNEXPECTED_ERROR)
    );
  } finally {
    yield put(setAuthFetchingAction(false));
  }
}

export function* authSagas() {
  yield all([
    takeLatest(loginAction, LoginSaga),
    takeLatest(registerAction, RegisterSaga),
  ]);
}
