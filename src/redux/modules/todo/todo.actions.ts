import { createAction } from "typesafe-actions";
import { IGetTodosResult } from "../../../api/todo.api";
import { ICreateTodoAttributes, ITodo } from "../../../interfaces/ITodo";
import { ACTIONS_CONSTANTS } from "../../action-constants";
import { ORDER, SORT_BY } from "./todo.reducer";

export const getTodosAction = createAction(ACTIONS_CONSTANTS.GET_TODOS)();

export const setTodosFetchingAction = createAction(
  ACTIONS_CONSTANTS.SET_TODOS_FETCHING,
  (status: boolean) => status
)();

export const setShowingErrorToastAction = createAction(
  ACTIONS_CONSTANTS.SET_ERROR_TOAST,
  (status: boolean) => status
)();

export const setShowingSuccessToastAction = createAction(
  ACTIONS_CONSTANTS.SET_SUCCESS_TOAST,
  (status: boolean) => status
)();

export const setTodosAction = createAction(
  ACTIONS_CONSTANTS.SET_TODOS,
  ({ rows, count }: IGetTodosResult) => ({
    todos: rows,
    total: count,
  })
)();

export const createTodoAction = createAction(
  ACTIONS_CONSTANTS.CREATE_TODO,
  (todo: ICreateTodoAttributes) => todo
)();

export const updateTodoAction = createAction(
  ACTIONS_CONSTANTS.UPDATE_TODO,
  (todoId: string, todoAttributes: Pick<ITodo, "text" | "status">) => ({
    todoId,
    todoAttributes,
  })
)();

export const setPageAction = createAction(
  ACTIONS_CONSTANTS.SET_PAGE,
  (page: number) => page
)();

export const setSortByOptionAction = createAction(
  ACTIONS_CONSTANTS.SET_SORT_BY,
  (sortBy?: SORT_BY) => sortBy
)();

export const setOrderOptionAction = createAction(
  ACTIONS_CONSTANTS.SET_ORDER,
  (order: ORDER) => order
)();
