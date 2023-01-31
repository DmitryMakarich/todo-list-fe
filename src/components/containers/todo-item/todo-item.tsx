import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Card, Checkbox, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ITodo } from "../../../interfaces/ITodo";
import {
  getAuthenticatedSelector,
  getRoleSelector,
} from "../../../redux/modules/auth/auth.selectors";
import { UpdateTodoModal } from "../modals/todo-modal/update-modal/update-modal";

import "./todo-item.scss";
import { USER_ROLE } from "../../../interfaces/IUser";

interface ITodoItemProps extends ITodo {
  handleUpdateTodo: (
    todoId: string,
    todoAttributes: Pick<ITodo, "text" | "status">
  ) => void;
}

export const TodoItem = ({
  id,
  user,
  email,
  text,
  status,
  updated,
  handleUpdateTodo,
}: ITodoItemProps) => {
  const authenticated = useSelector(getAuthenticatedSelector);
  const role = useSelector(getRoleSelector);

  const [viewAll, setViewAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formatedText = useMemo(() => {
    if (text.length > 100 && !viewAll) return text.slice(0, 100) + "...";

    return text;
  }, [text, viewAll]);

  const viewText = useMemo(() => {
    if (formatedText.length === text.length && !viewAll) return null;

    return viewAll ? "Hide" : "View all";
  }, [viewAll, formatedText, text]);

  const handleViewText = useCallback(() => {
    setViewAll((prev) => !prev);
  }, []);

  const updateText = useMemo(() => {
    if (!updated) return null;

    return "Updated by admin";
  }, [updated]);

  const editBtn = useMemo(() => {
    if (!authenticated || role === USER_ROLE.USER) return null;

    return (
      <Box onClick={() => setOpenModal(true)} className="todo-item__pen-icon">
        <ModeEditIcon />
      </Box>
    );
  }, [authenticated, role]);

  return (
    <Card elevation={16} className="todo-item">
      <Box className="todo-item__heading">
        <Typography variant="h4">Todo</Typography>
      </Box>
      <Box className="todo-item__status">
        <Checkbox checked={status} disabled />
      </Box>
      {editBtn}
      <Box className="todo-item__text">
        <Typography variant="subtitle2">
          {formatedText}{" "}
          <span className="todo-item__text__view-btn" onClick={handleViewText}>
            {viewText}
          </span>
        </Typography>
      </Box>
      <Box component="div" className="todo-item__additional">
        <Typography
          className="todo-item__additional--updated"
          fontWeight={600}
          variant="subtitle2"
        >
          {updateText}
        </Typography>
        <Box className="todo-item__additional__user">
          <Typography fontWeight={600} variant="subtitle2">
            {user}
          </Typography>
          <Typography fontWeight={600} variant="subtitle2">
            {email}
          </Typography>
        </Box>
      </Box>
      <UpdateTodoModal
        open={openModal}
        fetching={false}
        todoAttributes={{ id, text, status }}
        handleClose={() => setOpenModal(false)}
        submitHandler={handleUpdateTodo}
      />
    </Card>
  );
};
