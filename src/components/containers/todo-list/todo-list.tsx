import { Grid } from "@mui/material";
import { ITodo } from "../../../interfaces/ITodo";
import { EmptyStateResult } from "../empty-state-result/empty-state-result";
import { LoadingWrapper } from "../loading-wrapper/loading-wrapper";
import { TodoItem } from "../todo-item/todo-item";

import "./todo-list.scss";

interface ITodoListProps {
  todos: ITodo[];
  fetching: boolean;
  handleUpdateTodo: (
    todoId: string,
    todoAttributes: Pick<ITodo, "text" | "status">
  ) => void;
}

export const TodoList = ({
  todos,
  fetching,
  handleUpdateTodo,
}: ITodoListProps) => (
  <LoadingWrapper loading={fetching}>
    <Grid container rowSpacing={4} className="todo-list">
      <EmptyStateResult empty={!todos.length}>
        {todos.map((todo) => (
          <Grid item xs={8} key={todo.id}>
            <TodoItem {...todo} handleUpdateTodo={handleUpdateTodo} />
          </Grid>
        ))}
      </EmptyStateResult>
    </Grid>
  </LoadingWrapper>
);
