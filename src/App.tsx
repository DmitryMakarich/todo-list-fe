import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAxiosAuthorization } from "./api/base.api";
import { NavBar } from "./components/containers/navbar/navbar";
import { RouterComponent } from "./router/Router";
import { setAuthenticatedAction } from "./redux/modules/auth/auth.actions";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAxiosAuthorization(token);
      dispatch(setAuthenticatedAction(token));
    }
  }, [dispatch]);

  return (
    <div className="main-container">
      <NavBar />
      <RouterComponent />
    </div>
  );
}

export default App;
