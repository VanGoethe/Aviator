import React, { useState } from "react";
import { useStoreActions, useStoreState } from "hooks";

interface Props {}

export const Login = (props: Props) => {
  const { login } = useStoreActions((actions) => actions.auth);
  const { errors, loading } = useStoreState((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logUserIn = () => {
    const data = {
      email,
      password,
    };
    console.log(data, "sent data");
    login(data);
  };

  return (
    <div className="auth-layout">
      <div className="login-layout">
        {Object.keys(errors).length > 0 ? (
          <div className="alert alert-warning mt-4" role="alert">
            {/* {errors?} */}
          </div>
        ) : null}
        <div className="card">
          <div style={{ padding: "40px" }}>
            {/* <form> */}
            <h1 className="header-title">Login</h1>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(el: any) => setEmail(el.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(el: any) => setPassword(el.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={logUserIn}
            >
              {loading ? <i className="fa fa-spinner loader"></i> : null}
              Login
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};
