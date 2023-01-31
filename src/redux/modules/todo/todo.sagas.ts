import { AxiosResponse } from "axios";
import { all, takeLatest, put, select, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { IGetTodosResult, todoApi } from "../../../api/todo.api";
import { Paginated } from "../../../helpers/generic.helper";
import {
  createTodoAction,
  getTodosAction,
  setOrderOptionAction,
  setPageAction,
  setShowingErrorToastAction,
  setShowingSuccessToastAction,
  setSortByOptionAction,
  setTodosAction,
  setTodosFetchingAction,
  updateTodoAction,
} from "./todo.actions";
import { ORDER, SORT_BY } from "./todo.reducer";
import { getTodosFilterOptionsSelector } from "./todo.selectors";

function* getTodosSaga(action: ActionType<typeof getTodosAction>) {
  try {
    yield put(setTodosFetchingAction(true));
    const filters: Paginated<{ sortBy?: SORT_BY; order: ORDER }> = yield select(
      getTodosFilterOptionsSelector
    );

    const { data }: AxiosResponse<IGetTodosResult> = yield todoApi.getTodos({
      ...filters,
    });

    yield put(setTodosAction(data));
  } catch (e) {
    yield put(setShowingErrorToastAction(true));
  } finally {
    yield put(setTodosFetchingAction(false));
  }
}

function* createTodoSaga({ payload }: ActionType<typeof createTodoAction>) {
  try {
    yield put(setTodosFetchingAction(true));
    const { data }: AxiosResponse<{ added: true }> = yield todoApi.addTodo(
      payload
    );
    if ("added" in data) {
      yield put(getTodosAction());
      yield put(setShowingSuccessToastAction(true));
    }
  } catch (e) {
    yield put(setShowingErrorToastAction(true));
  } finally {
    yield put(setTodosFetchingAction(false));
  }
}

function* updateTodoSaga({
  payload: { todoId, todoAttributes },
}: ActionType<typeof updateTodoAction>) {
  try {
    yield put(setTodosFetchingAction(true));
    const { data }: AxiosResponse<{ added: true }> = yield todoApi.updateTodo(
      todoId,
      todoAttributes
    );

    if ("updated" in data) {
      yield put(getTodosAction());
      yield put(setShowingSuccessToastAction(true));
    }
  } catch (e) {
    yield put(setShowingErrorToastAction(true));
  } finally {
    yield put(setTodosFetchingAction(false));
  }
}

export function* todoSagas() {
  yield all([
    takeEvery(
      [
        setPageAction,
        setSortByOptionAction,
        setOrderOptionAction,
        getTodosAction,
      ],
      getTodosSaga
    ),
    takeLatest(createTodoAction, createTodoSaga),
    takeLatest(updateTodoAction, updateTodoSaga),
  ]);
}
