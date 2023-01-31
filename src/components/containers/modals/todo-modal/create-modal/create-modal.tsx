import React from "react";
import { ICreateTodoAttributes } from "../../../../../interfaces/ITodo";
import { CreateTodoForm } from "../../../../forms/todo-form/create/create-todo-form";
import { TodoModal } from "../todo-modal";

interface ICreateTodoModalProps {
  open: boolean;
  fetching: boolean;
  handleClose: () => void;
  submitHandler: (todo: ICreateTodoAttributes) => void;
}

export const CreateTodoModal = (props: ICreateTodoModalProps) => {
  return (
    <TodoModal {...props}>
      <CreateTodoForm {...props} />
    </TodoModal>
  );
};
