import { storage } from "./storage";
import jwt_decode from "jwt-decode";

export const isTokenExpired = () => {
  const token: string = storage.get("jwtToken");

  if (token) {
    const decodedInfo: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decodedInfo.exp && decodedInfo.exp < currentTime ? true : false;
  } else {
    return false;
  }
};

export const isUserAuthenticated = () => {
  const token: string = storage.get("jwtToken");

  const authStatus = {
    newUser: false,
    tokenExpired: false,
    authenticatedUser: false,
  };

  if (token) {
    if (isTokenExpired()) {
      authStatus.tokenExpired = true;
    } else {
      authStatus.authenticatedUser = true;
    }
  } else {
    authStatus.newUser = true;
  }

  return authStatus;
};
