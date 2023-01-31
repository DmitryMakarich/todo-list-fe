import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { LoginForm } from "../../forms/login-form/login-form";
import {
  getAuthenticatedSelector,
  getAuthFetchingSelector,
  getErrorSelector,
  getToastStatusSelector,
} from "../../../redux/modules/auth/auth.selectors";
import {
  loginAction,
  setErrorAction,
  setShowingSuccessAuthToastAction,
} from "../../../redux/modules/auth/auth.actions";
import { IUser } from "../../../interfaces/IUser";

import "./sign-in-layout.scss";

export const SignInLayout = () => {
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

  const handleLogin = useCallback(
    (userAttributes: Pick<IUser, "name" | "password">) => {
      dispatch(loginAction(userAttributes));
    },
    [dispatch]
  );

  return (
    <>
      <Container maxWidth="sm" className="login-page">
        <Card elevation={16} className="login-page__card">
          <Box component="div" className="login-page__card__title">
            <Typography variant="h4">Sign in</Typography>
          </Box>
          <LoginForm fetching={fetching} loginHandler={handleLogin} />
        </Card>
        <Snackbar
          open={!!error}
          autoHideDuration={1000}
          onClose={handleCloseErrorToast}
        >
          <Alert onClose={handleCloseErrorToast} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};
