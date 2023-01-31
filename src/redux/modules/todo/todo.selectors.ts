import { createSelector } from "reselect";
import { RootState } from "../../reducers";

export const getTodosFilterOptionsSelector = createSelector(
  [(state: RootState) => state.todo.filters],
  (filters) => filters
);

export const getTodosFetchingSelector = createSelector(
  [(state: RootState) => state.todo.fetching],
  (fetching) => fetching
);

export const getTodosSelector = createSelector(
  [(state: RootState) => state.todo],
  ({ todos, total }) => ({ todos, total })
);

export const getTodoPaginatedSelector = createSelector(
  [(state: RootState) => state.todo.filters],
  ({ limit, page }) => ({
    limit,
    page,
  })
);

export const getToastsStatusSelector = createSelector(
  [(state: RootState) => state.todo],
  ({ showErrorToast, showSuccessToast }) => ({
    showErrorToast,
    showSuccessToast,
  })
);

export const getSortOptionsSelector = createSelector(
  [(state: RootState) => state.todo.filters],
  ({ sortBy, order }) => ({
    sortBy,
    order,
  })
);
