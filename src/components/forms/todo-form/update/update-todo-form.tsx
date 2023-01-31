import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ControlledTextField } from "../../../containers/controlled-field/controlled-field";
import { ITodo } from "../../../../interfaces/ITodo";

import "./update-todo-form.scss";

interface IUpdateTodoFormProps {
  fetching: boolean;
  todoAttributes: Pick<ITodo, "id" | "text" | "status">;
  submitHandler: (todoId: string, todo: Pick<ITodo, "text" | "status">) => void;
}

export const UpdateTodoForm = ({
  fetching,
  todoAttributes,
  submitHandler,
}: IUpdateTodoFormProps) => {
  const formik = useFormik({
    initialValues: {
      text: todoAttributes.text,
      status: todoAttributes.status,
    },
    validationSchema: Yup.object({
      text: Yup.string().required("Add text please"),
      status: Yup.boolean(),
    }),
    onSubmit: (values) => submitHandler(todoAttributes.id, values),
  });

  console.info("formik values", formik.values);

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      className="update-todo-form"
    >
      <Box className="update-todo-form__status">
        <Checkbox
          name="status"
          onChange={formik.handleChange}
          checked={formik.values.status}
        />
      </Box>
      <ControlledTextField
        error={Boolean(formik.touched.text && formik.errors.text)}
        helperText={(formik.touched.text && formik.errors.text) || " "}
        label="Text"
        name="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.text}
        multiline={true}
        rows={2}
      />
      <Box component="div" className="add-todo-btn">
        <LoadingButton
          loading={fetching}
          variant="outlined"
          color="success"
          size="small"
          type="submit"
        >
          Edit
        </LoadingButton>
      </Box>
    </form>
  );
};
