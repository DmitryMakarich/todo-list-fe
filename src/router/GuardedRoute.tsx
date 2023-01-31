import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticatedSelector } from "../redux/modules/auth/auth.selectors";
import { ROUTES } from "./routes";

type GuardedRouteProps = { onlyUnauthenticated: true };

export const GuardedRoute = (props: GuardedRouteProps) => {
  const authenticated = useSelector(getAuthenticatedSelector);

  if (!Outlet) return <Navigate to={ROUTES.ROOT} />;
  if ("onlyUnauthenticated" in props && authenticated)
    return <Navigate to={ROUTES.ROOT} />;

  return <Outlet />;
};
