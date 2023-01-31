import { createSelector } from "reselect";
import { RootState } from "../../reducers";

export const getAuthenticatedSelector = createSelector(
  [(state: RootState) => state.auth.authenticated],
  (authenticated) => authenticated
);

export const getRoleSelector = createSelector(
  [(state: RootState) => state.auth.user],
  (user) => user?.role
);

export const getErrorSelector = createSelector(
  [(state: RootState) => state.auth.error],
  (error) => error
);

export const getToastStatusSelector = createSelector(
  [(state: RootState) => state.auth.showSuccessToast],
  (showSuccessToast) => showSuccessToast
);

export const getAuthFetchingSelector = createSelector(
  [(state: RootState) => state.auth.fetching],
  (fetching) => fetching
);
