import { ActionType } from "typesafe-actions";
import * as todoActions from "./modules/todo/todo.actions";
import * as authActions from "./modules/auth/auth.actions";

export type Actions = ActionType<typeof todoActions | typeof authActions>;
