import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type IControlledTextFieldProps = TextFieldProps;

export function ControlledTextField({ ...props }: IControlledTextFieldProps) {
  return (
    <TextField
      fullWidth
      margin="dense"
      size="small"
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}
