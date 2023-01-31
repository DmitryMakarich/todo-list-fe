import { IUser } from "../interfaces/IUser";
import { axiosInstance } from "./base.api";

class AuthApi {
  private backend = process.env.REACT_APP_BACK_END_URL as string;
  private rootPath = "/api/user";

  async register(
    body: Pick<IUser, "name" | "password"> & { confirmPassword: string }
  ) {
    return await axiosInstance.post<RegisterResult>(
      `${this.backend}${this.rootPath}/register`,
      body
    );
  }

  async login(body: Pick<IUser, "name" | "password">) {
    return await axiosInstance.post<LoginResult>(
      `${this.backend}${this.rootPath}/login`,
      body
    );
  }
}

export const authApi = new AuthApi();

export type RegisterResult =
  | { token: string }
  | { error: true }
  | { exists: true };

export type LoginResult =
  | { notFound: true }
  | { inCorrectPassword: true }
  | { token: string }
  | { error: true };
