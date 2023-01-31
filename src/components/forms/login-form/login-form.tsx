import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

import "./login-form.scss";
import { ROUTES } from "../../../router/routes";
import { ControlledTextField } from "../../containers/controlled-field/controlled-field";
import { IUser } from "../../../interfaces/IUser";

interface LoginFormProps {
  fetching: boolean;
  loginHandler: (userAttributes: Pick<IUser, "name" | "password">) => void;
}

export const LoginForm = ({ fetching, loginHandler }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(25).required("Email is required"),
      password: Yup.string().max(25).required("Password is required"),
    }),
    onSubmit: loginHandler,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} className="login-form">
      <ControlledTextField
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        label="Name"
        name="name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <ControlledTextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      <Typography className="login-form__link" variant="body2">
        New user? <Link to={ROUTES.SIGN_UP}>Create an account</Link>
      </Typography>
      <Box component="div" className="login-button">
        <LoadingButton
          loading={fetching}
          variant="outlined"
          color="success"
          size="medium"
          type="submit"
        >
          Sign In
        </LoadingButton>
      </Box>
    </form>
  );
};
