import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ControlledTextField } from "../../../containers/controlled-field/controlled-field";
import { ICreateTodoAttributes } from "../../../../interfaces/ITodo";

import "./create-todo-form.scss";

interface ICreateTodoFormProps {
  fetching: boolean;
  submitHandler: (todo: ICreateTodoAttributes) => void;
}

export const CreateTodoForm = ({
  fetching,
  submitHandler,
}: ICreateTodoFormProps) => {
  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      text: "",
      status: false,
    },
    validationSchema: Yup.object({
      user: Yup.string().max(15).required("Enter your name"),
      email: Yup.string()
        .max(25)
        .email("Invalid email")
        .required("Email is required"),
      text: Yup.string().required("Add text please"),
    }),
    onSubmit: submitHandler,
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      className="create-todo-form"
    >
      <Box component="div" className="create-todo-form__user-inputs">
        <ControlledTextField
          error={Boolean(formik.touched.user && formik.errors.user)}
          helperText={(formik.touched.user && formik.errors.user) || " "}
          label="Name"
          name="user"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.user}
        />
        <ControlledTextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || " "}
          label="Email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
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
          Create
        </LoadingButton>
      </Box>
    </form>
  );
};
