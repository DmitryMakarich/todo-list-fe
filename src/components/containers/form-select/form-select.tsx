import React from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IOption } from "../../../interfaces/IOptions";
import { SORT_BY } from "../../../redux/modules/todo/todo.reducer";

interface IFormSelectProps {
  label: string;
  value: string;
  options: IOption[];
  handleChange: (value?: SORT_BY) => void;
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
        onChange={(event: SelectChangeEvent<string>) =>
          handleChange(event.target.value as SORT_BY)
        }
        endAdornment={
          <IconButton
            sx={{ display: value ? "" : "none" }}
            onClick={() => handleChange()}
          >
            <CloseIcon />
          </IconButton>
        }
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
