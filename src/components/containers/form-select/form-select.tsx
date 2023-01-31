import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IOption } from "../../../interfaces/IOptions";

interface IFormSelectProps {
  label: string;
  value: string;
  options: IOption[];
  handleChange: (event: SelectChangeEvent) => void;
}

export const FormSelect = ({
  label,
  value,
  options,
  handleChange,
}: IFormSelectProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
