import { createReducer } from "typesafe-actions";
import { removeAxiosAuthorization } from "../../../api/base.api";
import { ITodo } from "../../../interfaces/ITodo";
import { Actions } from "../../root.actions";
import {
  setOrderOptionAction,
  setPageAction,
  setShowingErrorToastAction,
  setShowingSuccessToastAction,
  setSortByOptionAction,
  setTodosAction,
  setTodosFetchingAction,
  updateTodoAction,
} from "./todo.actions";

export enum SORT_BY {
  USER = "user",
  EMAIL = "email",
  STATUS = "status",
}

export enum ORDER {
  DESC = "DESC",
  ASC = "ASC",
}

interface ITodoReducer {
  todos: ITodo[];
  total: number;
  fetching: boolean;
  showErrorToast: boolean;
  showSuccessToast: boolean;
  filters: {
    limit: number;
    page: number;
    sortBy?: SORT_BY;
    order: ORDER;
  };
}

const initialState: ITodoReducer = {
  todos: [],
  total: 0,
  fetching: false,
  showErrorToast: false,
  showSuccessToast: false,
  filters: {
    limit: 3,
    page: 0,
    order: ORDER.DESC,
  },
};

export const todoReducer = createReducer<ITodoReducer, Actions>(initialState)
  .handleAction(setTodosAction, (state, { payload: { todos, total } }) => ({
    ...state,
    todos,
    total,
  }))
  .handleAction(setTodosFetchingAction, (state, { payload }) => ({
    ...state,
    fetching: payload,
  }))
  .handleAction(setShowingErrorToastAction, (state, { payload }) => ({
    ...state,
    showErrorToast: payload,
  }))
  .handleAction(updateTodoAction, (state) => {
    if (!localStorage.getItem("token")) removeAxiosAuthorization();

    return {
      ...state,
      fetching: true,
    };
  })
  .handleAction(setShowingSuccessToastAction, (state, { payload }) => ({
    ...state,
    showSuccessToast: payload,
  }))
  .handleAction(setPageAction, (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      page: payload,
    },
  }))
  .handleAction(setSortByOptionAction, (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      sortBy: payload,
    },
  }))
  .handleAction(setOrderOptionAction, (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      order: payload,
    },
  }));
