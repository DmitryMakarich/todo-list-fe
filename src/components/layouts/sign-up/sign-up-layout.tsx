import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  Container,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import { RegisterForm } from "../../forms/register-form/register-form";
import {
  getErrorSelector,
  getAuthenticatedSelector,
  getAuthFetchingSelector,
} from "../../../redux/modules/auth/auth.selectors";

import "./sign-up-layout.scss";
import {
  registerAction,
  setErrorAction,
} from "../../../redux/modules/auth/auth.actions";
import { IUser } from "../../../interfaces/IUser";

export const SignUpLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(getErrorSelector);
  const authenticated = useSelector(getAuthenticatedSelector);
  const fetching = useSelector(getAuthFetchingSelector);

  useEffect(() => {
    if (authenticated) navigate("/");
  }, [authenticated, navigate]);

  const handleCloseErrorToast = useCallback(() => {
    dispatch(setErrorAction(""));
  }, [dispatch]);

  const handleRegister = useCallback(
    (
      userAttributes: Pick<IUser, "name" | "password"> & {
        confirmPassword: string;
      }
    ) => {
      dispatch(registerAction(userAttributes));
    },
    [dispatch]
  );

  return (
    <Container maxWidth="sm" className="register-page">
      <Card elevation={16} sx={{ p: 4 }}>
        <Box component="div" className="register-page__title">
          <Typography variant="h4">Sign up</Typography>
        </Box>
        <Divider className="register-page--divider" />
        <RegisterForm fetching={fetching} registerHandler={handleRegister} />
      </Card>
      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={handleCloseErrorToast}
      >
        <Alert onClose={handleCloseErrorToast} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
