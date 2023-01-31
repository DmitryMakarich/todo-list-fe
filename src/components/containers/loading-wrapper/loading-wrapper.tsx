import React from "react";
import { CircularProgress } from "@mui/material";

import "./loading-wrapper.scss";

interface ILoadingWrapperProps {
  loading: boolean;
}

export const LoadingWrapper = ({
  loading,
  children,
}: React.PropsWithChildren<ILoadingWrapperProps>) => {
  if (loading)
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );

  return <>{children}</>;
};
