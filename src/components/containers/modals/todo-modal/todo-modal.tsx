import React from "react";
import { Modal, Typography, Container, Card } from "@mui/material";

import "./todo-modal.scss";

interface ITodoModal {
  open: boolean;
  handleClose: () => void;
}

export const TodoModal = ({
  open,
  children,
  handleClose,
}: React.PropsWithChildren<ITodoModal>) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Container className="todo-modal" maxWidth="sm">
        <Card elevation={16} className="todo-modal__content">
          <Typography id="modal-modal-title" variant="h5">
            Todo
          </Typography>
          {children}
        </Card>
      </Container>
    </Modal>
  );
};
