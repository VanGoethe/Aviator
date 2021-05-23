import React, { useState } from "react";
import { useStoreActions, useStoreState } from "hooks";

interface Props {}

export const Signup = (props: Props) => {
  const { signup } = useStoreActions((actions) => actions.auth);
  const { errors, loading } = useStoreState((state) => state.auth);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const SignUserUp = () => {
    const data = {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      password2,
    };
    console.log(data, "sent data");
    signup(data);
  };
  return (
    <div className="auth-layout">
      <div>
        {Object.keys(errors).length > 0 ? (
          <div className="alert alert-warning mt-4" role="alert">
            {/* {errors?} */}
          </div>
        ) : null}

        <div className="card signup-layout">
          <div style={{ padding: "40px" }}>
            {/* <form> */}
            <h1 className="header-title">Signup</h1>
            <div className="row">
              <div className="col">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(el: any) => setFirstname(el.target.value)}
                />
              </div>
              <div className="col">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  onChange={(el: any) => setLastname(el.target.value)}
                />
              </div>
            </div>
            <div className="form-group mt-3">
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
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(el: any) => setPassword2(el.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-4" onClick={SignUserUp}>
              {loading ? <i className="fa fa-spinner loader"></i> : null}
              Signup
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};
