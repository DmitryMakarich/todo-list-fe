import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Container,
  Pagination,
  Snackbar,
} from "@mui/material";
import {
  createTodoAction,
  getTodosAction,
  setPageAction,
  setShowingErrorToastAction,
  setShowingSuccessToastAction,
  updateTodoAction,
} from "../../../redux/modules/todo/todo.actions";
import { ICreateTodoAttributes, ITodo } from "../../../interfaces/ITodo";
import {
  getToastsStatusSelector,
  getTodoPaginatedSelector,
  getTodosFetchingSelector,
  getTodosSelector,
} from "../../../redux/modules/todo/todo.selectors";
import { setShowingSuccessAuthToastAction } from "../../../redux/modules/auth/auth.actions";
import { getToastStatusSelector } from "../../../redux/modules/auth/auth.selectors";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../interfaces/ToastMessages";
import { TodoList } from "../../containers/todo-list/todo-list";
import { CreateTodoModal } from "../../containers/modals/todo-modal/create-modal/create-modal";
import { TodoInputs } from "../../containers/todo-inputs/todo-inputs";

import "./todo-layout.scss";

export const TodoLayout = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetching = useSelector(getTodosFetchingSelector);
  const { todos, total } = useSelector(getTodosSelector);
  const { limit, page } = useSelector(getTodoPaginatedSelector);
  const { showErrorToast, showSuccessToast } = useSelector(
    getToastsStatusSelector
  );
  const showSuccessAuthToast = useSelector(getToastStatusSelector);

  useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  useEffect(() => {
    handleCloseModal();
  }, [handleCloseModal, showErrorToast, showSuccessToast]);

  const createTodoHandler = useCallback(
    (todo: ICreateTodoAttributes) => {
      dispatch(createTodoAction(todo));
    },
    [dispatch]
  );

  const changePageHandler = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(setPageAction(page - 1));
    },
    [dispatch]
  );

  const handleUpdateTodo = useCallback(
    (todoId: string, todoAttributes: Pick<ITodo, "text" | "status">) => {
      dispatch(updateTodoAction(todoId, todoAttributes));
    },
    [dispatch]
  );

  const handleCloseErrorToast = useCallback(() => {
    dispatch(setShowingErrorToastAction(false));
  }, [dispatch]);

  const handleCloseSuccessToast = useCallback(() => {
    dispatch(setShowingSuccessToastAction(false));
  }, [dispatch]);

  const handleCloseAuthSuccessToast = useCallback(() => {
    dispatch(setShowingSuccessAuthToastAction(false));
  }, [dispatch]);

  const totalPages = useMemo(
    () => total && Math.ceil(total / limit),
    [total, limit]
  );

  return (
    <Container maxWidth={false} className="todo-layout">
      <Container maxWidth="lg" className="todo-layout__container">
        <TodoInputs handleOpenModal={handleOpenModal} />
        <TodoList
          todos={todos}
          fetching={fetching}
          handleUpdateTodo={handleUpdateTodo}
        />
      </Container>
      <Pagination
        className="todo-layout__pagination"
        count={totalPages}
        page={page + 1}
        onChange={changePageHandler}
      />
      <CreateTodoModal
        open={isOpenModal}
        fetching={fetching}
        handleClose={handleCloseModal}
        submitHandler={createTodoHandler}
      />
      <Snackbar
        open={showErrorToast}
        autoHideDuration={1000}
        onClose={handleCloseErrorToast}
      >
        <Alert onClose={handleCloseErrorToast} severity="error">
          {ERROR_MESSAGES.UNEXPECTED_ERROR}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={1000}
        onClose={handleCloseSuccessToast}
      >
        <Alert onClose={handleCloseSuccessToast} severity="success">
          {SUCCESS_MESSAGES.SUCCESS}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessAuthToast}
        autoHideDuration={1000}
        onClose={handleCloseAuthSuccessToast}
      >
        <Alert onClose={handleCloseAuthSuccessToast} severity="success">
          {SUCCESS_MESSAGES.LOGGINED}
        </Alert>
      </Snackbar>
    </Container>
  );
};
