import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import "./empty-state-result.scss";

interface EmptyStateResultProps {
  empty: boolean;
}

export const EmptyStateResult = ({
  empty,
  children,
}: React.PropsWithChildren<EmptyStateResultProps>) => {
  if (empty)
    return (
      <div className="empty-icon">
        <SearchIcon />
        <p>No todos</p>
      </div>
    );

  return <>{children}</>;
};
