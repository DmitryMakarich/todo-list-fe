import { Paginated } from "../helpers/generic.helper";
import { ICreateTodoAttributes, ITodo } from "../interfaces/ITodo";
import { ORDER, SORT_BY } from "../redux/modules/todo/todo.reducer";
import { axiosInstance } from "./base.api";

class TodoApi {
  private backend = process.env.REACT_APP_BACK_END_URL as string;
  private rootPath = "/api/todo";

  async getTodos({
    page,
    limit,
    sortBy,
    order,
  }: Paginated<{ sortBy?: SORT_BY; order: ORDER }>) {
    return axiosInstance.get<IGetTodosResult>(
      `${this.backend}${this.rootPath}/`,
      {
        params: {
          page,
          limit,
          sortBy,
          order,
        },
      }
    );
  }

  async addTodo(todoAttributes: ICreateTodoAttributes) {
    return axiosInstance.post<{ added: true }>(
      `${this.backend}${this.rootPath}/`,
      {
        ...todoAttributes,
      }
    );
  }

  async updateTodo(
    todoId: string,
    todoAttributes: Pick<ITodo, "text" | "status">
  ) {
    return axiosInstance.patch<{ updated: true }>(
      `${this.backend}${this.rootPath}/`,
      {
        id: todoId,
        ...todoAttributes,
      }
    );
  }
}

export const todoApi = new TodoApi();

export interface IGetTodosResult {
  count: number;
  rows: ITodo[];
}
