import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, IconButton, Toolbar, AppBar, Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ROUTES } from "../../../router/routes";
import { logoutAction } from "../../../redux/modules/auth/auth.actions";
import { Link, useNavigate } from "react-router-dom";
import { getAuthenticatedSelector } from "../../../redux/modules/auth/auth.selectors";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(getAuthenticatedSelector);

  const navBtn = useMemo(() => {
    if (authenticated)
      return (
        <Button
          onClick={() => {
            dispatch(logoutAction());
          }}
          color="inherit"
        >
          Logout
        </Button>
      );

    return (
      <Typography variant="h6" component="div">
        <Link to={ROUTES.SIGN_IN}>Login</Link>
      </Typography>
    );
  }, [dispatch, authenticated]);

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo list
        </Typography>
        {navBtn}
      </Toolbar>
    </AppBar>
  );
};
