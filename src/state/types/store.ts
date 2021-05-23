import { AuthModel } from "state/models/auth";

export interface Store {
  auth: typeof AuthModel;
}
