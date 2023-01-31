import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./register-form.scss";
import { ControlledTextField } from "../../containers/controlled-field/controlled-field";
import { ROUTES } from "../../../router/routes";
import { IUser } from "../../../interfaces/IUser";

interface RegisterFormProps {
  fetching: boolean;
  registerHandler: (
    userAttributes: Pick<IUser, "name" | "password"> & {
      confirmPassword: string;
    }
  ) => void;
}

export const RegisterForm = ({
  fetching,
  registerHandler,
}: RegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      password: Yup.string().max(20).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password"),
    }),
    onSubmit: registerHandler,
  });

  return (
    <form className="register-form" noValidate onSubmit={formik.handleSubmit}>
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
      <ControlledTextField
        error={Boolean(
          formik.touched.confirmPassword && formik.errors.confirmPassword
        )}
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        label="Confirm password"
        name="confirmPassword"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.confirmPassword}
      />
      <Typography className="login-link" variant="body2">
        Already have an account?{" "}
        <Link to={ROUTES.SIGN_IN} color="black">
          Sign in
        </Link>
      </Typography>
      <Box component="div" className="register-button">
        <LoadingButton
          loading={fetching}
          variant="outlined"
          color="success"
          size="medium"
          type="submit"
        >
          Sign Up
        </LoadingButton>
      </Box>
    </form>
  );
};
