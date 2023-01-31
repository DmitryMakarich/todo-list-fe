import { ORDER } from "../redux/modules/todo/todo.reducer";

export const invertOrder = (order: ORDER) =>
  order === ORDER.DESC ? ORDER.ASC : ORDER.DESC;
