import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignInLayout } from "../components/layouts/sign-in/sign-in-layout";
import { SignUpLayout } from "../components/layouts/sign-up/sign-up-layout";
import { TodoLayout } from "../components/layouts/todo/todo-layout";
import { GuardedRoute } from "./GuardedRoute";
import { ROUTES } from "./routes";

export function RouterComponent() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<TodoLayout />} />
      <Route element={<GuardedRoute onlyUnauthenticated />}>
        <Route path={ROUTES.SIGN_IN} element={<SignInLayout />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpLayout />} />
      </Route>

      <Route path={"*"} element={<TodoLayout />} />
    </Routes>
  );
}
