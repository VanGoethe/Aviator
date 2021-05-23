import { Action, Thunk } from "easy-peasy";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Auth {
  token: string;
  loading: boolean;
  user: any;
  errors: any;

  request: Action<Auth>;
  success: Action<Auth>;
  failure: Action<Auth>;
  signup: Thunk<Auth, SignupPayload>;
  login: Thunk<Auth, LoginPayload>;
  logout: Action<Auth>;
}
