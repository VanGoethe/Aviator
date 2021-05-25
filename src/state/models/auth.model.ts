import { redirectTo } from "../../utils/route";
import { history } from "utils";
import { SignupPayload, LoginPayload } from "../types";
import { thunk, action } from "easy-peasy";
import { client, routes, setAuthToken } from "config";
import jwt_decode from "jwt-decode";

// import { message, notification } from 'antd';
import { storage } from "utils";
import { Auth } from "state/types";

// const success = () => {
//     message.success('Signed in successfully');
// }

export const AuthModel: Auth = {
  token: "",
  loading: false,
  user: {},
  errors: {},

  request: action((state, payload: any) => {
    return (state.loading = payload);
  }),

  success: action((state, payload: any) => {
    // success();
    state.token = payload.token;
    state.user = payload.user;
    // return (state.loading = payload);
  }),
  failure: action((state, payload: any) => {
    return (state.errors = payload);
  }),

  signup: thunk(async (actions, payload: SignupPayload) => {
    actions.request(true as any);

    try {
      const response = await client().post("/signup", payload);

      if (response.data) {
        history.push(routes.login);
      }
    } catch (error) {
      actions.request(false as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),
  login: thunk(async (actions, payload: LoginPayload) => {
    actions.request(true as any);

    try {
      const response = await client().post("/login", payload);

      const { token } = response.data;

      storage.save("jwtToken", token);

      // we decode the token so that we can extract user data
      const decoded = jwt_decode(token);

      storage.save("currentUser", decoded);

      setAuthToken(token);

      await actions.success({ user: decoded, token: token } as any);
      actions.request(false as any);
      //   redirectTo(routes.homePage);
      window.location.href = routes.homePage;
    } catch (error) {
      actions.request(false as any);
      actions.failure(error.response ? error.response.data : null);
      console.log(error.response.data);
    }
  }),

  logout: action(() => {
    storage.remove();
    window.location.href = routes.login;
    return;
  }),
};
