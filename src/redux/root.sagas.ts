import { all, fork } from "redux-saga/effects";
import { authSagas } from "./modules/auth/auth.sagas";
import { todoSagas } from "./modules/todo/todo.sagas";

export function* rootSaga() {
  yield all([fork(todoSagas), fork(authSagas)]);
}
