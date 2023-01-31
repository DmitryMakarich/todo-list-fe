import React from "react";
import { ITodo } from "../../../../../interfaces/ITodo";
import { UpdateTodoForm } from "../../../../forms/todo-form/update/update-todo-form";
import { TodoModal } from "../todo-modal";

interface IUpdateTodoModalProps {
  open: boolean;
  fetching: boolean;

  todoAttributes: Pick<ITodo, "id" | "text" | "status">;
  handleClose: () => void;
  submitHandler: (
    todoId: string,
    updateAttributes: Pick<ITodo, "text" | "status">
  ) => void;
}

export const UpdateTodoModal = (props: IUpdateTodoModalProps) => {
  return (
    <TodoModal {...props}>
      <UpdateTodoForm {...props} />
    </TodoModal>
  );
};
