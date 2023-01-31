import React, { useCallback, useMemo } from "react";
import { Box, Button, IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { SORT_BY } from "../../../redux/modules/todo/todo.reducer";
import { FormSelect } from "../form-select/form-select";
import { useDispatch, useSelector } from "react-redux";
import { getSortOptionsSelector } from "../../../redux/modules/todo/todo.selectors";
import {
  setOrderOptionAction,
  setSortByOptionAction,
} from "../../../redux/modules/todo/todo.actions";
import { invertOrder } from "../../../helpers/invert-order.helper";

interface ITodoInputsProps {
  handleOpenModal: () => void;
}

export const TodoInputs = ({ handleOpenModal }: ITodoInputsProps) => {
  const dispatch = useDispatch();

  const { sortBy, order } = useSelector(getSortOptionsSelector);

  const handleChangeOrder = useCallback(() => {
    dispatch(setOrderOptionAction(invertOrder(order)));
  }, [dispatch, order]);

  const handleChangeSort = useCallback(
    (value?: SORT_BY) => {
      dispatch(setSortByOptionAction(value));
    },
    [dispatch]
  );

  const sortOptions = useMemo(
    () => Object.values(SORT_BY).map((s) => ({ label: s, value: s })),
    []
  );

  return (
    <Box className="todo-layout__actions">
      <Button
        onClick={handleOpenModal}
        variant="outlined"
        color="success"
        size="small"
        type="submit"
      >
        Create Todo
      </Button>
      <Box className="todo-layout__actions__sort">
        <IconButton color="primary" onClick={handleChangeOrder}>
          <SwapVertIcon />
        </IconButton>
        <FormSelect
          label={"Sort by"}
          value={sortBy || ""}
          options={sortOptions}
          handleChange={handleChangeSort}
        />
      </Box>
    </Box>
  );
};
